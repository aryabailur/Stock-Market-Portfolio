import db from "../db_config.js";
export const getInvestmentsByUserId = async (userId) => {
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
export const addInvestment = async (investment) => {
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
