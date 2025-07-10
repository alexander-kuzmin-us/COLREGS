var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/db.ts
import { neon } from "@netlify/neon";
import { drizzle } from "drizzle-orm/neon-http";

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
var sql = neon();
var db = drizzle(sql, { schema: schema_exports });

// netlify/functions/api.ts
import { eq } from "drizzle-orm";
var handler = async (event, context) => {
  const { httpMethod, path, queryStringParameters, body } = event;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
  };
  if (httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }
  try {
    const url = path;
    const method = httpMethod.toLowerCase();
    if (url.startsWith("/api/")) {
      if (url === "/api/rules" && method === "get") {
        const allRules = await db.select().from(rules);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(allRules)
        };
      }
      if (url.match(/^\/api\/rules\/\d+$/) && method === "get") {
        const ruleId = parseInt(url.split("/").pop());
        const rule = await db.select().from(rules).where(eq(rules.id, ruleId));
        if (rule.length === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: "Rule not found" })
          };
        }
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(rule[0])
        };
      }
      if (url === "/api/quizzes" && method === "get") {
        const allQuizzes = await db.select().from(quizzes);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(allQuizzes)
        };
      }
      if (url.match(/^\/api\/quizzes\/rule\/\d+$/) && method === "get") {
        const ruleId = parseInt(url.split("/").pop());
        const ruleQuizzes = await db.select().from(quizzes).where(eq(quizzes.ruleId, ruleId));
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(ruleQuizzes)
        };
      }
      if (url === "/api/progress" && method === "get") {
        const userId = queryStringParameters?.userId || "default";
        const userProgressData = await db.select().from(userProgress).where(eq(userProgress.userId, userId));
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(userProgressData)
        };
      }
      if (url === "/api/progress" && method === "post") {
        const progressData = JSON.parse(body || "{}");
        const newProgress = await db.insert(userProgress).values(progressData).returning();
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(newProgress[0])
        };
      }
      if (url.startsWith("/api/auth/")) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: "Auth endpoint - implement as needed" })
        };
      }
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: "API endpoint not found" })
      };
    }
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Not found" })
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" })
    };
  }
};
export {
  handler
};
