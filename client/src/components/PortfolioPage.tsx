import React from "react";

interface Investment {
  id: number;
  symbol: string;
  quantity: number | string;
  purchase_price: number | string;
  current_price?: number;
  current_value?: number;
  profit_loss?: number;
}

interface PortfolioTableProps {
  investments: Investment[];
  onRowClick: (symbol: string) => void;
}

const PortfolioTable = ({ investments, onRowClick }: PortfolioTableProps) => {
  return (
    <table className="portfolio-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Quantity</th>
          <th>Purchase Price</th>
        </tr>
      </thead>
      <tbody>
        {investments.map((investment) => (
          <tr
            key={investment.id}
            onClick={() => onRowClick(investment.symbol)}
            style={{ cursor: "pointer" }}
          >
            <td>{investment.symbol}</td>
            <td>{parseFloat(String(investment.quantity)).toFixed(2)}</td>
            <td>${parseFloat(String(investment.purchase_price)).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PortfolioTable;
