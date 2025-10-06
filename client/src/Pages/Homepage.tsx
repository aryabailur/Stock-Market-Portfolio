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
      "Leverage third-party APIs (Finnhub, CoinGecko) for live, accurate pricing on all your holdings.",
  },
  {
    iconSymbol: "🎯",
    title: "Precision P&L Analytics",
    description:
      "Instantly calculate realized/unrealized gains, ROI, and performance against market benchmarks.",
  },
  {
    iconSymbol: "🔒",
    title: "Secure & Private",
    description:
      "Your financial data is protected by secure user authentication and industry-leading encryption.",
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
  <div className="feature-card-enhanced">
    <div className="feature-icon">{iconSymbol}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// --- Dashboard Mockup Component ---
const DashboardMockup: React.FC = () => {
  const [currentValue, setCurrentValue] = useState(21000);

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
    <div className="dashboard-mockup-enhanced">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card-enhanced">
          <div className="stat-badge"></div>
          <div className="stat-label">Portfolio Value</div>
          <div className="stat-value">${currentValue.toLocaleString()}</div>
          <div className="stat-change positive">+40.0% ↑</div>
        </div>

        <div className="stat-card-enhanced">
          <div className="stat-badge"></div>
          <div className="stat-label">Total Gain</div>
          <div className="stat-value">+$6,000</div>
          <div className="stat-change positive">+15.2% ↑</div>
        </div>

        <div className="stat-card-enhanced">
          <div className="stat-badge"></div>
          <div className="stat-label">Active Assets</div>
          <div className="stat-value">12</div>
          <div className="stat-change">Stocks & Crypto</div>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="chart-grid">
        <div className="chart-container-enhanced">
          <div className="chart-header">
            <h3>Portfolio Performance</h3>
            <div className="chart-tabs">
              <button className="tab-active">1Y</button>
              <button>6M</button>
              <button>1M</button>
            </div>
          </div>

          <svg viewBox="0 0 600 200" className="line-chart">
            <defs>
              <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>

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

            <path
              d="M 0,120 L 100,80 L 200,90 L 300,50 L 400,35 L 500,15 L 600,5"
              fill="url(#chartGrad)"
              className="chart-area"
            />
            <path
              d="M 0,120 L 100,80 L 200,90 L 300,50 L 400,35 L 500,15 L 600,5"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              className="chart-line-animated"
            />

            {portfolioData.map((point, i) => (
              <circle
                key={i}
                cx={i * 100}
                cy={120 - i * 15}
                r="4"
                fill="#10b981"
                className="chart-dot"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </svg>

          <div className="chart-labels">
            {portfolioData.map((point) => (
              <span key={point.month}>{point.month}</span>
            ))}
          </div>
        </div>

        <div className="allocation-container-enhanced">
          <h3>Asset Allocation</h3>
          <div className="allocation-list">
            {assetAllocation.map((asset) => (
              <div key={asset.name} className="allocation-item-enhanced">
                <div className="allocation-header">
                  <div className="allocation-info">
                    <div
                      className="allocation-dot"
                      style={{ backgroundColor: asset.color }}
                    ></div>
                    <span className="allocation-name">{asset.name}</span>
                  </div>
                  <span className="allocation-percentage">
                    {asset.percentage}%
                  </span>
                </div>
                <div className="allocation-bar">
                  <div
                    className="allocation-fill"
                    style={{
                      width: `${asset.percentage}%`,
                      backgroundColor: asset.color,
                    }}
                  ></div>
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
    <div className="homepage-enhanced">
      {/* Animated Background */}
      <div className="bg-gradient-orb bg-gradient-orb-1"></div>
      <div className="bg-gradient-orb bg-gradient-orb-2"></div>

      {/* Navigation Bar */}
      <nav className="navbar-enhanced">
        <div className="navbar-content">
          <div className="logo-enhanced">PROSPERA</div>
          <div className="nav-links-enhanced">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <Link to="/register">
              <button className="btn-outline">Signup</button>
            </Link>
            <Link to="/login">
              <button className="btn-solid">Login</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-enhanced">
        <div className="hero-content-enhanced">
          <div className="trust-badge">🚀 Trusted by 10,000+ Investors</div>

          <h1 className="hero-title">
            <span className="title-line-1">Beyond Spreadsheets.</span>
            <span className="title-line-2">Intelligent Portfolio</span>
            <span className="title-line-3">Tracking.</span>
          </h1>

          <p className="hero-subtitle">
            Unify your stocks and crypto holdings. Get a live, consolidated view
            of your wealth with automated P&L calculations and professional
            analytics.
          </p>

          <Link to="/register">
            <button className="cta-button">Claim Your Free Account →</button>
          </Link>

          <div className="powered-by">
            Powered by reliable data from:{" "}
            <span className="providers">
              Finnhub • CoinGecko • Yahoo Finance
            </span>
          </div>

          <DashboardMockup />
        </div>
      </header>

      {/* Core Features */}
      <section id="features" className="features-enhanced">
        <div className="section-header">
          <h2>The Intelligence Behind Your Decisions</h2>
          <p>Powerful features designed for modern investors</p>
        </div>

        <div className="features-grid-enhanced">
          {coreFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-wrapper"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-works-enhanced">
        <div className="section-header">
          <h2>Your Portfolio in 3 Simple Steps</h2>
        </div>

        <div className="steps-grid">
          <div className="step-card-enhanced">
            <div className="step-badge">1</div>
            <h3>Set Up Securely</h3>
            <p>
              Create your account using our audited, high-security
              authentication system.
            </p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-card-enhanced">
            <div className="step-badge">2</div>
            <h3>Log Transactions</h3>
            <p>
              Use our clean form to quickly add your stocks, crypto, and
              purchase history.
            </p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-card-enhanced">
            <div className="step-badge">3</div>
            <h3>Watch Your Growth</h3>
            <p>
              Your dashboard lights up with real-time P&L, allocation, and
              performance charts.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-enhanced">
        <div className="cta-content">
          <h2>Ready to Maximize Your Portfolio's Potential?</h2>
          <p>
            Join thousands of modern investors tracking their wealth the smart
            way.
          </p>
          <Link to="/register">
            <button className="cta-button-secondary">
              Access Your Dashboard Now →
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-enhanced">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Invest Pro. All Rights Reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
