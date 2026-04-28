import { 
  rules, 
  quizzes, 
  userProgress,
  assessments,
  assessmentResults,
  achievements,
  users,
  type Rule, 
  type Quiz, 
  type Progress, 
  type InsertRule, 
  type InsertQuiz, 
  type InsertProgress,
  type Assessment,
  type InsertAssessment,
  type AssessmentResult,
  type InsertAssessmentResult,
  type Achievement,
  type InsertAchievement,
  type User,
  type InsertUser
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: InsertUser): Promise<User>;

  // Rules
  getAllRules(): Promise<Rule[]>;
  getRuleById(id: number): Promise<Rule | undefined>;
  getRuleByNumber(ruleNumber: string): Promise<Rule | undefined>;
  createRule(rule: InsertRule): Promise<Rule>;

  // Quizzes
  getQuizzesByRuleId(ruleId: number): Promise<Quiz[]>;
  getQuizById(id: number): Promise<Quiz | undefined>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;

  // Progress
  getUserProgress(userId: string): Promise<Progress[]>;
  getProgressByUserAndRule(userId: string, ruleId: number): Promise<Progress | undefined>;
  updateProgress(userId: string, ruleId: number, progress: Partial<InsertProgress>): Promise<Progress>;
  createProgress(progress: InsertProgress): Promise<Progress>;

  // Assessments
  getAllQuizzes(): Promise<Quiz[]>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  createAssessmentResult(result: InsertAssessmentResult): Promise<AssessmentResult>;
  getUserAssessments(userId: string): Promise<Assessment[]>;

  // Achievements
  getUserAchievements(userId: string): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  updateAchievementShared(achievementId: number, shared: boolean): Promise<Achievement>;
  checkAndAwardAchievements(userId: string, quizScore?: number, ruleId?: number, partName?: string): Promise<Achievement[]>;
}

export class MemStorage implements IStorage {
  // User operations for in-memory storage
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: InsertUser): Promise<User> {
    const user: User = {
      ...userData,
      picture: userData.picture || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  // Add missing methods for assessments
  async getAllQuizzes(): Promise<Quiz[]> {
    return Array.from(this.quizzes.values());
  }

  async createAssessment(assessment: InsertAssessment): Promise<Assessment> {
    const id = this.currentProgressId++;
    const newAssessment: Assessment = { 
      ...assessment, 
      id,
      completedAt: new Date(),
      passingGrade: assessment.passingGrade || false
    };
    // Store in memory if needed
    return newAssessment;
  }

  async createAssessmentResult(result: InsertAssessmentResult): Promise<AssessmentResult> {
    const id = this.currentProgressId++;
    const newResult: AssessmentResult = { ...result, id };
    // Store in memory if needed
    return newResult;
  }

  async getUserAssessments(userId: string): Promise<Assessment[]> {
    // Return empty array for in-memory implementation
    return [];
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return Array.from(this.achievements.values())
      .filter(achievement => achievement.userId === userId)
      .sort((a, b) => a.earnedAt.getTime() - b.earnedAt.getTime());
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentProgressId++;
    const achievement: Achievement = {
      ...insertAchievement,
      id,
      userId: insertAchievement.userId || "default",
      ruleId: insertAchievement.ruleId || null,
      partName: insertAchievement.partName || null,
      earnedAt: new Date(),
      shared: insertAchievement.shared || false,
      sharedAt: insertAchievement.sharedAt || null,
    };
    this.achievements.set(id, achievement);
    return achievement;
  }

  async updateAchievementShared(achievementId: number, shared: boolean): Promise<Achievement> {
    const existing = this.achievements.get(achievementId);
    if (!existing) {
      throw new Error("Achievement not found");
    }

    const updated: Achievement = {
      ...existing,
      shared,
      sharedAt: shared ? new Date() : null,
    };
    this.achievements.set(achievementId, updated);
    return updated;
  }

  async checkAndAwardAchievements(userId: string, quizScore?: number, ruleId?: number, partName?: string): Promise<Achievement[]> {
    const newAchievements: Achievement[] = [];
    const existingAchievements = await this.getUserAchievements(userId);
    const hasFirstQuiz = existingAchievements.some(achievement => achievement.badgeType === "first_quiz");

    if (!hasFirstQuiz && quizScore !== undefined) {
      newAchievements.push(await this.createAchievement({
        userId,
        badgeType: "first_quiz",
        badgeTitle: "First Mate",
        badgeDescription: "Completed your first quiz",
        iconName: "anchor",
        ruleId,
      }));
    }

    if (quizScore === 100) {
      newAchievements.push(await this.createAchievement({
        userId,
        badgeType: "perfect_score",
        badgeTitle: "Navigation Master",
        badgeDescription: "Achieved a perfect score on a quiz",
        iconName: "compass",
        ruleId,
      }));
    }

    if (partName) {
      const allRules = await this.getAllRules();
      const userProgress = await this.getUserProgress(userId);
      const partRules = allRules.filter(rule => rule.part === partName);
      const completedPartRules = userProgress.filter(progress =>
        progress.completed && partRules.some(rule => rule.id === progress.ruleId)
      );
      const hasPartMaster = existingAchievements.some(achievement =>
        achievement.badgeType === "part_master" && achievement.partName === partName
      );

      if (!hasPartMaster && partRules.length > 0 && completedPartRules.length === partRules.length) {
        newAchievements.push(await this.createAchievement({
          userId,
          badgeType: "part_master",
          badgeTitle: `Part ${partName} Captain`,
          badgeDescription: `Mastered all rules in Part ${partName}`,
          iconName: "ship-wheel",
          partName,
        }));
      }
    }

    return newAchievements;
  }

  private users: Map<string, User>;
  private rules: Map<number, Rule>;
  private quizzes: Map<number, Quiz>;
  private progress: Map<string, Progress>;
  private achievements: Map<number, Achievement>;
  private currentRuleId: number;
  private currentQuizId: number;
  private currentProgressId: number;

  constructor() {
    this.users = new Map();
    this.rules = new Map();
    this.quizzes = new Map();
    this.progress = new Map();
    this.achievements = new Map();
    this.currentRuleId = 1;
    this.currentQuizId = 1;
    this.currentProgressId = 1;
    this.initializeData();
  }

  private initializeData() {
    // Initialize with COLREGS rules data
    const initialRules: InsertRule[] = [
      {
        ruleNumber: "1",
        title: "Application",
        part: "A",
        partTitle: "General",
        officialText: "These Rules shall apply to all vessels upon the high seas and in all waters connected therewith navigable by seagoing vessels.",
        plainEnglish: "These international rules apply to all vessels on the ocean and in waters that connect to the ocean where large ships can navigate.",
        keyPoints: ["Applies to all vessels", "High seas coverage", "Connected navigable waters", "International scope"],
        commonViolations: ["Assuming local rules override COLREGS", "Ignoring rules in territorial waters"],
        relatedRules: ["2", "3"]
      },
      {
        ruleNumber: "2", 
        title: "Responsibility",
        part: "A",
        partTitle: "General",
        officialText: "Nothing in these Rules shall exonerate any vessel, or the owner, master or crew thereof, from the consequences of any neglect to comply with these Rules or of the neglect of any precaution which may be required by the ordinary practice of seamen, or by the special circumstances of the case.",
        plainEnglish: "Following these rules doesn't excuse you from using good seamanship and taking extra precautions when needed. You're still responsible for safe navigation.",
        keyPoints: ["Personal responsibility", "Good seamanship required", "Special circumstances consideration", "No excuse for negligence"],
        commonViolations: ["Over-reliance on rules without judgment", "Ignoring special circumstances"],
        relatedRules: ["1", "3"]
      },
      {
        ruleNumber: "3",
        title: "General Definitions", 
        part: "A",
        partTitle: "General",
        officialText: "For the purpose of these Rules, except where the context otherwise requires: (a) The word 'vessel' includes every description of water craft, including non-displacement craft, WIG craft and seaplanes, used or capable of being used as a means of transportation on water.",
        plainEnglish: "Key terms used in these rules are defined here. A 'vessel' means any watercraft including boats, ships, hovercraft, ground effect vehicles, and seaplanes that can transport people or cargo on water.",
        keyPoints: ["Defines key terms", "Vessel includes all watercraft", "Covers various craft types", "Foundation for other rules"],
        commonViolations: ["Misunderstanding vessel definitions", "Confusion about craft classifications"],
        relatedRules: ["1", "2", "4"]
      },
      {
        ruleNumber: "5",
        title: "Look-out",
        part: "B", 
        partTitle: "Steering and Sailing Rules",
        officialText: "Every vessel shall at all times maintain a proper look-out by sight and hearing as well as by all available means appropriate in the prevailing circumstances and conditions so as to make a full appraisal of the situation and of the risk of collision.",
        plainEnglish: "Every vessel must always have someone actively watching for other vessels, obstacles, and hazards using sight, hearing, and all available navigation equipment to assess collision risk.",
        keyPoints: ["Continuous lookout required", "Use sight and hearing", "Use all available means", "Assess collision risk"],
        commonViolations: ["Relying solely on radar", "Inadequate watch during fog", "Distracted navigation", "Ignoring sound signals"],
        relatedRules: ["6", "7", "19"]
      }
    ];

    const initialQuizzes: InsertQuiz[] = [
      {
        ruleId: 4, // Rule 5
        question: "In foggy conditions, which of the following is NOT sufficient for maintaining a proper look-out according to Rule 5?",
        options: [
          "Visual observation only, since radar might be unreliable",
          "Combination of sight, hearing, and radar monitoring", 
          "Use of all available means including sound signals",
          "Continuous radar plotting and position fixing"
        ],
        correctAnswer: 0,
        explanation: "Visual observation alone is insufficient in fog. Rule 5 requires using sight, hearing, AND all available means appropriate to the conditions, including radar and sound signals."
      },
      {
        ruleId: 4, // Rule 5
        question: "What does 'all available means' include when maintaining a proper look-out?",
        options: [
          "Only visual and radar observation",
          "Radar, GPS, radio communications, and other navigation aids",
          "Just the equipment required by law", 
          "Only electronic navigation systems"
        ],
        correctAnswer: 1,
        explanation: "'All available means' includes any navigation equipment or method that can help assess the situation and collision risk, including radar, GPS, radio, AIS, and other aids."
      }
    ];

    // Add rules
    initialRules.forEach(rule => {
      this.createRule(rule);
    });

    // Add quizzes  
    initialQuizzes.forEach(quiz => {
      this.createQuiz(quiz);
    });
  }

  async getAllRules(): Promise<Rule[]> {
    return Array.from(this.rules.values()).sort((a, b) => {
      if (a.part !== b.part) return a.part.localeCompare(b.part);
      return parseInt(a.ruleNumber) - parseInt(b.ruleNumber);
    });
  }

  async getRuleById(id: number): Promise<Rule | undefined> {
    return this.rules.get(id);
  }

  async getRuleByNumber(ruleNumber: string): Promise<Rule | undefined> {
    return Array.from(this.rules.values()).find(rule => rule.ruleNumber === ruleNumber);
  }

  async createRule(insertRule: InsertRule): Promise<Rule> {
    const id = this.currentRuleId++;
    const rule: Rule = { ...insertRule, id };
    this.rules.set(id, rule);
    return rule;
  }

  async getQuizzesByRuleId(ruleId: number): Promise<Quiz[]> {
    return Array.from(this.quizzes.values()).filter(quiz => quiz.ruleId === ruleId);
  }

  async getQuizById(id: number): Promise<Quiz | undefined> {
    return this.quizzes.get(id);
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = this.currentQuizId++;
    const quiz: Quiz = { ...insertQuiz, id, difficulty: insertQuiz.difficulty || "medium" };
    this.quizzes.set(id, quiz);
    return quiz;
  }

  async getUserProgress(userId: string): Promise<Progress[]> {
    return Array.from(this.progress.values()).filter(p => p.userId === userId);
  }

  async getProgressByUserAndRule(userId: string, ruleId: number): Promise<Progress | undefined> {
    return Array.from(this.progress.values()).find(p => p.userId === userId && p.ruleId === ruleId);
  }

  async updateProgress(userId: string, ruleId: number, progressUpdate: Partial<InsertProgress>): Promise<Progress> {
    const existing = await this.getProgressByUserAndRule(userId, ruleId);
    if (existing) {
      const updated = { ...existing, ...progressUpdate };
      this.progress.set(`${userId}-${ruleId}`, updated);
      return updated;
    } else {
      return this.createProgress({ userId, ruleId, ...progressUpdate });
    }
  }

  async createProgress(insertProgress: InsertProgress): Promise<Progress> {
    const id = this.currentProgressId++;
    const progress: Progress = {
      ...insertProgress,
      id,
      userId: insertProgress.userId || "default",
      completed: insertProgress.completed || false,
      quizScore: insertProgress.quizScore || null,
      completedAt: insertProgress.completedAt || null,
    };
    this.progress.set(`${progress.userId}-${progress.ruleId}`, progress);
    return progress;
  }
}

// Database Storage implementation
export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: userData.email,
          name: userData.name,
          picture: userData.picture,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }
  async getAllRules(): Promise<Rule[]> {
    const allRules = await db.select().from(rules).orderBy(rules.part, rules.ruleNumber);
    return allRules;
  }

  async getRuleById(id: number): Promise<Rule | undefined> {
    const [rule] = await db.select().from(rules).where(eq(rules.id, id));
    return rule || undefined;
  }

  async getRuleByNumber(ruleNumber: string): Promise<Rule | undefined> {
    const [rule] = await db.select().from(rules).where(eq(rules.ruleNumber, ruleNumber));
    return rule || undefined;
  }

  async createRule(insertRule: InsertRule): Promise<Rule> {
    const [rule] = await db
      .insert(rules)
      .values(insertRule)
      .returning();
    return rule;
  }

  async getQuizzesByRuleId(ruleId: number): Promise<Quiz[]> {
    const quizList = await db.select().from(quizzes).where(eq(quizzes.ruleId, ruleId));
    return quizList;
  }

  async getQuizById(id: number): Promise<Quiz | undefined> {
    const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, id));
    return quiz || undefined;
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const [quiz] = await db
      .insert(quizzes)
      .values(insertQuiz)
      .returning();
    return quiz;
  }

  async getUserProgress(userId: string): Promise<Progress[]> {
    const progressList = await db.select().from(userProgress).where(eq(userProgress.userId, userId));
    return progressList;
  }

  async getProgressByUserAndRule(userId: string, ruleId: number): Promise<Progress | undefined> {
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.ruleId, ruleId)));
    return progress || undefined;
  }

  async updateProgress(userId: string, ruleId: number, progressUpdate: Partial<InsertProgress>): Promise<Progress> {
    const existing = await this.getProgressByUserAndRule(userId, ruleId);
    
    if (existing) {
      const [updated] = await db
        .update(userProgress)
        .set(progressUpdate)
        .where(and(eq(userProgress.userId, userId), eq(userProgress.ruleId, ruleId)))
        .returning();
      return updated;
    } else {
      return this.createProgress({ userId, ruleId, ...progressUpdate });
    }
  }

  async createProgress(insertProgress: InsertProgress): Promise<Progress> {
    const [progress] = await db
      .insert(userProgress)
      .values(insertProgress)
      .returning();
    return progress;
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    return await db.select().from(quizzes);
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const [assessment] = await db
      .insert(assessments)
      .values(insertAssessment)
      .returning();
    return assessment;
  }

  async createAssessmentResult(insertResult: InsertAssessmentResult): Promise<AssessmentResult> {
    const [result] = await db
      .insert(assessmentResults)
      .values(insertResult)
      .returning();
    return result;
  }

  async getUserAssessments(userId: string): Promise<Assessment[]> {
    return await db
      .select()
      .from(assessments)
      .where(eq(assessments.userId, userId));
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return await db
      .select()
      .from(achievements)
      .where(eq(achievements.userId, userId))
      .orderBy(achievements.earnedAt);
  }

  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const [newAchievement] = await db
      .insert(achievements)
      .values(achievement)
      .returning();
    return newAchievement;
  }

  async updateAchievementShared(achievementId: number, shared: boolean): Promise<Achievement> {
    const [updated] = await db
      .update(achievements)
      .set({ 
        shared, 
        sharedAt: shared ? new Date() : null 
      })
      .where(eq(achievements.id, achievementId))
      .returning();
    return updated;
  }

  async checkAndAwardAchievements(userId: string, quizScore?: number, ruleId?: number, partName?: string): Promise<Achievement[]> {
    const newAchievements: Achievement[] = [];

    // Check for First Quiz achievement
    const existingAchievements = await this.getUserAchievements(userId);
    const hasFirstQuiz = existingAchievements.some(a => a.badgeType === 'first_quiz');
    
    if (!hasFirstQuiz && quizScore !== undefined) {
      const firstQuizBadge = await this.createAchievement({
        userId,
        badgeType: 'first_quiz',
        badgeTitle: 'First Mate',
        badgeDescription: 'Completed your first quiz',
        iconName: 'anchor',
        ruleId
      });
      newAchievements.push(firstQuizBadge);
    }

    // Check for Perfect Score achievement
    if (quizScore === 100) {
      const perfectScoreBadge = await this.createAchievement({
        userId,
        badgeType: 'perfect_score',
        badgeTitle: 'Navigation Master',
        badgeDescription: 'Achieved a perfect score on a quiz',
        iconName: 'compass',
        ruleId
      });
      newAchievements.push(perfectScoreBadge);
    }

    // Check for Part Master achievement
    if (partName) {
      const userProgress = await this.getUserProgress(userId);
      const allRules = await this.getAllRules();
      const partRules = allRules.filter(rule => rule.part === partName);
      const completedPartRules = userProgress.filter(progress => 
        progress.completed && partRules.some(rule => rule.id === progress.ruleId)
      );

      if (completedPartRules.length === partRules.length) {
        const hasPartMaster = existingAchievements.some(a => 
          a.badgeType === 'part_master' && a.partName === partName
        );
        
        if (!hasPartMaster) {
          const partMasterBadge = await this.createAchievement({
            userId,
            badgeType: 'part_master',
            badgeTitle: `Part ${partName} Captain`,
            badgeDescription: `Mastered all rules in Part ${partName}`,
            iconName: 'ship-wheel',
            partName
          });
          newAchievements.push(partMasterBadge);
        }
      }
    }

    return newAchievements;
  }
}

export const storage: IStorage = process.env.USE_MEMORY_STORAGE === "true"
  ? new MemStorage()
  : new DatabaseStorage();
