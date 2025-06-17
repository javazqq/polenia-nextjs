import { Request, Response, NextFunction } from 'express';

export function captureRawBody(req: Request, res: Response, next: NextFunction) {
  let data = '';
  req.setEncoding('utf8');
  req.on('data', chunk => { data += chunk; });
  req.on('end', () => {
    (req as any).rawBody = data;
    next();
  });
}