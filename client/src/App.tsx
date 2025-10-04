import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DashboardPage from "./Pages/DashboardPage";
import HomePage from "./Pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoutes";
import "./App.css";

// Define the component type as a React Functional Component (FC)
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* // Public Routes 
          These routes are accessible to all users (authenticated or not).
          HomePage is now unprotected.
        */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* // Protected Routes 
          These routes are nested inside the ProtectedRoute component, 
          which handles authentication checks (e.g., redirecting unauthenticated users).
        */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;