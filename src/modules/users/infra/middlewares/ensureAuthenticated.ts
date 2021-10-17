import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const token = getTokenFromRequest(request);
  const decoded = decodeToken(token);
  setUserIdInRequest(decoded, request);

  return next();
}

function getTokenFromRequest(request: Request) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  return token;
}

function decodeToken(token: string) {
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    return decoded as TokenPayload;
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}

function setUserIdInRequest(decoded: TokenPayload, request: Request) {
  const { sub } = decoded;
  request.user = {
    id: sub,
  };
}
