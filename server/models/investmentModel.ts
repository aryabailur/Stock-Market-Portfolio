import db from "../db_config.js";

interface Investment {
  symbol: string;
  quantity: number;
  purchase_price: number;
  user_id: number;
}

export const getInvestmentsByUserId = (userId: number) => {
  return db("investments").where({ user_id: userId }).select("*");
};

export const addInvestment = (investment: Investment) => {
  return db("investments").insert(investment).returning("*");
};
