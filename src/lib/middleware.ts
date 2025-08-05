import type { NextApiRequest, NextApiResponse } from "next";
import type { Request, Response } from "express";
import upload from "./multer";

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (req: Request, res: Response, next: (err?: any) => void) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn(req as unknown as Request, res as unknown as Response, (result?: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
};

export const parseForm = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await runMiddleware(req, res, upload.single("file"));
};
