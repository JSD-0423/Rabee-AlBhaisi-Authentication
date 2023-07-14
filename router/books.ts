import { Router } from "express";
import { UserController, BooksController } from "../controller";
import AuthHelpers from "../helpers";

const booksController = new BooksController();
const userController = new UserController();

const router = Router();

router
  .route("/")
  .all(AuthHelpers.isAuthenticated)
  .get(booksController.readBooks)
  .post(booksController.createBook);

router
  .route("/:id")
  .all(AuthHelpers.isAuthenticated)
  .get(booksController.getBookById)
  .put(booksController.updateBookById)
  .delete(booksController.deleteBookById);

export default router;
