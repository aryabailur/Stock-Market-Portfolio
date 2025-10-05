import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioTable from "../components/PortfolioPage";
import AddInvestmentForm from "../components/AddInvestmentForm";
import StockChart from "../components/StockChart";
import {
  getPortfolioData,
  addPortfolioInvestment,
  getCurrentPrice,
} from "../services/portfolioService";
import { getStockHistory } from "../services/stockService";
import "./DashboardPage.css";

interface Investment {
  id: number;
  symbol: string;
  quantity: number;
  purchase_price: number;
  current_price?: number;
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
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const navigate = useNavigate();

  const fetchPortfolio = async () => {
    try {
      setLoadingPortfolio(true);
      const data: Investment[] = await getPortfolioData();

      const symbols: string[] = [...new Set(data.map((inv) => inv.symbol))];
      const pricePromises = symbols.map((symbol) => getCurrentPrice(symbol));
      const prices = await Promise.all(pricePromises);

      const priceMap: Record<string, number> = symbols.reduce(
        (acc, symbol, index) => {
          acc[symbol] = prices[index];
          return acc;
        },
        {} as Record<string, number>
      );

      const enrichedData = data.map((inv) => ({
        ...inv,
        current_price: priceMap[inv.symbol] || 0,
      }));

      setInvestments(enrichedData);
      setError("");
    } catch (err) {
      setError("Failed to fetch portfolio data. Please try again later.");
      console.error(err);
    } finally {
      setLoadingPortfolio(false);
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
      setError("");
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
      setError(`Unable to load chart data for ${symbol}`);
      console.error(err);
    } finally {
      setLoadingChart(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Calculate portfolio summary
  const portfolioSummary = investments.reduce(
    (acc, inv) => {
      const quantity = Number(inv.quantity);
      const purchasePrice = Number(inv.purchase_price);
      const currentPrice = inv.current_price || 0;

      const invested = quantity * purchasePrice;
      const currentValue =
        currentPrice > 0 ? quantity * currentPrice : invested;

      acc.totalInvested += invested;
      acc.currentValue += currentValue;

      return acc;
    },
    { totalInvested: 0, currentValue: 0 }
  );

  const totalGainLoss =
    portfolioSummary.currentValue - portfolioSummary.totalInvested;
  const totalGainLossPercent =
    portfolioSummary.totalInvested > 0
      ? (totalGainLoss / portfolioSummary.totalInvested) * 100
      : 0;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Portfolio Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span>⚠</span> {error}
        </div>
      )}

      {/* Portfolio Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-label">Total Invested</div>
          <div className="summary-value">
            ${portfolioSummary.totalInvested.toFixed(2)}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Current Value</div>
          <div className="summary-value">
            ${portfolioSummary.currentValue.toFixed(2)}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Total Gain/Loss</div>
          <div
            className={`summary-value ${
              totalGainLoss >= 0 ? "positive" : "negative"
            }`}
          >
            {totalGainLoss >= 0 ? "+" : ""}${totalGainLoss.toFixed(2)}
            <span className="summary-percent">
              ({totalGainLossPercent >= 0 ? "+" : ""}
              {totalGainLossPercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="card">
        <AddInvestmentForm onAddInvestment={handleAddInvestment} />
      </div>

      <div className="card">
        {loadingPortfolio ? (
          <div className="loading-state">Loading portfolio...</div>
        ) : (
          <PortfolioTable
            investments={investments}
            onRowClick={handleRowClick}
          />
        )}
      </div>

      {loadingChart && (
        <div className="card loading-state">
          Loading chart for {selectedSymbol}...
        </div>
      )}

      {chartData && !loadingChart && (
        <StockChart data={chartData} symbol={selectedSymbol} />
      )}
    </div>
  );
};

export default DashboardPage;
