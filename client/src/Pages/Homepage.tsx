import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Investment Portfolio Tracker 📈</h1>
      </header>

      <main className="home-main">
        <section className="intro">
          <h2>About Our Project</h2>
          <p>
            This project goes a step beyond a simple tracker by focusing on
            investments. Users can manually add their investments (e.g., stocks,
            cryptocurrencies), track their purchase prices, and see their
            current value and profit/loss.
          </p>
          <p>
            <strong>Roles in the project:</strong>
            <br />• <b>Frontend:</b> Dashboard with tables, forms, and graphs.
            <br />• <b>Database & API:</b> Store investments and fetch
            real-time data from APIs.
            <br />• <b>Authentication & Logic:</b> Secure login and portfolio
            calculations.
          </p>
        </section>
      </main>

      <footer className="home-footer">
        <p>© 2025 Investment Portfolio Tracker</p>
        <nav>
          <Link to="/login" className="footer-link">
            Go to Login
          </Link>
        </nav>
      </footer>
    </div>
  );
}
