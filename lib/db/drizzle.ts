
import {neon } from "@neondatabase/serverless"
import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'dotenv';
// Adjust this import as needed
import * as schema from './schema'; // Import your schema

config({ path: '.env' });
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
