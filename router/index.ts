import { NextFunction, Request, Response, Router } from "express";
import bookRouter from "./books";
import authRouter from "./auth";
import GenericError from "../errors/GenericError";
const router = Router();

router.use("/books", bookRouter);
router.use("/auth", authRouter);

router.use("/*", (_, res) => {
  res.status(404).json({ statusCode: 404, error: "Undefined Request!" });
});

router.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const exception = err as GenericError;
  res.status(exception.status || 500).json({
    statusCode: exception.status || 500,
    error:
      exception.name === "GenericError" || exception.name === "AuthError"
        ? exception.message
        : "Internal Server Error",
  });
});

export default router;
