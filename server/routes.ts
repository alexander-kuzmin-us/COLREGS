import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProgressSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all rules
  app.get("/api/rules", async (req, res) => {
    try {
      const rules = await storage.getAllRules();
      res.json(rules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rules" });
    }
  });

  // Get specific rule by ID
  app.get("/api/rules/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const rule = await storage.getRuleById(id);
      if (!rule) {
        return res.status(404).json({ message: "Rule not found" });
      }
      res.json(rule);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rule" });
    }
  });

  // Get rule by rule number
  app.get("/api/rules/number/:ruleNumber", async (req, res) => {
    try {
      const rule = await storage.getRuleByNumber(req.params.ruleNumber);
      if (!rule) {
        return res.status(404).json({ message: "Rule not found" });
      }
      res.json(rule);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rule" });
    }
  });

  // Get quizzes for a rule
  app.get("/api/rules/:id/quizzes", async (req, res) => {
    try {
      const ruleId = parseInt(req.params.id);
      const quizzes = await storage.getQuizzesByRuleId(ruleId);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });

  // Get user progress
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.params.userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Update/create progress
  app.post("/api/progress", async (req, res) => {
    try {
      const validated = insertProgressSchema.parse(req.body);
      const progress = await storage.updateProgress(
        validated.userId || "default",
        validated.ruleId,
        validated
      );
      res.json(progress);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress data" });
    }
  });

  // Submit quiz answer
  app.post("/api/quiz/:quizId/submit", async (req, res) => {
    try {
      const quizId = parseInt(req.params.quizId);
      const { answer, userId = "default" } = req.body;

      const quiz = await storage.getQuizById(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      const isCorrect = answer === quiz.correctAnswer;
      const score = isCorrect ? 100 : 0;

      // Update progress with quiz score
      await storage.updateProgress(userId, quiz.ruleId, {
        quizScore: score,
        userId,
        ruleId: quiz.ruleId
      });

      res.json({
        correct: isCorrect,
        correctAnswer: quiz.correctAnswer,
        explanation: quiz.explanation,
        score,
        difficulty: quiz.difficulty || 'medium'
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit quiz answer" });
    }
  });

  // Assessment routes
  app.post("/api/assessment/create", async (req: Request, res: Response) => {
    try {
      const { parts, difficulty, questionCount, userId } = req.body;
      
      // Get all quizzes for specified parts and difficulty
      const allQuizzes = await storage.getAllQuizzes();
      const rules = await storage.getAllRules();
      
      // Filter quizzes by parts and difficulty
      const filteredQuizzes = allQuizzes.filter(quiz => {
        const rule = rules.find(r => r.id === quiz.ruleId);
        const matchesPart = parts.length === 0 || parts.includes(rule?.part);
        const matchesDifficulty = difficulty.includes(quiz.difficulty || 'medium');
        return matchesPart && matchesDifficulty;
      });
      
      // Randomly select questions
      const shuffled = [...filteredQuizzes].sort(() => 0.5 - Math.random());
      const selectedQuizzes = shuffled.slice(0, Math.min(questionCount, shuffled.length));
      
      // Add rule information to questions
      const questions = selectedQuizzes.map(quiz => {
        const rule = rules.find(r => r.id === quiz.ruleId);
        return {
          ...quiz,
          ruleName: rule?.title || '',
          ruleNumber: rule?.ruleNumber || '',
          part: rule?.part || ''
        };
      });
      
      res.json({ questions });
    } catch (error) {
      res.status(500).json({ message: "Failed to create assessment" });
    }
  });

  app.post("/api/assessment/submit", async (req: Request, res: Response) => {
    try {
      const { questionIds, answers, timings, userId } = req.body;
      
      // Get quiz details and rules
      const allQuizzes = await storage.getAllQuizzes();
      const rules = await storage.getAllRules();
      
      let correctAnswers = 0;
      const results: any[] = [];
      const partBreakdown: Record<string, { correct: number; total: number; score: number }> = {};
      const difficultyBreakdown: Record<string, { correct: number; total: number; score: number }> = {};
      let totalTimeSpent = 0;
      
      // Process each answer
      for (const questionId of questionIds) {
        const quiz = allQuizzes.find(q => q.id === questionId);
        const rule = rules.find(r => r.id === quiz?.ruleId);
        const selectedAnswer = answers[questionId];
        const timeSpent = timings[questionId] || 0;
        const correct = quiz && selectedAnswer === quiz.correctAnswer;
        
        if (correct) correctAnswers++;
        totalTimeSpent += timeSpent;
        
        results.push({
          questionId,
          correct,
          selectedAnswer: selectedAnswer || -1,
          correctAnswer: quiz?.correctAnswer || 0,
          explanation: quiz?.explanation || '',
          timeSpent
        });
        
        // Update breakdowns
        if (rule) {
          if (!partBreakdown[rule.part]) {
            partBreakdown[rule.part] = { correct: 0, total: 0, score: 0 };
          }
          partBreakdown[rule.part].total++;
          if (correct) partBreakdown[rule.part].correct++;
        }
        
        const difficulty = quiz?.difficulty || 'medium';
        if (!difficultyBreakdown[difficulty]) {
          difficultyBreakdown[difficulty] = { correct: 0, total: 0, score: 0 };
        }
        difficultyBreakdown[difficulty].total++;
        if (correct) difficultyBreakdown[difficulty].correct++;
      }
      
      // Calculate scores
      const score = (correctAnswers / questionIds.length) * 100;
      const passingGrade = score >= 70;
      
      // Calculate breakdown scores
      Object.keys(partBreakdown).forEach(part => {
        partBreakdown[part].score = (partBreakdown[part].correct / partBreakdown[part].total) * 100;
      });
      
      Object.keys(difficultyBreakdown).forEach(difficulty => {
        difficultyBreakdown[difficulty].score = (difficultyBreakdown[difficulty].correct / difficultyBreakdown[difficulty].total) * 100;
      });
      
      // Save assessment to database
      const assessmentData = {
        userId,
        totalQuestions: questionIds.length,
        correctAnswers,
        score: Math.round(score),
        timeSpent: totalTimeSpent,
        timeLimit: 1800, // Default 30 minutes
        passingGrade,
        parts: Object.keys(partBreakdown),
        difficulty: Object.keys(difficultyBreakdown)
      };
      
      const assessment = await storage.createAssessment(assessmentData);
      
      // Save individual results
      for (const result of results) {
        await storage.createAssessmentResult({
          assessmentId: assessment.id,
          questionId: result.questionId,
          selectedAnswer: result.selectedAnswer,
          correct: result.correct,
          timeSpent: result.timeSpent
        });
      }
      
      const report = {
        totalQuestions: questionIds.length,
        correctAnswers,
        score,
        timeSpent: totalTimeSpent,
        passingGrade,
        partBreakdown,
        difficultyBreakdown,
        results
      };
      
      res.json(report);
    } catch (error) {
      res.status(500).json({ message: "Failed to submit assessment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
