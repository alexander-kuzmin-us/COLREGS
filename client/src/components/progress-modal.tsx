import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, BookOpen } from "lucide-react";
import { Link } from "wouter";
import type { Rule } from "@shared/schema";

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  ruleTitle: string;
  overallProgress: number;
  completedRules: number;
  totalRules: number;
  nextRule?: Rule | null;
}

export default function ProgressModal({
  isOpen,
  onClose,
  ruleTitle,
  overallProgress,
  completedRules,
  totalRules,
  nextRule
}: ProgressModalProps) {
  const remainingRules = totalRules - completedRules;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="text-white" size={32} />
            </div>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Rule Completed!
            </DialogTitle>
            <p className="text-gray-600 mt-2">
              You've successfully completed {ruleTitle}
            </p>
          </div>
        </DialogHeader>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{Math.round(overallProgress)}% Complete</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center text-sm mb-6">
          <div>
            <div className="text-2xl font-bold text-green-600">{completedRules}</div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">1</div>
            <div className="text-gray-600">Current</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-400">{remainingRules}</div>
            <div className="text-gray-600">Remaining</div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Review Rule
          </Button>
          {nextRule ? (
            <Button asChild className="flex-1">
              <Link href={`/rule/${nextRule.ruleNumber}`} onClick={onClose}>
                <BookOpen className="mr-2" size={16} />
                Continue Learning
              </Link>
            </Button>
          ) : (
            <Button asChild className="flex-1">
              <Link href="/" onClick={onClose}>
                <BookOpen className="mr-2" size={16} />
                Back to Home
              </Link>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
