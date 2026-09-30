import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    navigate("/login", { replace: true });
  };

  const links = [
    ["/dashboard", "Dashboard"],
    ["/buildings", "Buildings"],
    ["/monitoring", "Energy Monitoring"],
    ["/renewable-energy", "Renewable Energy"],
    ["/analytics", "Analytics"],
    ["/alerts", "Alerts"],
    ["/reports", "Reports"],
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>GreenGrid</h2>
      </div>

      <nav className="sidebar-nav">
        {links.map(([path, label]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <button type="button" className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
