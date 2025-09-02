import dotenv from "dotenv";
dotenv.config();
const ENVVARS = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET
};

// console.log(ENVVARS.PORT);

export default ENVVARS;
