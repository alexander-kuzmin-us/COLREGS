import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { 
  Trophy, 
  Anchor, 
  Compass, 
  MapPin, 
  Ship, 
  Crown,
  Share2,
  Calendar,
  Award
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Achievement {
  id: number;
  userId: string;
  badgeType: string;
  badgeTitle: string;
  badgeDescription: string;
  iconName: string;
  earnedAt: string;
  shared: boolean;
  sharedAt: string | null;
  ruleId?: number;
  partName?: string;
}

interface AchievementDisplayProps {
  userId: string;
  compact?: boolean;
}

const getBadgeIcon = (iconName: string) => {
  switch (iconName) {
    case 'anchor':
      return <Anchor className="h-6 w-6" />;
    case 'compass':
      return <Compass className="h-6 w-6" />;
    case 'lighthouse':
      return <MapPin className="h-6 w-6" />;
    case 'ship':
      return <Ship className="h-6 w-6" />;
    case 'ship-wheel':
      return <Ship className="h-6 w-6" />;
    case 'crown':
      return <Crown className="h-6 w-6" />;
    default:
      return <Trophy className="h-6 w-6" />;
  }
};

const getBadgeColor = (badgeType: string) => {
  switch (badgeType) {
    case 'first_quiz':
      return 'bg-blue-500/20 text-blue-700 border-blue-300';
    case 'perfect_score':
      return 'bg-yellow-500/20 text-yellow-700 border-yellow-300';
    case 'part_master':
      return 'bg-green-500/20 text-green-700 border-green-300';
    case 'speed_demon':
      return 'bg-red-500/20 text-red-700 border-red-300';
    case 'scholar':
      return 'bg-purple-500/20 text-purple-700 border-purple-300';
    default:
      return 'bg-gray-500/20 text-gray-700 border-gray-300';
  }
};

export default function AchievementDisplay({ userId, compact = false }: AchievementDisplayProps) {
  const queryClient = useQueryClient();
  
  const { data: achievements = [], isLoading } = useQuery({
    queryKey: ['/api/achievements', userId],
    queryFn: async () => {
      const response = await fetch(`/api/achievements/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch achievements');
      return response.json();
    },
    enabled: !!userId
  });

  const shareAchievement = useMutation({
    mutationFn: async ({ achievementId, shared }: { achievementId: number; shared: boolean }) => {
      return apiRequest("POST", `/api/achievements/${achievementId}/share`, { shared });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/achievements', userId] });
      toast({
        title: "Achievement Updated",
        description: "Your sharing preference has been saved."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update achievement sharing.",
        variant: "destructive"
      });
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (achievements.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No achievements yet. Complete quizzes to earn maritime badges!</p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {achievements.map((achievement: Achievement) => (
          <div
            key={achievement.id}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border ${getBadgeColor(achievement.badgeType)}`}
            title={achievement.badgeDescription}
          >
            {getBadgeIcon(achievement.iconName)}
            <span>{achievement.badgeTitle}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-6 w-6 text-yellow-600" />
        <h2 className="text-2xl font-bold">Maritime Achievements</h2>
        <Badge variant="outline" className="ml-auto">
          {achievements.length} Badge{achievements.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement: Achievement) => (
          <Card key={achievement.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getBadgeColor(achievement.badgeType)}`}>
                  {getBadgeIcon(achievement.iconName)}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{achievement.badgeTitle}</CardTitle>
                  <CardDescription>{achievement.badgeDescription}</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <Calendar className="h-4 w-4" />
                <span>Earned {new Date(achievement.earnedAt).toLocaleDateString()}</span>
              </div>
              
              {achievement.partName && (
                <Badge variant="outline" className="mb-3">
                  Part {achievement.partName}
                </Badge>
              )}
              
              <div className="flex items-center gap-2">
                <Button
                  variant={achievement.shared ? "default" : "outline"}
                  size="sm"
                  onClick={() => shareAchievement.mutate({ 
                    achievementId: achievement.id, 
                    shared: !achievement.shared 
                  })}
                  disabled={shareAchievement.isPending}
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  {achievement.shared ? 'Shared' : 'Share'}
                </Button>
                
                {achievement.shared && achievement.sharedAt && (
                  <span className="text-xs text-gray-500">
                    Shared {new Date(achievement.sharedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}