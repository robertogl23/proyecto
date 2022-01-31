import { User } from "@prisma/client";
import type { Request, Response } from "express";

export interface ICrudController<T> {
  findMany: (req: Request, res: Response) => Promise<void>;
  create: (req: Request, res: Response) => Promise<void>;
  findOne: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
}

export interface IResponseApi<T> {
  data: T |null ;
  message: string;
  statusCode: number;
  error?: string;
}
