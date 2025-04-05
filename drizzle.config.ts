import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load the .env.local file manually
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migration",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST!,
    database: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    ssl: "require", // optional, recommended for Neon
  },
});

