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
  // Group investments by symbol to calculate averages
  const groupedInvestments = investments.reduce((acc, inv) => {
    const symbol = inv.symbol;
    if (!acc[symbol]) {
      acc[symbol] = {
        symbol,
        totalQuantity: 0,
        totalCost: 0,
        currentPrice: inv.current_price || 0,
        investments: [],
      };
    }
    const qty = parseFloat(String(inv.quantity));
    const price = parseFloat(String(inv.purchase_price));
    acc[symbol].totalQuantity += qty;
    acc[symbol].totalCost += qty * price;
    acc[symbol].investments.push(inv);
    return acc;
  }, {} as any);

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        className="portfolio-table"
        style={{ width: "100%", minWidth: "800px" }}
      >
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Avg Price</th>
            <th>Current Price</th>
            <th>Total Value</th>
            <th>Gain/Loss</th>
            <th>Gain/Loss %</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(groupedInvestments).map((group: any) => {
            const avgPrice = group.totalCost / group.totalQuantity;
            const currentPrice = group.currentPrice;
            const totalValue = group.totalQuantity * currentPrice;
            const gainLoss = totalValue - group.totalCost;
            const gainLossPercent = (gainLoss / group.totalCost) * 100;
            const isPositive = gainLoss >= 0;

            return (
              <tr
                key={group.symbol}
                onClick={() => onRowClick(group.symbol)}
                style={{
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <td style={{ fontWeight: "600" }}>{group.symbol}</td>
                <td>{group.totalQuantity.toFixed(2)}</td>
                <td>${avgPrice.toFixed(2)}</td>
                <td style={{ fontWeight: "600" }}>
                  {currentPrice > 0 ? `$${currentPrice.toFixed(2)}` : "N/A"}
                </td>
                <td style={{ fontWeight: "600" }}>
                  {currentPrice > 0 ? `$${totalValue.toFixed(2)}` : "N/A"}
                </td>
                <td
                  style={{
                    color: isPositive ? "#10b981" : "#ef4444",
                    fontWeight: "600",
                  }}
                >
                  {currentPrice > 0 ? (
                    <>
                      {isPositive ? "+" : ""}${gainLoss.toFixed(2)}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td
                  style={{
                    color: isPositive ? "#10b981" : "#ef4444",
                    fontWeight: "600",
                  }}
                >
                  {currentPrice > 0 ? (
                    <>
                      {isPositive ? "+" : ""}
                      {gainLossPercent.toFixed(2)}%
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;
