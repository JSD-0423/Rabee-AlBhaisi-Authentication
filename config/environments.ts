import dotenv from "dotenv";

dotenv.config();

const { PRIVATE_KEY } = process.env;

const config = {
  jwt: {
    privateKey: PRIVATE_KEY ? PRIVATE_KEY : "",
  },
};

export default config;
