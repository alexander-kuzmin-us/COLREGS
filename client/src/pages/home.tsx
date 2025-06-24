import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Ship, Search, BookOpen, Award, Clock, Target } from "lucide-react";
import { Link } from "wouter";
import type { Rule } from "@shared/schema";
import { useProgress } from "@/hooks/use-progress";

export default function Home() {
  const { data: rules, isLoading } = useQuery<Rule[]>({
    queryKey: ["/api/rules"],
  });

  const { progressData, overallProgress } = useProgress();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const rulesByPart = rules?.reduce((acc, rule) => {
    if (!acc[rule.part]) acc[rule.part] = [];
    acc[rule.part].push(rule);
    return acc;
  }, {} as Record<string, Rule[]>) || {};

  const completedRules = progressData?.filter(p => p.completed).length || 0;
  const totalRules = rules?.length || 0;

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              International Regulations for Preventing Collisions at Sea
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              Master the essential maritime safety rules with interactive learning modules, 
              quizzes, and real-world scenarios. Learn the COLREGS that keep vessels safe worldwide.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/rule/1">
                  <BookOpen className="mr-2" size={16} />
                  Start Learning
                </Link>
              </Button>
              <Button variant="outline">
                <Target className="mr-2" size={16} />
                Take Assessment
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rules</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRules}</div>
              <p className="text-xs text-muted-foreground">Across 5 parts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedRules}</div>
              <p className="text-xs text-muted-foreground">Rules mastered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.5h</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Modules */}
        <div className="space-y-6">
          {Object.entries(rulesByPart).map(([part, partRules]) => {
            const completedInPart = partRules.filter(rule => 
              progressData?.some(p => p.ruleId === rule.id && p.completed)
            ).length;
            const partProgress = (completedInPart / partRules.length) * 100;

            return (
              <Card key={part}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        Part {part} - {partRules[0]?.partTitle}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {partRules.length} rules • {completedInPart} completed
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {Math.round(partProgress)}%
                      </div>
                      <Progress value={partProgress} className="w-24 mt-1" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {partRules.map((rule) => {
                      const isCompleted = progressData?.some(p => p.ruleId === rule.id && p.completed);
                      return (
                        <Link key={rule.id} href={`/rule/${rule.ruleNumber}`}>
                          <div className="p-4 border border-gray-200 rounded-lg hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
                            <div className="flex items-start space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                isCompleted 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {rule.ruleNumber}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-900 truncate">
                                  Rule {rule.ruleNumber} - {rule.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                  {rule.plainEnglish.slice(0, 100)}...
                                </p>
                                <div className="flex items-center mt-2 space-x-2">
                                  {isCompleted && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                                      Completed
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
