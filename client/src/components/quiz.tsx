import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Quiz } from "@shared/schema";

interface QuizSectionProps {
  quizzes: Quiz[];
  ruleId: number;
}

interface QuizResult {
  correct: boolean;
  correctAnswer: number;
  explanation: string;
  score: number;
}

export default function QuizSection({ quizzes, ruleId }: QuizSectionProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizResults, setQuizResults] = useState<Record<number, QuizResult>>({});
  const queryClient = useQueryClient();

  const currentQuiz = quizzes[currentQuizIndex];
  const selectedAnswer = selectedAnswers[currentQuiz?.id];
  const result = quizResults[currentQuiz?.id];

  const submitQuizMutation = useMutation({
    mutationFn: async ({ quizId, answer }: { quizId: number; answer: number }) => {
      const response = await apiRequest("POST", `/api/quiz/${quizId}/submit`, {
        answer,
        userId: "default"
      });
      return response.json();
    },
    onSuccess: (data, variables) => {
      setQuizResults(prev => ({
        ...prev,
        [variables.quizId]: data
      }));
      // Invalidate progress to update completion status
      queryClient.invalidateQueries({ queryKey: ["/api/progress/default"] });
    }
  });

  const handleAnswerSelect = (quizId: number, answerIndex: number) => {
    if (quizResults[quizId]) return; // Don't allow changes after submission
    setSelectedAnswers(prev => ({
      ...prev,
      [quizId]: answerIndex
    }));
  };

  const handleSubmitAnswer = () => {
    if (currentQuiz && selectedAnswer !== undefined) {
      submitQuizMutation.mutate({
        quizId: currentQuiz.id,
        answer: selectedAnswer
      });
    }
  };

  const goToNextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(prev => prev - 1);
    }
  };

  const progress = ((currentQuizIndex + 1) / quizzes.length) * 100;
  const hasSubmitted = result !== undefined;
  const canSubmit = selectedAnswer !== undefined && !hasSubmitted;

  if (!currentQuiz) return null;

  return (
    <Card className="mb-4 sm:mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg">Knowledge Check</CardTitle>
          <div className="text-xs sm:text-sm text-gray-600">
            <span className="font-medium">Question {currentQuizIndex + 1} of {quizzes.length}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
            {currentQuiz.question}
          </h3>

          <div className="space-y-2 sm:space-y-3">
            {currentQuiz.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = result?.correctAnswer === index;
              const isIncorrect = hasSubmitted && isSelected && !result?.correct;
              
              let className = "flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors";
              
              if (hasSubmitted) {
                if (isCorrect) {
                  className += " border-green-500 bg-green-50";
                } else if (isIncorrect) {
                  className += " border-red-500 bg-red-50";
                } else {
                  className += " border-gray-200 bg-gray-50 cursor-default";
                }
              } else {
                className += isSelected 
                  ? " border-primary bg-primary/5" 
                  : " border-gray-200 hover:bg-gray-50";
              }

              return (
                <label 
                  key={index} 
                  className={className}
                  onClick={() => handleAnswerSelect(currentQuiz.id, index)}
                >
                  <input
                    type="radio"
                    name={`quiz-${currentQuiz.id}`}
                    value={index}
                    checked={isSelected}
                    onChange={() => handleAnswerSelect(currentQuiz.id, index)}
                    disabled={hasSubmitted}
                    className="mt-1 text-primary"
                  />
                  <span className="text-gray-700 flex-1 text-sm sm:text-base">{option}</span>
                  {hasSubmitted && isCorrect && (
                    <CheckCircle className="text-green-600" size={18} />
                  )}
                  {hasSubmitted && isIncorrect && (
                    <XCircle className="text-red-600" size={18} />
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Show result explanation */}
        {result && (
          <Alert className={result.correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            <div className="flex items-start space-x-2">
              {result.correct ? (
                <CheckCircle className="text-green-600 mt-0.5" size={20} />
              ) : (
                <XCircle className="text-red-600 mt-0.5" size={20} />
              )}
              <div>
                <div className="font-medium mb-1">
                  {result.correct ? "Correct!" : "Incorrect"}
                </div>
                <AlertDescription className={result.correct ? "text-green-800" : "text-red-800"}>
                  {result.explanation}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 space-y-3 sm:space-y-0">
          <Button
            variant="outline"
            onClick={goToPreviousQuiz}
            disabled={currentQuizIndex === 0}
            className="w-full sm:w-auto"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>

          {!hasSubmitted ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={!canSubmit || submitQuizMutation.isPending}
              className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
            >
              {submitQuizMutation.isPending ? "Submitting..." : "Submit Answer"}
            </Button>
          ) : (
            <Button
              onClick={goToNextQuiz}
              disabled={currentQuizIndex === quizzes.length - 1}
              className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </Button>
          )}
        </div>

        {/* Progress bar for quiz */}
        <div className="mt-4 sm:mt-6">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
            <span>Quiz Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>
      </CardContent>
    </Card>
  );
}
