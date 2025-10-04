import React, { useState } from "react";
import PortfolioTable from "../components/PortfolioPage";
import AddInvestmentForm from "../components/AddInvestmentForm";
import "./DashboardPage.css"; // <-- Import the new CSS

const mockInvestments = [
  { id: 1, symbol: "AAPL", quantity: 10, purchase_price: 150.25 },
  { id: 2, symbol: "GOOGL", quantity: 5, purchase_price: 2750.5 },
  { id: 3, symbol: "TSLA", quantity: 12, purchase_price: 700.0 },
];

const DashboardPage = () => {
  const [investments, setInvestments] = useState(mockInvestments);

  const handleAddInvestment = (newInvestment: {
    symbol: string;
    quantity: number;
    purchase_price: number;
  }) => {
    setInvestments((prevInvestments) => [
      ...prevInvestments,
      {
        ...newInvestment,
        id: Date.now(),
      },
    ]);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Your Portfolio Dashboard</h1>
      <div className="card">
        <AddInvestmentForm onAddInvestment={handleAddInvestment} />
      </div>
      <div className="card">
        <PortfolioTable investments={investments} />
      </div>
    </div>
  );
};

export default DashboardPage;
