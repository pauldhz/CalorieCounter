import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  console.log("=== TS FUNCTION START ===");
  console.log("Method:", req.method);
  console.log("URL:", req.url);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    message: 'Hello from TypeScript!',
    timestamp: new Date().toISOString()
  }));
}

