import React, { useState } from "react";
import { registerUser } from "../services/authService"; // <-- Import the new service
import "./LoginPage.css"; // Reusing the same CSS

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // <-- State for handling errors

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    try {
      const data = await registerUser(email, password);
      console.log("Registration successful!", data);

      // TODO: Save the token (data.token) and redirect the user
      alert("Registration successful! Check the console for your token.");
    } catch (err: any) {
      console.error("Registration failed:", err);
      // Set an error message to display to the user
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {/* Display the error message if it exists */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* The rest of the form is the same */}
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
      </form>
    </div>
  );
};

export default RegisterPage;
