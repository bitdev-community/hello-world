import express, { Request, Response } from 'express';

/**
 * define express Middleware
 */
export type Middleware = (req: Request, res: Response, next: express.NextFunction) => Promise<any>;

/**
 * express new Route
 */
export interface Route {
  method: string;
  route: string | RegExp;
  middlewares: Middleware[];
}

export function getHelloRoute(): Route {
  return {
    method: 'get',
    route: '/hello',
    middlewares: [async (req, res) => res.send('Hello World!')]
  }
}