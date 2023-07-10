import { Sequelize } from "sequelize";

class Database {
  private static sequelize: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    const dbUri = "mysql://root:root@localhost:3306/sys";
    if (!Database.sequelize) {
      Database.sequelize = new Sequelize(dbUri, { logging: console.log });
    }
    return Database.sequelize;
  }
}

export default Database;
