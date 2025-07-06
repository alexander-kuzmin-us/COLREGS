import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { 
  Trophy, 
  Anchor, 
  Compass, 
  MapPin, 
  Ship, 
  Crown
} from "lucide-react";

interface Achievement {
  id: number;
  badgeType: string;
  badgeTitle: string;
  badgeDescription: string;
  iconName: string;
}

interface AchievementNotificationProps {
  achievements: Achievement[];
  onAcknowledge?: () => void;
}

const getBadgeIcon = (iconName: string) => {
  switch (iconName) {
    case 'anchor':
      return <Anchor className="h-5 w-5" />;
    case 'compass':
      return <Compass className="h-5 w-5" />;
    case 'lighthouse':
      return <MapPin className="h-5 w-5" />;
    case 'ship':
      return <Ship className="h-5 w-5" />;
    case 'ship-wheel':
      return <Ship className="h-5 w-5" />;
    case 'crown':
      return <Crown className="h-5 w-5" />;
    default:
      return <Trophy className="h-5 w-5" />;
  }
};

export default function AchievementNotification({ 
  achievements, 
  onAcknowledge 
}: AchievementNotificationProps) {
  useEffect(() => {
    if (achievements.length > 0) {
      achievements.forEach((achievement) => {
        toast({
          title: "🏆 Achievement Unlocked!",
          description: (
            <div className="flex items-center gap-3 mt-2">
              <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-700">
                {getBadgeIcon(achievement.iconName)}
              </div>
              <div>
                <div className="font-semibold">{achievement.badgeTitle}</div>
                <div className="text-sm text-gray-600">{achievement.badgeDescription}</div>
              </div>
            </div>
          ),
          duration: 5000,
        });
      });
      
      if (onAcknowledge) {
        onAcknowledge();
      }
    }
  }, [achievements, onAcknowledge]);

  // This component doesn't render anything visible, it just handles notifications
  return null;
}