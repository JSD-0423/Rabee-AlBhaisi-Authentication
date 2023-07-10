import { Request, Response, NextFunction } from "express";
import { readAllData, addBook, readBookById } from "../database";
import GenericError from "../errors/GenericError";
import { Book } from "../models";
import bookSchema, { idSchema } from "../validation/reqValidation";

class BooksController {
  //? What if I used static path?
  private static path = "./books.json";
  //TODO: Make a request that uses query to get every book contains the name
  readBooks(req: Request, res: Response, next: NextFunction) {
    readAllData()
      .then((result) => {
        res.json(result);
      })
      .catch((error) => next(error));
  }

  createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const book: Book = req.body;
      const { error } = bookSchema.validate(book);
      if (error)
        throw new GenericError(
          "Wrong credentials: " + error.details[0].message,
          400
        );
      addBook(book)
        .then((result) => {
          res.status(201).json({
            statusCode: 201,
            message: `Book is created successfully at index ${result}`,
          });
        })
        .catch((error) => next(error));
    } catch (error) {
      next(error);
    }
  }
  getBookById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    if (!id) throw new GenericError("Please enter a valid id", 400);
    readBookById(id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => next(error));
  }

  updateBookById(req: Request, res: Response, next: NextFunction) {
    try {
      const book: Book = req.body;
      const id: number = Number(req.params.id);
      book.id = id;
      const { error } = bookSchema.validate(book);
      if (error)
        throw new GenericError(
          "Wrong credentials: " + error.details[0].message,
          400
        );
      // updateBook(BooksController.path, id, book);
      res.status(200).json({ message: "Book is Updated" });
    } catch (error) {
      next(error);
    }
  }

  deleteBookById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { error } = idSchema.validate(id);
      if (error) throw new GenericError(error.message, 400);
      // const isDeleted = deleteBook(BooksController.path, id);
      // if (!isDeleted) throw new GenericError("Internal server error", 500);
      res
        .status(201)
        .json({ statusCode: 201, message: "Deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default BooksController;
