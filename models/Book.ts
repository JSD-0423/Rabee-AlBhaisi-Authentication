import { Model, DataTypes } from "sequelize";
import Database from "../database/Database";

class Book extends Model {
  declare id: number;
  declare title: string;
  declare author: string;
  declare country: string;
  declare imageLink: string;
  declare link: string;
  declare pages: number;
  declare year: number;
}

Book.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    imageLink: {
      type: DataTypes.STRING,
    },
    link: {
      type: DataTypes.STRING,
    },
    pages: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    year: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize: Database.getInstance(),
    timestamps: false,
  }
);

export default Book;
