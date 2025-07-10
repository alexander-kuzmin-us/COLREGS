#!/usr/bin/env node

/**
 * Netlify Database Seeding Script
 * 
 * This script populates the Netlify Neon database with COLREGS data.
 * Run this after setting up your NETLIFY_DATABASE_URL environment variable.
 * 
 * Usage:
 * export NETLIFY_DATABASE_URL="your_netlify_neon_database_url"
 * node seed-netlify.js
 */

import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './shared/schema.js';

const sql = neon();
const db = drizzle(sql, { schema });

// Import the comprehensive COLREGS data
import { completeColregsRules, completeColregsQuizzes } from './server/complete-colregs-data.js';
import { allColregsRules, comprehensiveQuizzes } from './server/complete-colregs-all-parts.js';

async function seedNetlifyDatabase() {
  try {
    console.log('🌱 Starting Netlify database seeding...');
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await sql`DELETE FROM quizzes`;
    await sql`DELETE FROM user_progress`;
    await sql`DELETE FROM assessment_results`;
    await sql`DELETE FROM assessments`;
    await sql`DELETE FROM achievements`;
    await sql`DELETE FROM rules`;
    
    console.log('📝 Inserting base COLREGS rules (1-10)...');
    const baseRules = await db.insert(schema.rules).values(completeColregsRules).returning();
    
    console.log('📝 Inserting extended COLREGS rules (11-41)...');
    const extendedRules = await db.insert(schema.rules).values(allColregsRules).returning();
    
    // Create rule number to ID mapping
    const ruleMap = new Map();
    [...baseRules, ...extendedRules].forEach(rule => {
      ruleMap.set(rule.ruleNumber, rule.id);
    });
    
    console.log('❓ Inserting base quizzes...');
    const baseQuizzes = completeColregsQuizzes.map(quiz => ({
      ...quiz,
      ruleId: ruleMap.get(quiz.ruleId.toString()) || quiz.ruleId
    }));
    await db.insert(schema.quizzes).values(baseQuizzes);
    
    console.log('❓ Inserting comprehensive quizzes for all rules...');
    const extendedQuizzes = comprehensiveQuizzes.map((quiz, index) => {
      // Map quizzes to rules 11-41
      const ruleNumbers = [
        "11", "12", "13", "14", "15", "16", "17", "18", "19", "19", // Rules 11-19 (2 quizzes for 19)
        "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", // Rules 20-30
        "32", "33", "34", "35", "36", "37", // Rules 32-37
        "38", "39", "40", "41" // Rules 38-41
      ];
      const ruleNumber = ruleNumbers[index] || "11";
      
      return {
        ...quiz,
        ruleId: ruleMap.get(ruleNumber) || ruleMap.get("11")
      };
    });
    await db.insert(schema.quizzes).values(extendedQuizzes);
    
    const totalRules = baseRules.length + extendedRules.length;
    const totalQuizzes = baseQuizzes.length + extendedQuizzes.length;
    
    console.log('✅ Complete COLREGS implementation finished!');
    console.log(`📊 Inserted ${totalRules} rules and ${totalQuizzes} quizzes`);
    console.log('🚀 Your Netlify app is now ready with full COLREGS data!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Check if NETLIFY_DATABASE_URL is set
if (!process.env.NETLIFY_DATABASE_URL) {
  console.error('❌ NETLIFY_DATABASE_URL environment variable is required');
  console.log('💡 Set it with: export NETLIFY_DATABASE_URL="your_netlify_neon_database_url"');
  process.exit(1);
}

// Run the seeding
seedNetlifyDatabase()
  .then(() => {
    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  }); 