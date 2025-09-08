import db from "./db-config.ts";

async function createUser(user: { email: string; password_hash: string }) {
  try {
    const [newUser] = await db("login").insert(user).returning();
    return newUser;
  } catch (dbError) {
    console.log("db insertion error", dbError);
    throw dbError;
  }
}
