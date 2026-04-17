import "dotenv/config";
import { Client, LogLevel } from "@notionhq/client";

// ── Validate required environment variables ──────────────────────────────────
const REQUIRED_ENV_VARS = [
  "NOTION_API_KEY",
  "NOTION_INBOX_DB_ID",
  "NOTION_WORKSTREAMS_DB_ID",
  "NOTION_OKRS_DB_ID",
] as const;

for (const key of REQUIRED_ENV_VARS) {
  if (!process.env[key]) {
    throw new Error(
      `[workos] Missing required environment variable: ${key}\n` +
        `→ Copy .env.example to .env and fill in your values.`
    );
  }
}

// ── Singleton Notion client ──────────────────────────────────────────────────
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  logLevel:
    process.env.LOG_LEVEL === "debug"
      ? LogLevel.DEBUG
      : LogLevel.WARN,
});

// ── Typed database ID accessors ──────────────────────────────────────────────
// These are the only place database IDs are referenced in the codebase.
// All values flow in from environment variables — no hardcoding.
export const DB = {
  inbox: process.env.NOTION_INBOX_DB_ID as string,
  workstreams: process.env.NOTION_WORKSTREAMS_DB_ID as string,
  okrs: process.env.NOTION_OKRS_DB_ID as string,
} as const;

export type DbKey = keyof typeof DB;
