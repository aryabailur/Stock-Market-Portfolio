import db from "../db_config.js";

export async function createUser(user: {
  email: string;
  password_hash: string;
}) {
  try {
    const [newUser] = await db("login").insert(user).returning("*");
    return newUser;
  } catch (dbError) {
    console.log("db insertion error", dbError);
    throw dbError;
  }
}

export async function findUserByEmail(email: string) {
  try {
    const userData = await db("login")
      .where("email", "=", email)
      .select("id", "email", "password_hash")
      .first();
    return userData;
  } catch (dbError) {
    console.log("db insertion error 2", dbError);
    throw dbError;
  }
}
