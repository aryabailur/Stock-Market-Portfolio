import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // <-- Import useNavigate and Link
import { registerUser } from "../services/authService"; // <-- Import the service
import "./LoginPage.css"; // Reusing the same CSS

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // <-- Initialize the navigate function

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const data = await registerUser(email, password);
      console.log("Registration successful!", data);

      // 1. Save the token to the browser's local storage
      localStorage.setItem("token", data.token);

      // 2. Redirect the user to the dashboard
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Registration failed:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* The form is the same */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Register
        </button>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
