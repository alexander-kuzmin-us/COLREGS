import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Ship, 
  Search, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  AlertTriangle,
  Lightbulb,
  Home,
  Check
} from "lucide-react";
import type { Rule, Quiz } from "@shared/schema";
import { useProgress } from "@/hooks/use-progress";
import Sidebar from "@/components/sidebar";
import QuizSection from "@/components/quiz";
import ProgressModal from "@/components/progress-modal";
import { useState } from "react";

export default function RulePage() {
  const [match, params] = useRoute("/rule/:ruleNumber");
  const ruleNumber = params?.ruleNumber;
  const [showProgressModal, setShowProgressModal] = useState(false);

  const { data: rule, isLoading: ruleLoading } = useQuery<Rule>({
    queryKey: [`/api/rules/number/${ruleNumber}`],
    enabled: !!ruleNumber,
  });

  const { data: quizzes, isLoading: quizzesLoading } = useQuery<Quiz[]>({
    queryKey: [`/api/rules/${rule?.id}/quizzes`],
    enabled: !!rule?.id,
  });

  const { data: allRules } = useQuery<Rule[]>({
    queryKey: ["/api/rules"],
  });

  const { progressData, overallProgress, markRuleComplete } = useProgress();

  if (!match || ruleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!rule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Rule Not Found</h1>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2" size={16} />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const isCompleted = progressData?.some(p => p.ruleId === rule.id && p.completed);
  const completedRules = progressData?.filter(p => p.completed).length || 0;
  const totalRules = allRules?.length || 0;
  const currentRuleIndex = allRules?.findIndex(r => r.id === rule.id) || 0;

  const handleMarkComplete = async () => {
    await markRuleComplete(rule.id);
    setShowProgressModal(true);
  };

  const getPreviousRule = () => {
    if (!allRules || currentRuleIndex <= 0) return null;
    return allRules[currentRuleIndex - 1];
  };

  const getNextRule = () => {
    if (!allRules || currentRuleIndex >= allRules.length - 1) return null;
    return allRules[currentRuleIndex + 1];
  };

  const previousRule = getPreviousRule();
  const nextRule = getNextRule();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Ship className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">COLREGS Academy</h1>
                <p className="text-xs text-gray-500">Maritime Safety Education</p>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search regulations, rules, or terms..."
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700">Progress</div>
                <div className="text-xs text-gray-500">{completedRules} of {totalRules} rules</div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">{Math.round(overallProgress)}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-3 text-sm">
            <Link href="/" className="text-primary hover:text-primary/80">
              Home
            </Link>
            <ChevronRight className="text-gray-400" size={14} />
            <span className="text-primary">Part {rule.part} - {rule.partTitle}</span>
            <ChevronRight className="text-gray-400" size={14} />
            <span className="text-gray-500">Rule {rule.ruleNumber} - {rule.title}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <Sidebar currentRuleId={rule.id} />

          {/* Main Content */}
          <main className="flex-1">
            {/* Rule Header */}
            <Card className="mb-6">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <Eye className="text-white" size={20} />
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                          Rule {rule.ruleNumber} - {rule.title}
                        </h1>
                        <p className="text-lg text-gray-600">Part {rule.part}: {rule.partTitle}</p>
                      </div>
                    </div>
                    
                    <Alert className="border-amber-200 bg-amber-50">
                      <Lightbulb className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-800">
                        <strong>Key Learning Objective:</strong> {rule.plainEnglish}
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  <div className="ml-8 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-primary">
                        {currentRuleIndex + 1}/{totalRules}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Current Rule</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule Content */}
            <Card className="mb-6">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Official Regulation Text</h2>
                
                <div className="bg-gray-50 border-l-4 border-primary p-6 mb-6 font-mono text-sm leading-relaxed">
                  <p className="text-gray-800">"{rule.officialText}"</p>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Plain English Explanation</h3>
                <div className="prose prose-lg text-gray-700 mb-6">
                  <p>{rule.plainEnglish}</p>
                </div>

                {/* Key Points */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-green-600 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold text-green-900 mb-2">Key Points</h4>
                        <ul className="text-green-800 space-y-1 text-sm">
                          {rule.keyPoints.map((point, index) => (
                            <li key={index}>• {point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="text-red-600 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold text-red-900 mb-2">Common Violations</h4>
                        <ul className="text-red-800 space-y-1 text-sm">
                          {rule.commonViolations.map((violation, index) => (
                            <li key={index}>• {violation}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quiz Section */}
            {quizzes && quizzes.length > 0 && (
              <QuizSection quizzes={quizzes} ruleId={rule.id} />
            )}

            {/* Related Rules */}
            {rule.relatedRules.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Related Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {rule.relatedRules.map((relatedRuleNumber) => {
                      const relatedRule = allRules?.find(r => r.ruleNumber === relatedRuleNumber);
                      if (!relatedRule) return null;
                      
                      return (
                        <Link key={relatedRuleNumber} href={`/rule/${relatedRuleNumber}`}>
                          <div className="block p-4 border border-gray-200 rounded-lg hover:border-primary/30 hover:shadow-md transition-all">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <span className="text-primary font-bold text-sm">{relatedRuleNumber}</span>
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">Rule {relatedRuleNumber} - {relatedRule.title}</h3>
                                <p className="text-sm text-gray-600">{relatedRule.plainEnglish.slice(0, 60)}...</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {previousRule ? (
                    <Link href={`/rule/${previousRule.ruleNumber}`}>
                      <Button variant="outline" className="flex items-center space-x-3">
                        <ChevronLeft size={16} />
                        <div className="text-left">
                          <div className="font-medium">Previous Rule</div>
                          <div className="text-sm text-gray-600">Rule {previousRule.ruleNumber} - {previousRule.title}</div>
                        </div>
                      </Button>
                    </Link>
                  ) : (
                    <div />
                  )}
                  
                  <Button 
                    onClick={handleMarkComplete}
                    disabled={isCompleted}
                    className={isCompleted ? "bg-green-600 hover:bg-green-700" : "bg-green-600 hover:bg-green-700"}
                  >
                    <Check className="mr-2" size={16} />
                    {isCompleted ? "Completed" : "Mark as Complete"}
                  </Button>
                  
                  {nextRule ? (
                    <Link href={`/rule/${nextRule.ruleNumber}`}>
                      <Button variant="outline" className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="font-medium">Next Rule</div>
                          <div className="text-sm text-gray-600">Rule {nextRule.ruleNumber} - {nextRule.title}</div>
                        </div>
                        <ChevronRight size={16} />
                      </Button>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Progress Modal */}
      <ProgressModal 
        isOpen={showProgressModal}
        onClose={() => setShowProgressModal(false)}
        ruleTitle={`Rule ${rule.ruleNumber} - ${rule.title}`}
        overallProgress={overallProgress}
        completedRules={completedRules + (isCompleted ? 0 : 1)}
        totalRules={totalRules}
        nextRule={nextRule}
      />
    </div>
  );
}
