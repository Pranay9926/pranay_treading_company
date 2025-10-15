import express from 'express';
import cors from 'cors';
import type { Request, Response } from 'express';
import { config } from './config/env';
import { registerDbRoutes } from './routes/db';

const app = express();
const PORT = config.port;
const FRONTEND_ORIGIN = config.frontendOrigin;

app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true
}));
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Routes
registerDbRoutes(app);

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
