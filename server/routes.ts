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
        score
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit quiz answer" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
