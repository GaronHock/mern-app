// This middleware checks if the JWT token is valid and stores the decoded token in the `req.tokenDecoded` property
// server/middleware/protect.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include the `tokenDecoded` property
interface RequestWithTokenDecoded extends Request {
  tokenDecoded?: jwt.JwtPayload | string | undefined; // Adding `tokenDecoded` to the request
}

// This middleware checks if the JWT token is valid and stores the decoded token in the `req.tokenDecoded` property
export const protect = (
  req: RequestWithTokenDecoded,
  res: Response,
  next: NextFunction,
): any => {
  let token;

  // Check if the Authorization header exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-secret-key',
      );

      // Attach the decoded token to the request
      req.tokenDecoded = decoded;

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
};
