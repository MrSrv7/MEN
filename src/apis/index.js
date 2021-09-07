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
      url: process.env.URL,
      description: process.env.DESCRIPTION,
    },
  ],
  paths: { ...userApiObject },
};

export default swaggerConfig;
