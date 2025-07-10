import { Handler, HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import { Resend } from 'resend';
import { nanoid } from 'nanoid';
import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import * as schema from '../../shared/schema.js';

const resend = new Resend(process.env.RESEND_API_KEY);
const sql = neon();
const db = drizzle(sql, { schema });

// Magic link token table (in-memory for demo, use DB in production)
const MAGIC_LINK_EXPIRY_MINUTES = 15;

// You should create a table in your DB for magic link tokens in production
// For demo, we'll use a simple in-memory map
const tokens = new Map<string, { email: string; expires: number }>();

const APP_URL = process.env.APP_URL || 'http://localhost:5173'; // Set this to your deployed frontend URL

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Send magic link
  if (event.httpMethod === 'POST' && event.path.endsWith('/magic-link-request')) {
    const { email } = JSON.parse(event.body || '{}');
    if (!email || typeof email !== 'string') {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email is required' }) };
    }
    // Generate token
    const token = nanoid(32);
    const expires = Date.now() + MAGIC_LINK_EXPIRY_MINUTES * 60 * 1000;
    tokens.set(token, { email, expires });
    // Send email
    const magicLink = `${APP_URL}/auth/callback?token=${token}`;
    try {
      await resend.emails.send({
        from: 'no-reply@colregs-academy.com',
        to: email,
        subject: 'Your COLREGS Academy Magic Login Link',
        html: `<p>Click the link below to log in to COLREGS Academy:</p><p><a href="${magicLink}">${magicLink}</a></p><p>This link will expire in ${MAGIC_LINK_EXPIRY_MINUTES} minutes.</p>`
      });
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, message: 'Magic link sent!' }) };
    } catch (error) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to send email', details: error instanceof Error ? error.message : error }) };
    }
  }

  // Verify magic link
  if (event.httpMethod === 'GET' && event.path.endsWith('/magic-link-verify')) {
    const token = event.queryStringParameters?.token;
    if (!token || !tokens.has(token)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid or expired token' }) };
    }
    const { email, expires } = tokens.get(token)!;
    if (Date.now() > expires) {
      tokens.delete(token);
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Token expired' }) };
    }
    // Upsert user in DB
    let user = await db.select().from(schema.users).where(eq(schema.users.email, email));
    if (!user.length) {
      // Create user
      await db.insert(schema.users).values({
        id: nanoid(),
        email,
        name: email.split('@')[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      user = await db.select().from(schema.users).where(eq(schema.users.email, email));
    }
    // TODO: Set session or JWT here
    tokens.delete(token);
    // For demo, just return user info
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, user: user[0] })
    };
  }

  return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not found' }) };
}; 