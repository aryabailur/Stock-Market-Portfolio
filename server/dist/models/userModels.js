import db from "../db_config.js";
export async function createUser(user) {
    try {
        const userData = {
            email: user.email,
            password_hash: user.password_hash,
            username: user.username || user.email.split("@")[0],
        };
        const [newUser] = await db("login").insert(userData).returning("*");
        return newUser;
    }
    catch (dbError) {
        console.log("db insertion error", dbError);
        throw dbError;
    }
}
export async function findUserByEmail(email) {
    try {
        const userData = await db("login")
            .where("email", "=", email)
            .select("id", "email", "password_hash")
            .first();
        return userData;
    }
    catch (dbError) {
        console.log("db insertion error 2", dbError);
        throw dbError;
    }
}
