import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "@shared/schema";

// Use Netlify's Neon client which automatically uses NETLIFY_DATABASE_URL
const sql = neon();

// Create Drizzle instance with the Neon client
export const db = drizzle(sql, { schema });

// Export sql for direct queries if needed
export { sql };