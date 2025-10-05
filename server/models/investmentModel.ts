import db from "../db_config.js";

interface Investment {
  symbol: string;
  quantity: number;
  purchase_price: number;
  user_id: number;
}

export const getInvestmentsByUserId = async (userId: number) => {
  const investments = await db("investments")
    .where({ user_id: userId })
    .select("*");

  // Convert string values from database to numbers
  return investments.map((inv) => ({
    ...inv,
    quantity: parseFloat(inv.quantity),
    purchase_price: parseFloat(inv.purchase_price),
  }));
};

export const addInvestment = async (investment: Investment) => {
  const [newInvestment] = await db("investments")
    .insert(investment)
    .returning("*");

  // Convert string values to numbers
  return {
    ...newInvestment,
    quantity: parseFloat(newInvestment.quantity),
    purchase_price: parseFloat(newInvestment.purchase_price),
  };
};
