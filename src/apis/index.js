import { config } from "dotenv-flow";
import userApiObject from "./userApi";

config();

const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    version: "0.0.1",
    title: "API Explorer for MEN App using Swagger UI",
    description:
      "An Interactive REST API Explorer for MEN App using Swagger UI",
  },
  servers: [
    {
      url: "http://localhost:6116",
      description: process.env.DESCRIPTION,
    },
    {
      url: "https://dry-brook-62770.herokuapp.com",
      description: process.env.DESCRIPTION,
    },
  ],
  paths: { ...userApiObject },
};

export default swaggerConfig;
