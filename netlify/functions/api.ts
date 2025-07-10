import { Handler, HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import { db } from '../../server/db';
import { rules, quizzes, userProgress, users, assessments, achievements } from '../../shared/schema';
import { eq, and } from 'drizzle-orm';

// Simple API handler for Netlify
export const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
  const { httpMethod, path, queryStringParameters, body } = event;
  
  // Enable CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  // Handle CORS preflight
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const url = path;
    const method = httpMethod.toLowerCase();

    // API Routes
    if (url.startsWith('/api/')) {
      // Rules API
      if (url === '/api/rules' && method === 'get') {
        const allRules = await db.select().from(rules);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(allRules),
        };
      }

      // Single rule API
      if (url.match(/^\/api\/rules\/\d+$/) && method === 'get') {
        const ruleId = parseInt(url.split('/').pop()!);
        const rule = await db.select().from(rules).where(eq(rules.id, ruleId));
        
        if (rule.length === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Rule not found' }),
          };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(rule[0]),
        };
      }

      // Quizzes API
      if (url === '/api/quizzes' && method === 'get') {
        const allQuizzes = await db.select().from(quizzes);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(allQuizzes),
        };
      }

      // Quiz by rule API
      if (url.match(/^\/api\/quizzes\/rule\/\d+$/) && method === 'get') {
        const ruleId = parseInt(url.split('/').pop()!);
        const ruleQuizzes = await db.select().from(quizzes).where(eq(quizzes.ruleId, ruleId));
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(ruleQuizzes),
        };
      }

      // User progress API
      if (url === '/api/progress' && method === 'get') {
        const userId = queryStringParameters?.userId || 'default';
        const userProgressData = await db.select().from(userProgress).where(eq(userProgress.userId, userId));
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(userProgressData),
        };
      }

      // Update progress API
      if (url === '/api/progress' && method === 'post') {
        const progressData = JSON.parse(body || '{}');
        const newProgress = await db.insert(userProgress).values(progressData).returning();
        
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(newProgress[0]),
        };
      }

      // Auth endpoints (placeholder)
      if (url.startsWith('/api/auth/')) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Auth endpoint - implement as needed' }),
        };
      }

      // Default API response
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'API endpoint not found' }),
      };
    }

    // Non-API routes should be handled by the frontend
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' }),
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}; 