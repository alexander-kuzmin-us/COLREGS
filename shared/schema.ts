import { pgTable, text, varchar, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rules = pgTable("rules", {
  id: serial("id").primaryKey(),
  ruleNumber: text("rule_number").notNull(),
  title: text("title").notNull(),
  part: text("part").notNull(),
  partTitle: text("part_title").notNull(),
  officialText: text("official_text").notNull(),
  plainEnglish: text("plain_english").notNull(),
  keyPoints: text("key_points").array().notNull(),
  commonViolations: text("common_violations").array().notNull(),
  relatedRules: text("related_rules").array().notNull(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  ruleId: integer("rule_id").notNull().references(() => rules.id),
  question: text("question").notNull(),
  options: text("options").array().notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  difficulty: text("difficulty", { enum: ["easy", "medium", "hard"] }).notNull().default("medium")
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().default("default"),
  ruleId: integer("rule_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  quizScore: integer("quiz_score"),
  completedAt: text("completed_at"),
});

export const insertRuleSchema = createInsertSchema(rules).omit({
  id: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
  ruleId: true,
}).extend({
  ruleId: z.number(),
});

export const insertProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
});

export type InsertRule = z.infer<typeof insertRuleSchema>;
export type Rule = typeof rules.$inferSelect;

export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzes.$inferSelect;

export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type Progress = typeof userProgress.$inferSelect;

// User table for authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey(), // Google ID
  email: varchar("email").notNull().unique(),
  name: varchar("name").notNull(),
  picture: varchar("picture"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Assessment tables
export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  score: integer("score").notNull(),
  timeSpent: integer("time_spent").notNull(), // seconds
  timeLimit: integer("time_limit").notNull(), // seconds
  passingGrade: boolean("passing_grade").notNull().default(false),
  parts: text("parts").array().notNull(),
  difficulty: text("difficulty").array().notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const assessmentResults = pgTable("assessment_results", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").references(() => assessments.id).notNull(),
  questionId: integer("question_id").references(() => quizzes.id).notNull(),
  selectedAnswer: integer("selected_answer").notNull(),
  correct: boolean("correct").notNull(),
  timeSpent: integer("time_spent").notNull(), // seconds
});

export const insertAssessmentSchema = createInsertSchema(assessments, {
  id: z.number().optional(),
  completedAt: z.date().optional(),
}).omit({
  id: true,
  completedAt: true,
});

export const insertAssessmentResultSchema = createInsertSchema(assessmentResults, {
  id: z.number().optional(),
}).omit({
  id: true,
});

export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;

export type InsertAssessmentResult = z.infer<typeof insertAssessmentResultSchema>;
export type AssessmentResult = typeof assessmentResults.$inferSelect;
