import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

// --- Interface and Data for Feature Cards ---
interface FeatureProps {
  iconSymbol: string;
  title: string;
  description: string;
}

const coreFeatures: FeatureProps[] = [
  {
    iconSymbol: "⚡",
    title: "Real-Time Valuation",
    description:
      "Leverage third-party APIs (Finnhub, CoinGecko) for **live, accurate pricing** on all your holdings.",
  },
  {
    iconSymbol: "🎯",
    title: "Precision P&L Analytics",
    description:
      "Instantly calculate realized/unrealized gains, ROI, and performance against **market benchmarks**.",
  },
  {
    iconSymbol: "🔒",
    title: "Secure & Private",
    description:
      "Your financial data is protected by secure user authentication and **industry-leading encryption**.",
  },
  {
    iconSymbol: "🧩",
    title: "Multi-Asset Integration",
    description:
      "Seamlessly track stocks, cryptocurrencies, ETFs, and other assets in one unified platform.",
  },
];

// --- Feature Card Component ---
const FeatureCard: React.FC<FeatureProps> = ({
  iconSymbol,
  title,
  description,
}) => (
  <div className="feature-card">
    <div className="icon-placeholder">{iconSymbol}</div>
    <h3>{title}</h3>
    <p
      dangerouslySetInnerHTML={{
        __html: description.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"),
      }}
    />
  </div>
);

// --- Dashboard Mockup Component ---
const DashboardMockup: React.FC = () => {
  const [currentValue, setCurrentValue] = useState(21000);

  // Sample portfolio data for the chart
  const portfolioData = [
    { month: "Jan", value: 15000 },
    { month: "Feb", value: 16200 },
    { month: "Mar", value: 15800 },
    { month: "Apr", value: 17500 },
    { month: "May", value: 18200 },
    { month: "Jun", value: 19800 },
    { month: "Jul", value: 21000 },
  ];

  const assetAllocation = [
    { name: "AAPL", percentage: 35, color: "#10b981" },
    { name: "GOOGL", percentage: 25, color: "#3b82f6" },
    { name: "MSFT", percentage: 20, color: "#8b5cf6" },
    { name: "TSLA", percentage: 15, color: "#f59e0b" },
    { name: "Others", percentage: 5, color: "#6366f1" },
  ];

  // Animate value on mount
  useEffect(() => {
    let start = 15000;
    const end = 21000;
    const duration = 2000;
    const increment = (end - start) / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCurrentValue(end);
        clearInterval(timer);
      } else {
        setCurrentValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dashboard-mockup">
      {/* Stats Cards */}
      <div className="mockup-stats">
        <div className="stat-card">
          <div className="stat-label">Portfolio Value</div>
          <div className="stat-value">${currentValue.toLocaleString()}</div>
          <div className="stat-change positive">+40.0% ↑</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Gain</div>
          <div className="stat-value">+$6,000</div>
          <div className="stat-change positive">+15.2% ↑</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Assets</div>
          <div className="stat-value">12</div>
          <div className="stat-change">Stocks & Crypto</div>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="mockup-chart-container">
        <div className="mockup-chart">
          <div className="chart-header">
            <h3>Portfolio Performance</h3>
            <div className="chart-tabs">
              <button className="active">1Y</button>
              <button>6M</button>
              <button>1M</button>
            </div>
          </div>

          {/* Simple SVG Line Chart */}
          <svg viewBox="0 0 600 200" className="line-chart">
            <defs>
              <linearGradient
                id="chartGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line
              x1="0"
              y1="50"
              x2="600"
              y2="50"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="100"
              x2="600"
              y2="100"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="150"
              x2="600"
              y2="150"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />

            {/* Chart path */}
            <path
              d="M 0,120 L 100,80 L 200,90 L 300,50 L 400,35 L 500,15 L 600,5"
              fill="url(#chartGradient)"
              className="chart-area"
            />
            <path
              d="M 0,120 L 100,80 L 200,90 L 300,50 L 400,35 L 500,15 L 600,5"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              className="chart-line"
            />

            {/* Data points */}
            {portfolioData.map((point, i) => (
              <circle
                key={i}
                cx={i * 100}
                cy={120 - i * 15}
                r="4"
                fill="#10b981"
                className="chart-point"
              />
            ))}
          </svg>

          {/* X-axis labels */}
          <div className="chart-labels">
            {portfolioData.map((point) => (
              <span key={point.month}>{point.month}</span>
            ))}
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="mockup-allocation">
          <h3>Asset Allocation</h3>
          <div className="allocation-list">
            {assetAllocation.map((asset) => (
              <div key={asset.name} className="allocation-item">
                <div className="allocation-info">
                  <div
                    className="allocation-color"
                    style={{ backgroundColor: asset.color }}
                  />
                  <span className="allocation-name">{asset.name}</span>
                </div>
                <span className="allocation-percentage">
                  {asset.percentage}%
                </span>
                <div className="allocation-bar">
                  <div
                    className="allocation-fill"
                    style={{
                      width: `${asset.percentage}%`,
                      backgroundColor: asset.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mockup-caption">
        Live Data Visualization - Your Portfolio at a Glance
      </div>
    </div>
  );
};

// --- Main Homepage Component ---
const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      {/* 1. Navigation Bar */}
      <nav className="navbar">
        <div className="logo">PROSPERA</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <Link to="/register">
            <button className="btn-secondary">Signup</button>
          </Link>
          <Link to="/login">
            <button className="btn-primary">Login</button>
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Beyond Spreadsheets. Intelligent Portfolio Tracking.</h1>
          <p className="subtitle">
            Unify your stocks and crypto holdings. Get a live, consolidated view
            of your wealth with automated P&L calculations and professional
            analytics.
          </p>
          <Link to="/register">
            <button className="btn-primary large-cta">
              Claim Your Free Account &rarr;
            </button>
          </Link>
          <div className="trust-indicators">
            <p>Powered by reliable data from: </p>
          </div>
          <DashboardMockup />
        </div>
      </header>

      {/* 3. Core Features Showcase */}
      <section id="features" className="features-section">
        <h2>The Intelligence Behind Your Decisions</h2>
        <div className="features-grid">
          {coreFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <h2>Your Portfolio in 3 Simple Steps</h2>
        <div className="steps-container">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Set Up Securely</h3>
            <p>
              Create your account using our audited, high-security
              authentication system.
            </p>
          </div>
          <div className="step-arrow">&rarr;</div>
          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Log Transactions</h3>
            <p>
              Use our clean form to quickly add your stocks, crypto, and
              purchase history.
            </p>
          </div>
          <div className="step-arrow">&rarr;</div>
          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Watch Your Growth</h3>
            <p>
              Your dashboard lights up with real-time P&L, allocation, and
              performance charts.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Secondary Call-to-Action */}
      <section className="cta-section">
        <h2>Ready to Maximize Your Portfolio's Potential?</h2>
        <p>
          Join thousands of modern investors tracking their wealth the smart
          way.
        </p>
        <Link to="/register">
          <button className="btn-primary large-cta">
            Access Your Dashboard Now &rarr;
          </button>
        </Link>
      </section>

      {/* 6. Footer */}
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Invest Pro. All Rights Reserved.
        </p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
