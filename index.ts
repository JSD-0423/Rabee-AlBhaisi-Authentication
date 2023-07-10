import http from "http";
import app from "./app";
import Database from "./database/Database";
import GenericError from "./errors/GenericError";

const PORT = 3000;
const server = http.createServer(app);

Database.getInstance()
  .authenticate()
  .then((_) => {
    console.log("Connection has been established successfully.");
    server.listen(PORT, () => console.log(`app is running on prot: ${PORT}`));
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = server;
