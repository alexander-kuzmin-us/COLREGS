var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  achievements: () => achievements,
  assessmentResults: () => assessmentResults,
  assessments: () => assessments,
  insertAchievementSchema: () => insertAchievementSchema,
  insertAssessmentResultSchema: () => insertAssessmentResultSchema,
  insertAssessmentSchema: () => insertAssessmentSchema,
  insertProgressSchema: () => insertProgressSchema,
  insertQuizSchema: () => insertQuizSchema,
  insertRuleSchema: () => insertRuleSchema,
  quizzes: () => quizzes,
  rules: () => rules,
  userProgress: () => userProgress,
  users: () => users
});
import { pgTable, text, varchar, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var rules = pgTable("rules", {
  id: serial("id").primaryKey(),
  ruleNumber: text("rule_number").notNull(),
  title: text("title").notNull(),
  part: text("part").notNull(),
  partTitle: text("part_title").notNull(),
  officialText: text("official_text").notNull(),
  plainEnglish: text("plain_english").notNull(),
  keyPoints: text("key_points").array().notNull(),
  commonViolations: text("common_violations").array().notNull(),
  relatedRules: text("related_rules").array().notNull()
});
var quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  ruleId: integer("rule_id").notNull().references(() => rules.id),
  question: text("question").notNull(),
  options: text("options").array().notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  difficulty: text("difficulty", { enum: ["easy", "medium", "hard"] }).notNull().default("medium")
});
var userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().default("default"),
  ruleId: integer("rule_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  quizScore: integer("quiz_score"),
  completedAt: text("completed_at")
});
var insertRuleSchema = createInsertSchema(rules).omit({
  id: true
});
var insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
  ruleId: true
}).extend({
  ruleId: z.number()
});
var insertProgressSchema = createInsertSchema(userProgress).omit({
  id: true
});
var users = pgTable("users", {
  id: varchar("id").primaryKey(),
  // Google ID
  email: varchar("email").notNull().unique(),
  name: varchar("name").notNull(),
  picture: varchar("picture"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  score: integer("score").notNull(),
  timeSpent: integer("time_spent").notNull(),
  // seconds
  timeLimit: integer("time_limit").notNull(),
  // seconds
  passingGrade: boolean("passing_grade").notNull().default(false),
  parts: text("parts").array().notNull(),
  difficulty: text("difficulty").array().notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull()
});
var assessmentResults = pgTable("assessment_results", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").references(() => assessments.id).notNull(),
  questionId: integer("question_id").references(() => quizzes.id).notNull(),
  selectedAnswer: integer("selected_answer").notNull(),
  correct: boolean("correct").notNull(),
  timeSpent: integer("time_spent").notNull()
  // seconds
});
var insertAssessmentSchema = createInsertSchema(assessments, {
  id: z.number().optional(),
  completedAt: z.date().optional()
}).omit({
  id: true,
  completedAt: true
});
var insertAssessmentResultSchema = createInsertSchema(assessmentResults, {
  id: z.number().optional()
}).omit({
  id: true
});
var achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().default("default"),
  badgeType: text("badge_type").notNull(),
  // e.g., "first_quiz", "perfect_score", "part_master"
  badgeTitle: text("badge_title").notNull(),
  badgeDescription: text("badge_description").notNull(),
  iconName: text("icon_name").notNull(),
  // icon identifier for maritime badges
  ruleId: integer("rule_id").references(() => rules.id),
  // optional, for rule-specific badges
  partName: text("part_name"),
  // optional, for part-specific badges
  earnedAt: timestamp("earned_at").notNull().defaultNow(),
  shared: boolean("shared").notNull().default(false),
  sharedAt: timestamp("shared_at")
});
var insertAchievementSchema = createInsertSchema(achievements, {
  earnedAt: z.date().optional(),
  sharedAt: z.date().optional()
}).omit({
  id: true,
  earnedAt: true
});

// server/db.ts
import { neon } from "@netlify/neon";
import { drizzle } from "drizzle-orm/neon-http";
var sql = neon();
var db = drizzle(sql, { schema: schema_exports });

// server/storage.ts
import { eq, and } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.id,
      set: {
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  async getAllRules() {
    const allRules = await db.select().from(rules).orderBy(rules.part, rules.ruleNumber);
    return allRules;
  }
  async getRuleById(id) {
    const [rule] = await db.select().from(rules).where(eq(rules.id, id));
    return rule || void 0;
  }
  async getRuleByNumber(ruleNumber) {
    const [rule] = await db.select().from(rules).where(eq(rules.ruleNumber, ruleNumber));
    return rule || void 0;
  }
  async createRule(insertRule) {
    const [rule] = await db.insert(rules).values(insertRule).returning();
    return rule;
  }
  async getQuizzesByRuleId(ruleId) {
    const quizList = await db.select().from(quizzes).where(eq(quizzes.ruleId, ruleId));
    return quizList;
  }
  async getQuizById(id) {
    const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, id));
    return quiz || void 0;
  }
  async createQuiz(insertQuiz) {
    const [quiz] = await db.insert(quizzes).values(insertQuiz).returning();
    return quiz;
  }
  async getUserProgress(userId) {
    const progressList = await db.select().from(userProgress).where(eq(userProgress.userId, userId));
    return progressList;
  }
  async getProgressByUserAndRule(userId, ruleId) {
    const [progress] = await db.select().from(userProgress).where(and(eq(userProgress.userId, userId), eq(userProgress.ruleId, ruleId)));
    return progress || void 0;
  }
  async updateProgress(userId, ruleId, progressUpdate) {
    const existing = await this.getProgressByUserAndRule(userId, ruleId);
    if (existing) {
      const [updated] = await db.update(userProgress).set(progressUpdate).where(and(eq(userProgress.userId, userId), eq(userProgress.ruleId, ruleId))).returning();
      return updated;
    } else {
      return this.createProgress({ userId, ruleId, ...progressUpdate });
    }
  }
  async createProgress(insertProgress) {
    const [progress] = await db.insert(userProgress).values(insertProgress).returning();
    return progress;
  }
  async getAllQuizzes() {
    return await db.select().from(quizzes);
  }
  async createAssessment(insertAssessment) {
    const [assessment] = await db.insert(assessments).values(insertAssessment).returning();
    return assessment;
  }
  async createAssessmentResult(insertResult) {
    const [result] = await db.insert(assessmentResults).values(insertResult).returning();
    return result;
  }
  async getUserAssessments(userId) {
    return await db.select().from(assessments).where(eq(assessments.userId, userId));
  }
  async getUserAchievements(userId) {
    return await db.select().from(achievements).where(eq(achievements.userId, userId)).orderBy(achievements.earnedAt);
  }
  async createAchievement(achievement) {
    const [newAchievement] = await db.insert(achievements).values(achievement).returning();
    return newAchievement;
  }
  async updateAchievementShared(achievementId, shared) {
    const [updated] = await db.update(achievements).set({
      shared,
      sharedAt: shared ? /* @__PURE__ */ new Date() : null
    }).where(eq(achievements.id, achievementId)).returning();
    return updated;
  }
  async checkAndAwardAchievements(userId, quizScore, ruleId, partName) {
    const newAchievements = [];
    const existingAchievements = await this.getUserAchievements(userId);
    const hasFirstQuiz = existingAchievements.some((a) => a.badgeType === "first_quiz");
    if (!hasFirstQuiz && quizScore !== void 0) {
      const firstQuizBadge = await this.createAchievement({
        userId,
        badgeType: "first_quiz",
        badgeTitle: "First Mate",
        badgeDescription: "Completed your first quiz",
        iconName: "anchor",
        ruleId
      });
      newAchievements.push(firstQuizBadge);
    }
    if (quizScore === 100) {
      const perfectScoreBadge = await this.createAchievement({
        userId,
        badgeType: "perfect_score",
        badgeTitle: "Navigation Master",
        badgeDescription: "Achieved a perfect score on a quiz",
        iconName: "compass",
        ruleId
      });
      newAchievements.push(perfectScoreBadge);
    }
    if (partName) {
      const userProgress2 = await this.getUserProgress(userId);
      const allRules = await this.getAllRules();
      const partRules = allRules.filter((rule) => rule.part === partName);
      const completedPartRules = userProgress2.filter(
        (progress) => progress.completed && partRules.some((rule) => rule.id === progress.ruleId)
      );
      if (completedPartRules.length === partRules.length) {
        const hasPartMaster = existingAchievements.some(
          (a) => a.badgeType === "part_master" && a.partName === partName
        );
        if (!hasPartMaster) {
          const partMasterBadge = await this.createAchievement({
            userId,
            badgeType: "part_master",
            badgeTitle: `Part ${partName} Captain`,
            badgeDescription: `Mastered all rules in Part ${partName}`,
            iconName: "ship-wheel",
            partName
          });
          newAchievements.push(partMasterBadge);
        }
      }
    }
    return newAchievements;
  }
};
var storage = new DatabaseStorage();

// server/auth.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import connectPg from "connect-pg-simple";
function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1e3;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.NETLIFY_DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions"
  });
  return session({
    secret: process.env.SESSION_SECRET || "your-secret-key-change-this",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      // Set to false for Replit development environment
      maxAge: sessionTtl,
      sameSite: "lax"
      // Add sameSite for better compatibility
    }
  });
}
async function setupAuth(app2) {
  app2.use(getSession());
  app2.use(passport.initialize());
  app2.use(passport.session());
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.NODE_ENV === "production" && process.env.REPLIT_DOMAINS?.includes("replit.app") ? "https://colregs-academy.replit.app/api/auth/google/callback" : process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}/api/auth/google/callback` : "http://localhost:5000/api/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const userData = {
              id: profile.id,
              email: profile.emails?.[0]?.value || "",
              name: profile.displayName || "",
              picture: profile.photos?.[0]?.value || ""
            };
            const user = await storage.upsertUser(userData);
            return done(null, user);
          } catch (error) {
            return done(error, false);
          }
        }
      )
    );
  }
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    app2.get(
      "/api/auth/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );
    app2.get(
      "/api/auth/google/callback",
      passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/login-failed"
      })
    );
  } else {
    app2.get("/api/auth/google", (req, res) => {
      res.status(503).json({ error: "Google OAuth not configured" });
    });
    app2.get("/api/auth/google/callback", (req, res) => {
      res.status(503).json({ error: "Google OAuth not configured" });
    });
  }
  app2.get("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.redirect("/");
    });
  });
  app2.get("/api/auth/user", (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });
}

// server/routes.ts
async function registerRoutes(app2) {
  await setupAuth(app2);
  app2.get("/api/rules", async (req, res) => {
    try {
      const rules2 = await storage.getAllRules();
      res.json(rules2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rules" });
    }
  });
  app2.get("/api/rules/:id", async (req, res) => {
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
  app2.get("/api/rules/number/:ruleNumber", async (req, res) => {
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
  app2.get("/api/rules/:id/quizzes", async (req, res) => {
    try {
      const ruleId = parseInt(req.params.id);
      const quizzes2 = await storage.getQuizzesByRuleId(ruleId);
      res.json(quizzes2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });
  app2.get("/api/progress/:userId", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.params.userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });
  app2.post("/api/progress", async (req, res) => {
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
  app2.post("/api/quiz/:quizId/submit", async (req, res) => {
    try {
      const quizId = parseInt(req.params.quizId);
      const { answer, userId = "default" } = req.body;
      const quiz = await storage.getQuizById(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      const isCorrect = answer === quiz.correctAnswer;
      const score = isCorrect ? 100 : 0;
      await storage.updateProgress(userId, quiz.ruleId, {
        quizScore: score,
        userId,
        ruleId: quiz.ruleId
      });
      const rule = await storage.getRuleById(quiz.ruleId);
      const newAchievements = await storage.checkAndAwardAchievements(
        userId,
        score,
        quiz.ruleId,
        rule?.part
      );
      res.json({
        correct: isCorrect,
        correctAnswer: quiz.correctAnswer,
        explanation: quiz.explanation,
        score,
        difficulty: quiz.difficulty || "medium",
        achievements: newAchievements
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit quiz answer" });
    }
  });
  app2.post("/api/assessment/create", async (req, res) => {
    try {
      const { parts, difficulty, questionCount, userId } = req.body;
      const allQuizzes = await storage.getAllQuizzes();
      const rules2 = await storage.getAllRules();
      const filteredQuizzes = allQuizzes.filter((quiz) => {
        const rule = rules2.find((r) => r.id === quiz.ruleId);
        const matchesPart = parts.length === 0 || parts.includes(rule?.part);
        const matchesDifficulty = difficulty.includes(quiz.difficulty || "medium");
        return matchesPart && matchesDifficulty;
      });
      const shuffled = [...filteredQuizzes].sort(() => 0.5 - Math.random());
      const selectedQuizzes = shuffled.slice(0, Math.min(questionCount, shuffled.length));
      const questions = selectedQuizzes.map((quiz) => {
        const rule = rules2.find((r) => r.id === quiz.ruleId);
        return {
          ...quiz,
          ruleName: rule?.title || "",
          ruleNumber: rule?.ruleNumber || "",
          part: rule?.part || ""
        };
      });
      res.json({ questions });
    } catch (error) {
      res.status(500).json({ message: "Failed to create assessment" });
    }
  });
  app2.post("/api/assessment/submit", async (req, res) => {
    try {
      const { questionIds, answers, timings, userId } = req.body;
      const allQuizzes = await storage.getAllQuizzes();
      const rules2 = await storage.getAllRules();
      let correctAnswers = 0;
      const results = [];
      const partBreakdown = {};
      const difficultyBreakdown = {};
      let totalTimeSpent = 0;
      for (const questionId of questionIds) {
        const quiz = allQuizzes.find((q) => q.id === questionId);
        const rule = rules2.find((r) => r.id === quiz?.ruleId);
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
          explanation: quiz?.explanation || "",
          timeSpent
        });
        if (rule) {
          if (!partBreakdown[rule.part]) {
            partBreakdown[rule.part] = { correct: 0, total: 0, score: 0 };
          }
          partBreakdown[rule.part].total++;
          if (correct) partBreakdown[rule.part].correct++;
        }
        const difficulty = quiz?.difficulty || "medium";
        if (!difficultyBreakdown[difficulty]) {
          difficultyBreakdown[difficulty] = { correct: 0, total: 0, score: 0 };
        }
        difficultyBreakdown[difficulty].total++;
        if (correct) difficultyBreakdown[difficulty].correct++;
      }
      const score = correctAnswers / questionIds.length * 100;
      const passingGrade = score >= 70;
      Object.keys(partBreakdown).forEach((part) => {
        partBreakdown[part].score = partBreakdown[part].correct / partBreakdown[part].total * 100;
      });
      Object.keys(difficultyBreakdown).forEach((difficulty) => {
        difficultyBreakdown[difficulty].score = difficultyBreakdown[difficulty].correct / difficultyBreakdown[difficulty].total * 100;
      });
      const assessmentData = {
        userId,
        totalQuestions: questionIds.length,
        correctAnswers,
        score: Math.round(score),
        timeSpent: totalTimeSpent,
        timeLimit: 1800,
        // Default 30 minutes
        passingGrade,
        parts: Object.keys(partBreakdown),
        difficulty: Object.keys(difficultyBreakdown)
      };
      const assessment = await storage.createAssessment(assessmentData);
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
  app2.get("/api/achievements/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const achievements2 = await storage.getUserAchievements(userId);
      res.json(achievements2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });
  app2.post("/api/achievements/:achievementId/share", async (req, res) => {
    try {
      const { achievementId } = req.params;
      const { shared } = req.body;
      const updated = await storage.updateAchievementShared(
        parseInt(achievementId),
        shared === true
      );
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update achievement sharing" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "client", "index.html")
      }
    }
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
