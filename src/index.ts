import "dotenv/config";
import { notion, DB, DbKey } from "./notionClient";

async function checkDb(name: DbKey) {
  try {
    const db = await notion.databases.retrieve({ database_id: DB[name] });
    const title = (db as any).title?.[0]?.plain_text ?? DB[name];
    console.log(`[workos] ✓ ${name.padEnd(12)} → "${title}"`);
  } catch (err: any) {
    console.error(`[workos] ✗ ${name.padEnd(12)} → FAILED: ${err.message}`);
  }
}

async function main() {
  console.log("[workos] Engine initialized. Testing Notion connectivity...\n");
  await Promise.all([checkDb("inbox"), checkDb("workstreams"), checkDb("okrs")]);
  console.log("\n[workos] All checks complete.");
}

main().catch((err) => {
  console.error("[workos] Fatal error:", err.message);
  process.exit(1);
});
