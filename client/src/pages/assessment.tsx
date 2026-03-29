import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Award, Target, BookOpen, FileText, Download } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Quiz, Rule } from "@shared/schema";
import { buildCertificateDownloadText } from "@/lib/certificate-disclaimer";
import CertificatePreview from "@/components/certificate-preview";

interface AssessmentQuestion extends Quiz {
  ruleName: string;
  ruleNumber: string;
  part: string;
}

interface AssessmentResult {
  questionId: number;
  correct: boolean;
  selectedAnswer: number;
  correctAnswer: number;
  explanation: string;
  timeSpent: number;
}

interface AssessmentReport {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
  passingGrade: boolean;
  partBreakdown: Record<string, { correct: number; total: number; score: number }>;
  difficultyBreakdown: Record<string, { correct: number; total: number; score: number }>;
  results: AssessmentResult[];
}

export default function AssessmentPage() {
  const [assessmentMode, setAssessmentMode] = useState<'select' | 'taking' | 'completed'>('select');
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>(['easy', 'medium', 'hard']);
  const [timeLimit, setTimeLimit] = useState<number>(30); // minutes
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [assessmentQuestions, setAssessmentQuestions] = useState<AssessmentQuestion[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);
  const [questionTimes, setQuestionTimes] = useState<Record<number, number>>({});
  const [assessmentReport, setAssessmentReport] = useState<AssessmentReport | null>(null);
  
  const queryClient = useQueryClient();

  // Fetch all rules for assessment setup
  const { data: rules = [] } = useQuery<Rule[]>({
    queryKey: ["/api/rules"],
  });

  // Get available parts
  const availableParts = Array.from(new Set(rules.map((rule: Rule) => rule.part))).sort();

  // Timer effect
  useEffect(() => {
    if (assessmentMode === 'taking' && startTime && timeRemaining > 0) {
      const timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
        const remaining = Math.max(0, timeLimit * 60 - elapsed);
        setTimeRemaining(remaining);
        
        if (remaining === 0) {
          handleTimeUp();
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [assessmentMode, startTime, timeLimit, timeRemaining]);

  // Track time per question
  useEffect(() => {
    if (assessmentMode === 'taking') {
      setQuestionStartTime(new Date());
    }
  }, [currentQuestionIndex, assessmentMode]);

  const createAssessmentMutation = useMutation({
    mutationFn: async ({ parts, difficulty, questionCount }: { 
      parts: string[]; 
      difficulty: string[]; 
      questionCount: number;
    }) => {
      const response = await apiRequest("POST", "/api/assessment/create", {
        parts,
        difficulty,
        questionCount,
        userId: "default"
      });
      return response.json();
    },
    onSuccess: (data) => {
      setAssessmentQuestions(data.questions);
      setAssessmentMode('taking');
      setStartTime(new Date());
      setTimeRemaining(timeLimit * 60);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setQuestionTimes({});
    }
  });

  const submitAssessmentMutation = useMutation({
    mutationFn: async ({ answers, timings }: { 
      answers: Record<number, number>;
      timings: Record<number, number>;
    }) => {
      const response = await apiRequest("POST", "/api/assessment/submit", {
        questionIds: assessmentQuestions.map(q => q.id),
        answers,
        timings,
        userId: "default"
      });
      return response.json();
    },
    onSuccess: (data) => {
      setAssessmentReport(data);
      setAssessmentMode('completed');
      queryClient.invalidateQueries({ queryKey: ["/api/progress/default"] });
    }
  });

  const handleStartAssessment = () => {
    const questionCount = Math.min(20, availableParts.length * 3); // Max 20 questions
    
    createAssessmentMutation.mutate({
      parts: selectedParts.length > 0 ? selectedParts : availableParts,
      difficulty: selectedDifficulty,
      questionCount
    });
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    // Record time spent on current question
    if (questionStartTime && assessmentQuestions[currentQuestionIndex]) {
      const timeSpent = Math.floor((Date.now() - questionStartTime.getTime()) / 1000);
      setQuestionTimes(prev => ({
        ...prev,
        [assessmentQuestions[currentQuestionIndex].id]: timeSpent
      }));
    }

    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handleTimeUp = () => {
    handleSubmitAssessment();
  };

  const handleSubmitAssessment = () => {
    // Record final question time
    if (questionStartTime && assessmentQuestions[currentQuestionIndex]) {
      const timeSpent = Math.floor((Date.now() - questionStartTime.getTime()) / 1000);
      setQuestionTimes(prev => ({
        ...prev,
        [assessmentQuestions[currentQuestionIndex].id]: timeSpent
      }));
    }

    submitAssessmentMutation.mutate({
      answers: selectedAnswers,
      timings: questionTimes
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <BookOpen size={14} />;
      case 'medium': return <Target size={14} />;
      case 'hard': return <Award size={14} />;
      default: return <BookOpen size={14} />;
    }
  };

  const downloadCertificate = () => {
    if (!assessmentReport || !assessmentReport.passingGrade) return;

    const certificateContent = buildCertificateDownloadText({
      score: assessmentReport.score,
      dateFormatted: new Date().toLocaleDateString(),
      totalQuestions: assessmentReport.totalQuestions,
      correctAnswers: assessmentReport.correctAnswers,
      timeFormatted: formatTime(assessmentReport.timeSpent),
    });

    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `COLREGS_Certificate_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (assessmentMode === 'select') {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">COLREGS Comprehensive Assessment</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Assessment Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select COLREGS Parts:</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableParts.map(part => (
                  <label key={part} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedParts.includes(part)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedParts(prev => [...prev, part]);
                        } else {
                          setSelectedParts(prev => prev.filter(p => p !== part));
                        }
                      }}
                      className="rounded"
                    />
                    <span>Part {part}</span>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Leave unchecked to include all parts
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Difficulty Levels:</label>
              <div className="flex space-x-4">
                {['easy', 'medium', 'hard'].map(level => (
                  <label key={level} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedDifficulty.includes(level)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDifficulty(prev => [...prev, level]);
                        } else {
                          setSelectedDifficulty(prev => prev.filter(d => d !== level));
                        }
                      }}
                      className="rounded"
                    />
                    <Badge className={getDifficultyColor(level)}>
                      {getDifficultyIcon(level)}
                      <span className="ml-1 capitalize">{level}</span>
                    </Badge>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Time Limit (minutes):</label>
              <select
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                className="border rounded px-3 py-2"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-900 leading-relaxed font-medium">
                <strong>Certificate notice:</strong> Passing grades may download a certificate that states on
                its face: “This certificate is issued for educational purposes only. It does not constitute
                official certification, does not satisfy any statutory or flag state requirement, and is not
                recognized by the IMO, USCG, MCA, or any maritime authority.”
              </p>
            </div>

            <Button
              onClick={handleStartAssessment}
              disabled={createAssessmentMutation.isPending || selectedDifficulty.length === 0}
              className="w-full"
            >
              {createAssessmentMutation.isPending ? "Creating Assessment..." : "Start Assessment"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (assessmentMode === 'taking') {
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;
    const selectedAnswer = selectedAnswers[currentQuestion?.id];

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">COLREGS Assessment</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-red-600">
                <Clock size={20} />
                <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {assessmentQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>

        {currentQuestion && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Rule {currentQuestion.ruleNumber}</Badge>
                  <Badge className={getDifficultyColor(currentQuestion.difficulty || 'medium')}>
                    {getDifficultyIcon(currentQuestion.difficulty || 'medium')}
                    <span className="ml-1 capitalize">{currentQuestion.difficulty || 'medium'}</span>
                  </Badge>
                </div>
                <Badge variant="secondary">Part {currentQuestion.part}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
              
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  
                  return (
                    <label 
                      key={index}
                      className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        isSelected 
                          ? "border-primary bg-primary/5" 
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={index}
                        checked={isSelected}
                        onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                        className="mt-1 text-primary"
                      />
                      <span className="text-gray-700 flex-1">{option}</span>
                    </label>
                  );
                })}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === undefined}
                >
                  {currentQuestionIndex === assessmentQuestions.length - 1 ? "Submit Assessment" : "Next Question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  if (assessmentMode === 'completed' && assessmentReport) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Assessment Results</h1>
        
        <div className="grid gap-6 mb-8">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {assessmentReport.passingGrade ? (
                  <CheckCircle className="text-green-600" size={24} />
                ) : (
                  <XCircle className="text-red-600" size={24} />
                )}
                <span>Overall Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{assessmentReport.score.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">Final Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{assessmentReport.correctAnswers}/{assessmentReport.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{formatTime(assessmentReport.timeSpent)}</div>
                  <div className="text-sm text-gray-600">Time Taken</div>
                </div>
                <div className="text-center">
                  <Badge className={assessmentReport.passingGrade ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {assessmentReport.passingGrade ? "PASSED" : "FAILED"}
                  </Badge>
                  <div className="text-sm text-gray-600">Result</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {assessmentReport.passingGrade && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Your certificate (same text as download)</h2>
              <CertificatePreview
                scorePercent={assessmentReport.score}
                dateFormatted={new Date().toLocaleDateString()}
                totalQuestions={assessmentReport.totalQuestions}
                correctAnswers={assessmentReport.correctAnswers}
                timeFormatted={formatTime(assessmentReport.timeSpent)}
              />
            </div>
          )}

          {/* Part Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Performance by COLREGS Part</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(assessmentReport.partBreakdown).map(([part, data]) => (
                  <div key={part} className="flex items-center justify-between">
                    <span className="font-medium">Part {part}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{data.correct}/{data.total}</span>
                      <div className="w-32">
                        <Progress value={data.score} />
                      </div>
                      <span className="text-sm font-medium w-12">{data.score.toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Difficulty Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Performance by Difficulty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(assessmentReport.difficultyBreakdown).map(([difficulty, data]) => (
                  <div key={difficulty} className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(difficulty)}>
                      {getDifficultyIcon(difficulty)}
                      <span className="ml-1 capitalize">{difficulty}</span>
                    </Badge>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{data.correct}/{data.total}</span>
                      <div className="w-32">
                        <Progress value={data.score} />
                      </div>
                      <span className="text-sm font-medium w-12">{data.score.toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex space-x-4">
          <Button onClick={() => setAssessmentMode('select')} variant="outline">
            Take Another Assessment
          </Button>
          
          {assessmentReport.passingGrade && (
            <Button onClick={downloadCertificate} className="flex items-center space-x-2">
              <Download size={16} />
              <span>Download Certificate</span>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return null;
}