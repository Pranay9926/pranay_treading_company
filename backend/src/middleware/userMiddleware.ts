import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(8, "Minimum length should be 8"),
});

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (err: any) {
    // console.log("this is your error", err);
    res.status(400).send(err.errors[0].message);
  }
};
