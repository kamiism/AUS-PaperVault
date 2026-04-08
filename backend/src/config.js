import { config } from "dotenv";

config({
    path: ".env",
});

const PORT = process.env.PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const DB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;

export { PORT, CORS_ORIGIN, DB_URI, DB_NAME };
