import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
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

export type User = {
  id: string;
  username: string;
};
