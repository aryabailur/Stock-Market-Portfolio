import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoutes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />       {/* Home is now protected */}
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* You can add more protected routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

