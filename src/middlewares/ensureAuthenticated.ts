import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number,
    sub: string
}

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Jwt token is missing!", 403, 'user.forbitten');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, auth.jwt.secret);

        const { sub } = decoded as TokenPayload;

        req.user = {
            id: sub
        }

        return next();
    } catch {
        throw new AppError("Invalid token!", 403, 'user.forbitten');
    }
}