import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres.jlelkxlzjrqtjdsqvigo:O2gaza%40projectHIA@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true",
  },
});
