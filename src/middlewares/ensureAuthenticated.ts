import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const token = getTokenFromRequest(request);
  validateToken(token);

  return next();
}

function getTokenFromRequest(request: Request) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  return token;
}

function validateToken(token: string) {
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    console.log(decoded);
  } catch {
    throw new Error('Invalid JWT token');
  }
}
