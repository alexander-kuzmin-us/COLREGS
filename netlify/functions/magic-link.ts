import { Handler, HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import { Resend } from 'resend';
import { nanoid } from 'nanoid';
import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import * as schema from '../../shared/schema.js';
import jwt from 'jsonwebtoken';

const resend = new Resend(process.env.RESEND_API_KEY);
const sql = neon();
const db = drizzle(sql, { schema });

const MAGIC_LINK_EXPIRY_MINUTES = 15;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRY = '7d';
const tokens = new Map<string, { email: string; expires: number }>();
const APP_URL = process.env.APP_URL || 'http://localhost:5173';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    const token = nanoid(32);
    const expires = Date.now() + MAGIC_LINK_EXPIRY_MINUTES * 60 * 1000;
    tokens.set(token, { email, expires });
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
    let user = await db.select().from(schema.users).where(eq(schema.users.email, email));
    if (!user.length) {
      await db.insert(schema.users).values({
        id: nanoid(),
        email,
        name: email.split('@')[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      user = await db.select().from(schema.users).where(eq(schema.users.email, email));
    }
    tokens.delete(token);
    // Issue JWT
    const jwtToken = jwt.sign({ id: user[0].id, email: user[0].email }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, user: user[0], token: jwtToken })
    };
  }

  // Auth user endpoint
  if (event.httpMethod === 'GET' && event.path.endsWith('/auth/user')) {
    const authHeader = event.headers['authorization'] || event.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'Not authenticated' }) };
    }
    const token = authHeader.replace('Bearer ', '');
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { id: string, email: string };
      const user = await db.select().from(schema.users).where(eq(schema.users.id, payload.id));
      if (!user.length) {
        return { statusCode: 401, headers, body: JSON.stringify({ error: 'User not found' }) };
      }
      return { statusCode: 200, headers, body: JSON.stringify(user[0]) };
    } catch (err) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid or expired token' }) };
    }
  }

  return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not found' }) };
}; 