#!/usr/bin/env node

/**
 * Migration script to transfer database to Netlify Neon
 * 
 * Usage:
 * 1. Set your NETLIFY_DATABASE_URL environment variable
 * 2. Run: node migrate-to-netlify.js
 */

import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './shared/schema.js';

const sql = neon();

// Create tables based on schema
const createTables = async () => {
  console.log('Creating tables...');
  
  try {
    // Create rules table
    await sql`
      CREATE TABLE IF NOT EXISTS rules (
        id SERIAL PRIMARY KEY,
        rule_number TEXT NOT NULL,
        title TEXT NOT NULL,
        part TEXT NOT NULL,
        part_title TEXT NOT NULL,
        official_text TEXT NOT NULL,
        plain_english TEXT NOT NULL,
        key_points TEXT[] NOT NULL,
        common_violations TEXT[] NOT NULL,
        related_rules TEXT[] NOT NULL
      )
    `;

    // Create quizzes table
    await sql`
      CREATE TABLE IF NOT EXISTS quizzes (
        id SERIAL PRIMARY KEY,
        rule_id INTEGER NOT NULL REFERENCES rules(id),
        question TEXT NOT NULL,
        options TEXT[] NOT NULL,
        correct_answer INTEGER NOT NULL,
        explanation TEXT NOT NULL,
        difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard'))
      )
    `;

    // Create user_progress table
    await sql`
      CREATE TABLE IF NOT EXISTS user_progress (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'default',
        rule_id INTEGER NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT false,
        quiz_score INTEGER,
        completed_at TEXT
      )
    `;

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR PRIMARY KEY,
        email VARCHAR NOT NULL UNIQUE,
        name VARCHAR NOT NULL,
        picture VARCHAR,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create assessments table
    await sql`
      CREATE TABLE IF NOT EXISTS assessments (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        total_questions INTEGER NOT NULL,
        correct_answers INTEGER NOT NULL,
        score INTEGER NOT NULL,
        time_spent INTEGER NOT NULL,
        time_limit INTEGER NOT NULL,
        passing_grade BOOLEAN NOT NULL DEFAULT false,
        parts TEXT[] NOT NULL,
        difficulty TEXT[] NOT NULL,
        completed_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    // Create assessment_results table
    await sql`
      CREATE TABLE IF NOT EXISTS assessment_results (
        id SERIAL PRIMARY KEY,
        assessment_id INTEGER NOT NULL REFERENCES assessments(id),
        question_id INTEGER NOT NULL REFERENCES quizzes(id),
        selected_answer INTEGER NOT NULL,
        correct BOOLEAN NOT NULL,
        time_spent INTEGER NOT NULL
      )
    `;

    // Create achievements table
    await sql`
      CREATE TABLE IF NOT EXISTS achievements (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL DEFAULT 'default',
        badge_type TEXT NOT NULL,
        badge_title TEXT NOT NULL,
        badge_description TEXT NOT NULL,
        icon_name TEXT NOT NULL,
        rule_id INTEGER REFERENCES rules(id),
        part_name TEXT,
        earned_at TIMESTAMP NOT NULL DEFAULT NOW(),
        shared BOOLEAN NOT NULL DEFAULT false,
        shared_at TIMESTAMP
      )
    `;

    // Create sessions table for authentication
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        sid VARCHAR NOT NULL COLLATE "default",
        sess JSON NOT NULL,
        expire TIMESTAMP(6) NOT NULL
      )
      WITH (OIDS=FALSE)
    `;

    await sql`
      ALTER TABLE sessions ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE
    `;

    console.log('✅ All tables created successfully!');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  }
};

// Main migration function
const migrate = async () => {
  console.log('🚀 Starting migration to Netlify Neon...');
  
  if (!process.env.NETLIFY_DATABASE_URL) {
    console.error('❌ NETLIFY_DATABASE_URL environment variable is required');
    process.exit(1);
  }

  try {
    await createTables();
    console.log('✅ Migration completed successfully!');
    console.log('📝 Next steps:');
    console.log('1. Import your data using the seed script or manual SQL');
    console.log('2. Update your environment variables to use NETLIFY_DATABASE_URL');
    console.log('3. Deploy to Netlify');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrate();
} 