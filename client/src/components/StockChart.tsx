import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// --- FIXES ARE HERE ---

// 1. Define the shape of the data from the Finnhub API
interface ChartData {
  c: number[]; // Array of closing prices
  h: number[]; // Array of high prices
  l: number[]; // Array of low prices
  o: number[]; // Array of open prices
  t: number[]; // Array of timestamps
  s: string; // Status
}

// 2. Define the shape of all props for the StockChart component
interface StockChartProps {
  data: ChartData;
  symbol: string;
}

// 3. Apply the props type to the component
const StockChart = ({ data, symbol }: StockChartProps) => {
  // --------------------

  // Check if data is valid before trying to map it
  if (data.s !== "ok" || !data.c) {
    return <div>Could not load chart data.</div>;
  }

  const formattedData = data.c.map((price, index) => ({
    date: new Date(data.t[index] * 1000).toLocaleDateString(),
    price: price,
  }));

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3>{symbol} Price Trend (1 Year)</h3>
      <ResponsiveContainer>
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
