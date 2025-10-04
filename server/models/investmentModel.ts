import db from "../db-config";

interface Investment {
  symbol: string;
  quantity: number;
  purchase_price: number;
  user_id: number; // Or string, depending on your user ID type
}

export const getInvestmentsByUserId = (userId: number) => {
  return db("investments").where({ user_id: userId }).select("*");
};

export const addInvestment = (investment: Investment) => {
  return db("investments").insert(investment).returning("*");
};
