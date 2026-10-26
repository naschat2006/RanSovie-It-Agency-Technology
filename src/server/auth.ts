import { Request, Response, NextFunction } from 'express';
import { runAsync } from './db';

export interface AuthSession extends Express.Request {
  session: {
    userId?: number;
    email?: string;
    role?: string;
    name?: string;
    destroy(callback: (err?: any) => void): void;
  } & Express.Request['session'];
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const session = (req as any).session;
  if (!session || !session.userId) {
    return res.redirect('/rsadminn/login');
  }
  next();
}

export function requireSuperAdmin(req: Request, res: Response, next: NextFunction) {
  const session = (req as any).session;
  if (!session || !session.userId || session.role !== 'super_admin') {
    return res.status(403).send('Access Denied: Super Admin privilege required.');
  }
  next();
}

export async function logActivity(email: string, action: string, details: string, ip: string) {
  try {
    await runAsync(
      `INSERT INTO activity_logs (admin_email, action, details, ip_address) VALUES (?, ?, ?, ?)`,
      [email, action, details, ip]
    );
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
}
