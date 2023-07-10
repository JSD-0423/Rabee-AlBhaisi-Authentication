import { User, Book } from "../models";

export const readAllData = async (): Promise<Book[]> => {
  return Book.findAll();
};

export function readBookById(id: number): Promise<Book | null> {
  return Book.findByPk(id);
}

export function addBook(book: Book): Promise<Book | null> {
  return Book.create({ ...book });
}

export function readUserByEmail(email: string): Promise<User | null> {
  return User.findOne({ where: { email } });
}

export async function createUser(user: User): Promise<number | null> {
  const result = await User.create({ ...user });
  return result ? result.id : null;
}
