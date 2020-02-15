import { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: { userEmail: string; userId: string }; // might need to expand this for full-blown auth
}
