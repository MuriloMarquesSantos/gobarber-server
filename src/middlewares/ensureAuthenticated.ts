import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

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
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  return token;
}

function decodeToken(token: string) {
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    console.log(decoded);
    return decoded as TokenPayload;
  } catch {
    throw new Error('Invalid JWT token');
  }
}

function setUserIdInRequest(decoded: TokenPayload, request: Request) {
  const { sub } = decoded;
  request.user = {
    id: sub,
  };
}
