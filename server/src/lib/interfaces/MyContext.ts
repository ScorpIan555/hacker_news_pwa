import { Request, Response } from 'express';

export interface MyContext {
  req: Request;
  res: Response;
  payload: {
    userEmail: string;
    userId: string;
    linksArray: string;
  }; // might need to expand this for full-blown auth
}

export interface MyOtherContext {
  req: Request;
  res: Response;
  payload: {
    email: string;
    id: string;
    linksArray: Array<number>;
    hiddenLinksArray: Array<number>;
  }; // might need to expand this for full-blown auth
}
