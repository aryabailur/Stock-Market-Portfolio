import React, { useState } from "react";

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
  onDelete: (id: number) => void;
}

const PortfolioTable = ({
  investments,
  onRowClick,
  onDelete,
}: PortfolioTableProps) => {
  const [deleteModal, setDeleteModal] = useState<{
    show: boolean;
    id: number | null;
    symbol: string;
    quantity: number;
    price: number;
  }>({
    show: false,
    id: null,
    symbol: "",
    quantity: 0,
    price: 0,
  });

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

  const handleDeleteClick = (e: React.MouseEvent, inv: Investment) => {
    e.stopPropagation();
    const qty = parseFloat(String(inv.quantity));
    const price = parseFloat(String(inv.purchase_price));
    setDeleteModal({
      show: true,
      id: inv.id,
      symbol: inv.symbol,
      quantity: qty,
      price: price,
    });
  };

  const confirmDelete = () => {
    if (deleteModal.id !== null) {
      onDelete(deleteModal.id);
      setDeleteModal({
        show: false,
        id: null,
        symbol: "",
        quantity: 0,
        price: 0,
      });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({
      show: false,
      id: null,
      symbol: "",
      quantity: 0,
      price: 0,
    });
  };

  return (
    <>
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
              <th>Actions</th>
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
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {group.investments.map(
                        (inv: Investment, index: number) => {
                          const qty = parseFloat(String(inv.quantity));
                          const price = parseFloat(String(inv.purchase_price));
                          const tooltipText = `Delete purchase: ${qty.toFixed(
                            2
                          )} shares @ $${price.toFixed(2)}`;

                          return (
                            <button
                              key={inv.id}
                              onClick={(e) => handleDeleteClick(e, inv)}
                              className="delete-button"
                              title={tooltipText}
                              style={{
                                padding: "0.5rem 0.875rem",
                                background: "rgba(239, 68, 68, 0.1)",
                                color: "#ef4444",
                                border: "1.5px solid rgba(239, 68, 68, 0.3)",
                                borderRadius: "8px",
                                fontSize: "0.813rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition:
                                  "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.375rem",
                                backdropFilter: "blur(10px)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(239, 68, 68, 0.2)";
                                e.currentTarget.style.borderColor = "#ef4444";
                                e.currentTarget.style.transform =
                                  "translateY(-2px)";
                                e.currentTarget.style.boxShadow =
                                  "0 4px 12px rgba(239, 68, 68, 0.3)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(239, 68, 68, 0.1)";
                                e.currentTarget.style.borderColor =
                                  "rgba(239, 68, 68, 0.3)";
                                e.currentTarget.style.transform =
                                  "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                              }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                              {group.investments.length > 1 && (
                                <span
                                  style={{
                                    fontSize: "0.75rem",
                                    opacity: 0.9,
                                    fontWeight: "700",
                                  }}
                                >
                                  #{index + 1}
                                </span>
                              )}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Custom Delete Modal */}
      {deleteModal.show && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={cancelDelete}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              borderRadius: "16px",
              padding: "2rem",
              maxWidth: "450px",
              width: "90%",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              animation: "slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(239, 68, 68, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#f1f5f9",
                  }}
                >
                  Delete Investment
                </h3>
              </div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <p
                style={{
                  color: "#cbd5e1",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  margin: "0 0 1rem 0",
                }}
              >
                Are you sure you want to delete this investment?
              </p>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "10px",
                  padding: "1rem",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                    Symbol:
                  </span>
                  <span style={{ color: "#f1f5f9", fontWeight: "600" }}>
                    {deleteModal.symbol}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                    Quantity:
                  </span>
                  <span style={{ color: "#f1f5f9", fontWeight: "600" }}>
                    {deleteModal.quantity.toFixed(2)}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                    Purchase Price:
                  </span>
                  <span style={{ color: "#f1f5f9", fontWeight: "600" }}>
                    ${deleteModal.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.875rem",
                  marginTop: "1rem",
                  marginBottom: 0,
                }}
              >
                This action cannot be undone.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={cancelDelete}
                style={{
                  flex: 1,
                  padding: "0.875rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1.5px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  color: "#e2e8f0",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.1)";
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  flex: 1,
                  padding: "0.875rem",
                  background:
                    "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  border: "none",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 16px rgba(239, 68, 68, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(239, 68, 68, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(239, 68, 68, 0.3)";
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default PortfolioTable;
