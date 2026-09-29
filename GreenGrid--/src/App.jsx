import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Buildings from "./Pages/Buildings";
import EnergyMonitoring from "./Pages/EnergyMonitoring";
import Analytics from "./Pages/Analytics";
import Alerts from "./Pages/Alerts";
import Reports from "./Pages/Reports";

function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

function DashboardLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  );
}

function ProtectedPage({ children }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedPage><Dashboard /></ProtectedPage>} />
      <Route path="/buildings" element={<ProtectedPage><Buildings /></ProtectedPage>} />
      <Route path="/monitoring" element={<ProtectedPage><EnergyMonitoring /></ProtectedPage>} />
      <Route path="/analytics" element={<ProtectedPage><Analytics /></ProtectedPage>} />
      <Route path="/alerts" element={<ProtectedPage><Alerts /></ProtectedPage>} />
      <Route path="/reports" element={<ProtectedPage><Reports /></ProtectedPage>} />

      <Route
        path="*"
        element={<Navigate to={isLoggedIn() ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
