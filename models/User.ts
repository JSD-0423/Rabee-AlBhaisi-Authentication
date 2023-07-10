import { Model, DataTypes } from "sequelize";
import Database from "../database/Database";

class User extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare password: string;
  declare email: string;
}

User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: Database.getInstance(),
    timestamps: false,
  }
);

export default User;
