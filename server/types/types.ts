// server/types/express/index.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string; // You can set the type as `string` or `number` based on your user ID type
    }
  }
}
