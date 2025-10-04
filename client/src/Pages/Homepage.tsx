import React from "react";
import { Link } from "react-router-dom"; // --- CHANGE HERE: Import the Link component ---
import "./HomePage.css";

// --- Interface and Data for Feature Cards ---
interface FeatureProps {
  iconSymbol: string;
  title: string;
  description: string;
}

const coreFeatures: FeatureProps[] = [
  // ... (your feature data remains the same)
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
          {/* --- CHANGE HERE: Wrap buttons with Link component --- */}
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
          {/* --- CHANGE HERE: Wrap button with Link component --- */}
          <Link to="/register">
            <button className="btn-primary large-cta">
              Claim Your Free Account &rarr;
            </button>
          </Link>
          <div className="trust-indicators">
            <p>Powered by reliable data from: </p>
          </div>
          <div className="dashboard-mockup">
            <div className="mockup-chart"></div>
            <div className="mockup-caption">
              Your Portfolio Performance, Visualized.
            </div>
          </div>
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
          {/* ... (steps remain the same) ... */}
          <div className="step-card">
                        <span className="step-number">1</span>           {" "}
            <h3>Set Up Securely</h3>           {" "}
            <p>
              Create your account using our audited, high-security
              authentication system.
            </p>
                     {" "}
          </div>
                    <div className="step-arrow">&rarr;</div>         {" "}
          <div className="step-card">
                        <span className="step-number">2</span>           {" "}
            <h3>Log Transactions</h3>           {" "}
            <p>
              Use our clean form to quickly add your stocks, crypto, and
              purchase history.
            </p>
                     {" "}
          </div>
                    <div className="step-arrow">&rarr;</div>         {" "}
          <div className="step-card">
                        <span className="step-number">3</span>           {" "}
            <h3>Watch Your Growth</h3>           {" "}
            <p>
              Your dashboard lights up with real-time P&L, allocation, and
              performance charts.
            </p>
                     {" "}
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
        {/* --- CHANGE HERE: Wrap button with Link component --- */}
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
