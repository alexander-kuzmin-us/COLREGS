import { Handler, HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../../shared/schema.js';

const sql = neon();
const db = drizzle(sql, { schema });

// Import the comprehensive COLREGS data
import { completeColregsRules, completeColregsQuizzes } from '../../server/complete-colregs-data.js';
import { allColregsRules, comprehensiveQuizzes } from '../../server/complete-colregs-all-parts.js';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed. Use POST to seed the database.' }),
    };
  }

  try {
    console.log('🌱 Starting database seeding via Netlify function...');
    
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
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Database seeded successfully!',
        rules: totalRules,
        quizzes: totalQuizzes,
        timestamp: new Date().toISOString()
      }),
    };
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to seed database',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }),
    };
  }
}; 