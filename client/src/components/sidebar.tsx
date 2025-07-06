import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, CheckCircle, PlayCircle, Circle, Lock } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import type { Rule } from "@shared/schema";
import { useProgress } from "@/hooks/use-progress";

interface SidebarProps {
  currentRuleId: number;
}

export default function Sidebar({ currentRuleId }: SidebarProps) {
  const { data: rules } = useQuery<Rule[]>({
    queryKey: ["/api/rules"],
  });

  const { progressData, overallProgress } = useProgress();
  const [expandedParts, setExpandedParts] = useState<Record<string, boolean>>({});

  if (!rules) return null;

  const rulesByPart = rules.reduce((acc, rule) => {
    if (!acc[rule.part]) acc[rule.part] = [];
    acc[rule.part].push(rule);
    return acc;
  }, {} as Record<string, Rule[]>);

  // Sort rules within each part by rule number (numerical order)
  Object.keys(rulesByPart).forEach(part => {
    rulesByPart[part].sort((a, b) => {
      const aNum = parseInt(a.ruleNumber);
      const bNum = parseInt(b.ruleNumber);
      return aNum - bNum;
    });
  });

  const completedRules = progressData?.filter(p => p.completed).length || 0;
  const totalRules = rules.length;

  const togglePart = (part: string) => {
    setExpandedParts(prev => ({
      ...prev,
      [part]: !prev[part]
    }));
  };

  const getRuleStatus = (rule: Rule) => {
    const isCompleted = progressData?.some(p => p.ruleId === rule.id && p.completed);
    const isCurrent = rule.id === currentRuleId;
    
    if (isCompleted) return 'completed';
    if (isCurrent) return 'current';
    
    // Check if this rule is unlocked (previous rules completed)
    const ruleIndex = rules.findIndex(r => r.id === rule.id);
    const previousRules = rules.slice(0, ruleIndex);
    const allPreviousCompleted = previousRules.every(prevRule => 
      progressData?.some(p => p.ruleId === prevRule.id && p.completed)
    );
    
    if (ruleIndex === 0 || allPreviousCompleted) return 'available';
    return 'locked';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'current':
        return <PlayCircle className="text-primary" size={16} />;
      case 'available':
        return <Circle className="text-gray-400" size={16} />;
      case 'locked':
        return <Lock className="text-gray-300" size={16} />;
      default:
        return <Circle className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 hover:text-green-700';
      case 'current':
        return 'text-primary hover:text-primary/80 bg-primary/10 rounded px-2 -mx-2 font-medium';
      case 'available':
        return 'text-gray-700 hover:text-gray-900';
      case 'locked':
        return 'text-gray-400 cursor-not-allowed';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Course Modules</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-2">
            {Object.entries(rulesByPart).map(([part, partRules]) => {
              const completedInPart = partRules.filter(rule => 
                progressData?.some(p => p.ruleId === rule.id && p.completed)
              ).length;
              const partProgress = (completedInPart / partRules.length) * 100;
              const isExpanded = expandedParts[part] ?? (partRules.some(r => r.id === currentRuleId));
              const hasCurrentRule = partRules.some(r => r.id === currentRuleId);

              return (
                <Collapsible key={part} open={isExpanded} onOpenChange={() => togglePart(part)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between p-3 h-auto ${
                        hasCurrentRule ? 'border border-primary/30 bg-primary/5' : 'border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          partProgress === 100 
                            ? 'bg-green-500 text-white' 
                            : hasCurrentRule
                            ? 'bg-primary text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {partProgress === 100 ? (
                            <CheckCircle size={14} />
                          ) : (
                            completedInPart
                          )}
                        </div>
                        <span className="font-medium text-gray-900">Part {part} - {partRules[0]?.partTitle}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="text-gray-400" size={16} />
                      ) : (
                        <ChevronDown className="text-gray-400" size={16} />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-2 mt-2 ml-4">
                      {partRules.map((rule) => {
                        const status = getRuleStatus(rule);
                        const isClickable = status !== 'locked';
                        
                        return (
                          <div key={rule.id}>
                            {isClickable ? (
                              <Link href={`/rule/${rule.ruleNumber}`}>
                                <div className={`flex items-center space-x-3 text-sm py-1 px-2 rounded cursor-pointer ${getStatusColor(status)}`}>
                                  {getStatusIcon(status)}
                                  <span>Rule {rule.ruleNumber} - {rule.title}</span>
                                </div>
                              </Link>
                            ) : (
                              <div className={`flex items-center space-x-3 text-sm py-1 px-2 ${getStatusColor(status)}`}>
                                {getStatusIcon(status)}
                                <span>Rule {rule.ruleNumber} - {rule.title}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>

          {/* Progress Summary */}
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h3 className="text-sm font-semibold text-primary mb-2">Your Progress</h3>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Completed</span>
              <span className="font-semibold text-primary">{completedRules}/{totalRules} Rules</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
