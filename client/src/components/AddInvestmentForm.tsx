import React, { useState } from "react";

interface AddInvestmentFormProps {
  onAddInvestment: (investment: {
    symbol: string;
    quantity: number;
    purchase_price: number;
  }) => void;
}

const AddInvestmentForm = ({ onAddInvestment }: AddInvestmentFormProps) => {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddInvestment({
      symbol: symbol.toUpperCase(),
      quantity: Number(quantity),
      purchase_price: Number(price),
    });
    setSymbol("");
    setQuantity("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-investment-form">
      <h3>Add New Investment</h3>
      <div className="form-group">
        <label>Symbol</label>
        <input
          type="text"
          placeholder="e.g., AAPL"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          step="any"
          placeholder="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Purchase Price</label>
        <input
          type="number"
          step="any"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddInvestmentForm;
