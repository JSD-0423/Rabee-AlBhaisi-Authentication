import { Request, Response, NextFunction } from "express";
import { GenericError, AuthError } from "../errors/";
import { Credentials, User } from "../models";
import { userSchema, credentialsSchema } from "../validation/reqValidation";
import { readUserByEmail, createUser } from "../database";
import { hashPassword, checkPassword } from "../helpers/passwordHashing";
import AuthHelpers from "../helpers";

class UserController {
  saltRounds = 10;
  myPlaintextPassword = "s0//P4$$w0rD";
  someOtherPlaintextPassword = "not_bacon";
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const credentials: Credentials = req.body;
      const { error } = credentialsSchema.validate(credentials);
      if (error)
        throw new AuthError(
          "Wrong credentials: " + error.details[0].message,
          400
        );
      const user = await readUserByEmail(credentials.email);
      if (!user) throw new AuthError("Wrong email or password", 400);
      const match = checkPassword(credentials.password, user.password);
      if (!match) throw new AuthError("Wrong email or password", 400);
      const token = await AuthHelpers.createToken(user.id);
      if (!token) throw new AuthError("Token Generation Error", 500);
      res.json({ status: 200, message: "Logged in successfully", token });
    } catch (error) {
      next(error);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = req.body;
      const { error } = userSchema.validate(user);
      if (error)
        throw new AuthError(
          "Wrong credentials: " + error.details[0].message,
          400
        );
      const userHash = hashPassword(user);
      const id = await createUser(userHash);
      if (!id) throw new AuthError("User did not created ", 500);
      const token = await AuthHelpers.createToken(user.id);
      if (!token) throw new AuthError("Token Generation Error", 500);
      res.status(201).json({ status: 201, message: "user created", token });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
