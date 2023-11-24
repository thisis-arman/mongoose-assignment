import path from "path";
import dotenv from "dotenv";
import "dotenv/config";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
