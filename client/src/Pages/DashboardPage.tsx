import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioTable from "../components/PortfolioPage";
import AddInvestmentForm from "../components/AddInvestmentForm";
import StockChart from "../components/StockChart";
import {
  getPortfolioData,
  addPortfolioInvestment,
} from "../services/portfolioService";
import { getStockHistory } from "../services/stockService"; // You'll need to create this
import "./DashboardPage.css";

interface Investment {
  id: number;
  symbol: string;
  quantity: number;
  purchase_price: number;
}

interface ChartData {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  t: number[];
  s: string;
}

const DashboardPage = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [error, setError] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loadingChart, setLoadingChart] = useState(false);
  const navigate = useNavigate();

  const fetchPortfolio = async () => {
    try {
      const data = await getPortfolioData();
      setInvestments(data);
    } catch (err) {
      setError("Failed to fetch portfolio data. Please try again later.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleAddInvestment = async (newInvestment: {
    symbol: string;
    quantity: number;
    purchase_price: number;
  }) => {
    try {
      await addPortfolioInvestment(newInvestment);
      fetchPortfolio();
    } catch (err) {
      setError("Failed to add investment.");
      console.error(err);
    }
  };

  const handleRowClick = async (symbol: string) => {
    setSelectedSymbol(symbol);
    setLoadingChart(true);
    setError("");

    try {
      const data = await getStockHistory(symbol);
      setChartData(data);
    } catch (err) {
      setError(`Failed to load chart for ${symbol}`);
      console.error(err);
    } finally {
      setLoadingChart(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Portfolio Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="card">
        <AddInvestmentForm onAddInvestment={handleAddInvestment} />
      </div>

      <div className="card">
        <PortfolioTable investments={investments} onRowClick={handleRowClick} />
      </div>

      {loadingChart && (
        <div className="card">
          <p>Loading chart...</p>
        </div>
      )}

      {chartData && !loadingChart && (
        <div className="card">
          <StockChart data={chartData} symbol={selectedSymbol} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
