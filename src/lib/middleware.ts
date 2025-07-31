// lib/middleware.ts
import type { NextApiRequest, NextApiResponse } from "next";
import upload  from "./multer";

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
};

export const parseForm = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await runMiddleware(req, res, upload.single("file"));
};
