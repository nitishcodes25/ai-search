import { db } from "./client.js";

export async function checkDatabaseConnection() {
  await db.query("SELECT 1");
}