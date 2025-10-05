import db from "../db_config.js";
export const getInvestmentsByUserId = (userId) => {
    return db("investments").where({ user_id: userId }).select("*");
};
export const addInvestment = (investment) => {
    return db("investments").insert(investment).returning("*");
};
