import React from "react";

interface Investment {
  id: number;
  symbol: string;
  quantity: number;
  purchase_price: number;
}

const PortfolioTable = ({ investments }: { investments: Investment[] }) => {
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
          <tr key={investment.id}>
            <td>{investment.symbol}</td>
            <td>{investment.quantity}</td>
            <td>${investment.purchase_price.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PortfolioTable;
