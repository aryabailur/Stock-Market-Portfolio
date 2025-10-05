import React, { useState } from "react";
import axios from "axios";

interface AddInvestmentFormProps {
  onAddInvestment: (investment: {
    symbol: string;
    quantity: number;
    purchase_price: number;
  }) => void;
}

const AddInvestmentForm: React.FC<AddInvestmentFormProps> = ({
  onAddInvestment,
}) => {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCurrentPrice = async (sym: string) => {
    if (!sym || sym.length < 1) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/stocks/quote/${sym.toUpperCase()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const currentPrice = response.data.c;
      if (currentPrice) {
        setPurchasePrice(currentPrice.toFixed(2));
      }
    } catch (error) {
      console.error("Error fetching price:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSymbol(value);
  };

  const handleSymbolBlur = () => {
    if (symbol) {
      fetchCurrentPrice(symbol);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!symbol || !quantity || !purchasePrice) return;

    onAddInvestment({
      symbol: symbol.toUpperCase(),
      quantity: parseFloat(quantity),
      purchase_price: parseFloat(purchasePrice),
    });

    setSymbol("");
    setQuantity("");
    setPurchasePrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-investment-form">
      <div className="form-group">
        <label>Symbol</label>
        <input
          type="text"
          placeholder="e.g., AAPL"
          value={symbol}
          onChange={handleSymbolChange}
          onBlur={handleSymbolBlur}
          required
        />
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          placeholder="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          step="0.01"
          required
        />
      </div>
      <div className="form-group">
        <label>Purchase Price</label>
        <input
          type="number"
          placeholder="0.00"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          step="0.01"
          required
          disabled={loading}
        />
        {loading && (
          <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
            Fetching...
          </span>
        )}
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddInvestmentForm;
