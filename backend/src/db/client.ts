import { Pool } from 'pg';
import { config } from '../config/env';

if (!config.databaseUrl) {
  console.warn('[DB] DATABASE_URL is not set. Database features will be disabled until it is configured.');
}

export const pool = new Pool({
  connectionString: config.databaseUrl || undefined,
});

export async function dbHealth(): Promise<{ ok: boolean; error?: string }>{
  if (!config.databaseUrl) return { ok: false, error: 'DATABASE_URL not configured' };
  try {
    const res = await pool.query('SELECT 1 as ok');
    return { ok: res.rows?.[0]?.ok === 1 };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'unknown error' };
  }
}
