import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface ChartData {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  t: number[];
  s: string;
}

interface StockChartProps {
  data: ChartData;
  symbol: string;
}

const StockChart = ({ data, symbol }: StockChartProps) => {
  if (data.s !== "ok" || !data.c) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          color: "#94a3b8",
          background: "#1e293b",
          borderRadius: "12px",
        }}
      >
        Could not load chart data for {symbol}.
      </div>
    );
  }

  const formattedData = data.c.map((price, index) => ({
    date: new Date(data.t[index] * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    price: price,
    timestamp: data.t[index],
  }));

  // Calculate price change
  const firstPrice = formattedData[0]?.price || 0;
  const lastPrice = formattedData[formattedData.length - 1]?.price || 0;
  const priceChange = lastPrice - firstPrice;
  const percentChange = ((priceChange / firstPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "rgba(15, 23, 42, 0.95)",
            border: "1px solid #334155",
            borderRadius: "8px",
            padding: "12px 16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#94a3b8",
              marginBottom: "4px",
            }}
          >
            {payload[0].payload.date}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: "600",
              color: "#fff",
            }}
          >
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h3
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "700",
            color: "#fff",
            marginBottom: "8px",
          }}
        >
          {symbol}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            ${lastPrice.toFixed(2)}
          </span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: isPositive ? "#10b981" : "#ef4444",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {isPositive ? "↑" : "↓"} ${Math.abs(priceChange).toFixed(2)} (
            {percentChange}%)
          </span>
        </div>
        <p
          style={{
            margin: "8px 0 0 0",
            fontSize: "14px",
            color: "#64748b",
          }}
        >
          1 Year Performance
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={formattedData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={isPositive ? "#10b981" : "#ef4444"}
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor={isPositive ? "#10b981" : "#ef4444"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis
            dataKey="date"
            stroke="#64748b"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            tickLine={{ stroke: "#334155" }}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis
            domain={["dataMin - 5", "dataMax + 5"]}
            stroke="#64748b"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            tickLine={{ stroke: "#334155" }}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#475569", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={isPositive ? "#10b981" : "#ef4444"}
            strokeWidth={3}
            fill="url(#colorPrice)"
            dot={false}
            activeDot={{
              r: 6,
              fill: isPositive ? "#10b981" : "#ef4444",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
