import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Award, Target, BookOpen, Download, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import type { Quiz, Rule } from "@shared/schema";
import { buildCertificateDownloadText } from "@/lib/certificate-disclaimer";
import CertificatePreview from "@/components/certificate-preview";

interface AssessmentQuestion extends Quiz {
  ruleName: string;
  ruleNumber: string;
  part: string;
}

interface AssessmentReport {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
  passingGrade: boolean;
  partBreakdown: Record<string, { correct: number; total: number; score: number }>;
  difficultyBreakdown: Record<string, { correct: number; total: number; score: number }>;
  results: any[];
}

export default function AssessmentPage() {
  const [assessmentMode, setAssessmentMode] = useState<'select' | 'taking' | 'completed'>('select');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [assessmentQuestions, setAssessmentQuestions] = useState<AssessmentQuestion[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [assessmentReport, setAssessmentReport] = useState<AssessmentReport | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Warn user before leaving mid-assessment
  useEffect(() => {
    if (assessmentMode !== 'taking') return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [assessmentMode]);

  // Fetch rules (used to verify data is available)
  const { isError: rulesError } = useQuery<Rule[]>({
    queryKey: ["/api/rules"],
  });

  // Get 10 random questions from different parts
  const createQuickAssessment = () => {
    const mockQuestions: AssessmentQuestion[] = [
      {
        id: 1,
        ruleId: 1,
        question: "According to Rule 1(a), where do the COLREGS apply?",
        options: [
          "Only on the high seas",
          "On high seas and connected navigable waters",
          "Only in international waters",
          "Everywhere except territorial waters"
        ],
        correctAnswer: 1,
        explanation: "Rule 1(a) states that COLREGS apply to all vessels upon the high seas AND in all waters connected therewith navigable by seagoing vessels.",
        difficulty: "easy",
        ruleName: "Application",
        ruleNumber: "1",
        part: "A"
      },
      {
        id: 2,
        ruleId: 5,
        question: "What does 'proper look-out' require according to Rule 5?",
        options: [
          "Visual observation only",
          "Radar monitoring only",
          "Sight, hearing, and all available means",
          "Radio communications"
        ],
        correctAnswer: 2,
        explanation: "Rule 5 requires maintaining a proper look-out by sight and hearing as well as by all available means appropriate to the prevailing circumstances.",
        difficulty: "medium",
        ruleName: "Look-out",
        ruleNumber: "5",
        part: "B"
      },
      {
        id: 3,
        ruleId: 12,
        question: "When sailing vessels have wind on different sides, which gives way?",
        options: [
          "The vessel to starboard",
          "The vessel with wind on port side",
          "The vessel with wind on starboard side",
          "The faster vessel"
        ],
        correctAnswer: 1,
        explanation: "According to Rule 12(a)(i), when sailing vessels have wind on different sides, the vessel with wind on the port side gives way.",
        difficulty: "hard",
        ruleName: "Sailing Vessels",
        ruleNumber: "12",
        part: "B"
      },
      {
        id: 4,
        ruleId: 14,
        question: "In a head-on situation, what should both power vessels do?",
        options: [
          "Both alter course to port",
          "Both alter course to starboard",
          "One stops, one continues",
          "The faster vessel gives way"
        ],
        correctAnswer: 1,
        explanation: "Rule 14(a) requires both power-driven vessels to alter course to starboard so they pass port-to-port.",
        difficulty: "easy",
        ruleName: "Head-on Situation",
        ruleNumber: "14",
        part: "B"
      },
      {
        id: 5,
        ruleId: 23,
        question: "How many masthead lights must a 60-meter power vessel show underway?",
        options: [
          "One",
          "Two",
          "Three",
          "Four"
        ],
        correctAnswer: 1,
        explanation: "Rule 23 requires vessels 50 meters or more to show two masthead lights - one forward and one aft and higher.",
        difficulty: "medium",
        ruleName: "Power-driven Vessels Underway",
        ruleNumber: "23",
        part: "C"
      },
      {
        id: 6,
        ruleId: 35,
        question: "What fog signal does a power vessel making way sound?",
        options: [
          "One prolonged blast every 2 minutes",
          "Two prolonged blasts every 2 minutes",
          "Three short blasts every 2 minutes",
          "One short blast every minute"
        ],
        correctAnswer: 0,
        explanation: "Rule 35(a) requires power-driven vessels making way to sound one prolonged blast at intervals of not more than 2 minutes.",
        difficulty: "medium",
        ruleName: "Sound Signals in Restricted Visibility",
        ruleNumber: "35",
        part: "D"
      },
      {
        id: 7,
        ruleId: 18,
        question: "Which vessels must power-driven vessels give way to?",
        options: [
          "Only sailing vessels",
          "Only fishing vessels",
          "Vessels not under command, restricted, fishing, and sailing",
          "All other vessels"
        ],
        correctAnswer: 2,
        explanation: "Rule 18(a) lists vessels that power-driven vessels must give way to: not under command, restricted maneuverability, fishing, and sailing.",
        difficulty: "hard",
        ruleName: "Responsibilities Between Vessels",
        ruleNumber: "18",
        part: "B"
      },
      {
        id: 8,
        ruleId: 27,
        question: "What lights indicate a vessel not under command?",
        options: [
          "Three red lights vertically",
          "Two red lights vertically",
          "Red-white-red lights vertically",
          "Two white lights vertically"
        ],
        correctAnswer: 1,
        explanation: "Rule 27(a) requires vessels not under command to show two red all-round lights in a vertical line.",
        difficulty: "easy",
        ruleName: "Vessels Not Under Command",
        ruleNumber: "27",
        part: "C"
      },
      {
        id: 9,
        ruleId: 34,
        question: "What does two short blasts mean in maneuvering signals?",
        options: [
          "Altering course to starboard",
          "Altering course to port",
          "Operating astern",
          "In doubt"
        ],
        correctAnswer: 1,
        explanation: "Rule 34(a)(ii) states two short blasts mean 'I am altering my course to port'.",
        difficulty: "easy",
        ruleName: "Maneuvering and Warning Signals",
        ruleNumber: "34",
        part: "D"
      },
      {
        id: 10,
        ruleId: 19,
        question: "In restricted visibility, what should you avoid when altering course?",
        options: [
          "Any course alteration",
          "Altering to port for vessels forward of beam (except overtaking)",
          "Altering to starboard",
          "Reducing speed"
        ],
        correctAnswer: 1,
        explanation: "Rule 19(d)(i) states you should avoid altering course to port for vessels forward of the beam, except when overtaking.",
        difficulty: "hard",
        ruleName: "Conduct in Restricted Visibility",
        ruleNumber: "19",
        part: "B"
      }
    ];

    setAssessmentQuestions(mockQuestions);
    setAssessmentMode('taking');
    setStartTime(new Date());
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowCancelConfirm(false);
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handleSubmitAssessment = () => {
    let correctAnswers = 0;
    const results: any[] = [];
    const partBreakdown: Record<string, { correct: number; total: number; score: number }> = {};
    const difficultyBreakdown: Record<string, { correct: number; total: number; score: number }> = {};
    
    const timeSpent = startTime ? Math.floor((Date.now() - startTime.getTime()) / 1000) : 0;

    // Process each answer
    assessmentQuestions.forEach(question => {
      const selectedAnswer = selectedAnswers[question.id];
      const correct = selectedAnswer === question.correctAnswer;
      
      if (correct) correctAnswers++;
      
      results.push({
        questionId: question.id,
        correct,
        selectedAnswer: selectedAnswer ?? -1,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        timeSpent: Math.floor(timeSpent / assessmentQuestions.length)
      });
      
      // Update breakdowns
      if (!partBreakdown[question.part]) {
        partBreakdown[question.part] = { correct: 0, total: 0, score: 0 };
      }
      partBreakdown[question.part].total++;
      if (correct) partBreakdown[question.part].correct++;
      
      const difficulty = question.difficulty || 'medium';
      if (!difficultyBreakdown[difficulty]) {
        difficultyBreakdown[difficulty] = { correct: 0, total: 0, score: 0 };
      }
      difficultyBreakdown[difficulty].total++;
      if (correct) difficultyBreakdown[difficulty].correct++;
    });
    
    // Calculate scores
    const score = (correctAnswers / assessmentQuestions.length) * 100;
    const passingGrade = score >= 70;
    
    // Calculate breakdown scores
    Object.keys(partBreakdown).forEach(part => {
      partBreakdown[part].score = (partBreakdown[part].correct / partBreakdown[part].total) * 100;
    });
    
    Object.keys(difficultyBreakdown).forEach(difficulty => {
      difficultyBreakdown[difficulty].score = (difficultyBreakdown[difficulty].correct / difficultyBreakdown[difficulty].total) * 100;
    });
    
    const report: AssessmentReport = {
      totalQuestions: assessmentQuestions.length,
      correctAnswers,
      score,
      timeSpent,
      passingGrade,
      partBreakdown,
      difficultyBreakdown,
      results
    };
    
    setAssessmentReport(report);
    setAssessmentMode('completed');
  };

  const handleCancelAssessment = () => {
    setAssessmentMode('select');
    setAssessmentQuestions([]);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setStartTime(null);
    setShowCancelConfirm(false);
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
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="mb-4">← Back to Home</Button>
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">COLREGS Comprehensive Assessment</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quick Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Test Your Knowledge</h3>
              <p className="text-gray-600 mb-4">
                Take a comprehensive assessment covering all parts of the COLREGS. This assessment includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>10 questions covering all COLREGS parts (A-F)</li>
                <li>Multiple difficulty levels (Easy, Medium, Hard)</li>
                <li>Immediate feedback with explanations</li>
                <li>Passing grade: 70% or higher</li>
                <li>Certificate available upon successful completion</li>
              </ul>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-amber-900 leading-relaxed font-medium">
                  <strong>Certificate notice:</strong> Any certificate issued after this assessment includes on its face:{" "}
                  “This certificate is issued for educational purposes only. It does not constitute official
                  certification, does not satisfy any statutory or flag state requirement, and is not recognized by
                  the IMO, USCG, MCA, or any maritime authority.” It does not substitute for formal maritime
                  education or licensing. Always complete training required by your flag state and employer.
                </p>
              </div>
            </div>

            {rulesError && (
              <div className="flex items-center gap-2 rounded-md border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
                <AlertTriangle size={16} className="shrink-0" />
                <span>Could not reach the server. The assessment will use built-in questions.</span>
              </div>
            )}

            <Button
              onClick={createQuickAssessment}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Start Assessment (10 Questions)
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (assessmentMode === 'taking') {
    if (assessmentQuestions.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertTriangle size={16} className="shrink-0" />
            <span>No questions available. Please go back and try again.</span>
          </div>
          <Button className="mt-4" variant="outline" onClick={() => setAssessmentMode('select')}>
            Go Back
          </Button>
        </div>
      );
    }

    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;
    const selectedAnswer = selectedAnswers[currentQuestion?.id];

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">COLREGS Assessment</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock size={20} />
                <span>Question {currentQuestionIndex + 1} of {assessmentQuestions.length}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCancelConfirm(true)}
              >
                Exit Assessment
              </Button>
            </div>
          </div>

          {showCancelConfirm && (
            <div className="flex items-center justify-between gap-4 rounded-md border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="shrink-0" />
                <span>Exit assessment? Your progress will not be saved.</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="destructive" onClick={handleCancelAssessment}>
                  Yes, Exit
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowCancelConfirm(false)}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
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
          
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Unexpected state — reset to select screen
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
        <AlertTriangle size={16} className="shrink-0" />
        <span>Something went wrong. Please start over.</span>
      </div>
      <Button className="mt-4" variant="outline" onClick={() => setAssessmentMode('select')}>
        Start Over
      </Button>
    </div>
  );
}