import { useAuth } from "@/hooks/useAuth";
import AchievementDisplay from "@/components/achievements";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Target, Home, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function AchievementsPage() {
  const { user } = useAuth();
  const userId = user?.id || "default";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" asChild className="flex items-center gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="ghost" asChild className="flex items-center gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Maritime Achievements
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your progress through COLREGS mastery with maritime-inspired badges. 
            Complete quizzes, achieve perfect scores, and master rule sections to earn achievements.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="text-center">
              <Trophy className="h-10 w-10 text-yellow-600 mx-auto mb-2" />
              <CardTitle className="text-lg">First Mate</CardTitle>
              <CardDescription>Complete your first quiz</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Star className="h-10 w-10 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Navigation Master</CardTitle>
              <CardDescription>Achieve a perfect score</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Target className="h-10 w-10 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Part Captain</CardTitle>
              <CardDescription>Master all rules in a part</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <AchievementDisplay userId={userId} />
      </div>
    </div>
  );
}