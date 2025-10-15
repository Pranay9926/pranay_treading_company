import type { Router, Request, Response } from 'express';
import { dbHealth } from '../db/client';

export function registerDbRoutes(router: Router) {
  router.get('/db/health', async (_req: Request, res: Response) => {
    const status = await dbHealth();
    const code = status.ok ? 200 : 500;
    res.status(code).json(status);
  });
}
