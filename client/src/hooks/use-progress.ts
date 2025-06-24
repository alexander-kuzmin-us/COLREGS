import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Progress } from "@shared/schema";

export function useProgress(userId: string = "default") {
  const queryClient = useQueryClient();
  
  const { data: progressData, isLoading } = useQuery<Progress[]>({
    queryKey: [`/api/progress/${userId}`],
  });

  const markCompleteeMutation = useMutation({
    mutationFn: async (ruleId: number) => {
      const response = await apiRequest("POST", "/api/progress", {
        userId,
        ruleId,
        completed: true,
        completedAt: new Date().toISOString()
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/progress/${userId}`] });
    }
  });

  const markRuleComplete = (ruleId: number) => {
    return markCompleteeMutation.mutateAsync(ruleId);
  };

  // Calculate overall progress
  const completedRules = progressData?.filter(p => p.completed).length || 0;
  const totalRules = 15; // We know there are 15 rules in COLREGS
  const overallProgress = totalRules > 0 ? (completedRules / totalRules) * 100 : 0;

  return {
    progressData,
    isLoading,
    markRuleComplete,
    overallProgress,
    completedRules,
    totalRules,
    isMarkingComplete: markCompleteeMutation.isPending
  };
}
