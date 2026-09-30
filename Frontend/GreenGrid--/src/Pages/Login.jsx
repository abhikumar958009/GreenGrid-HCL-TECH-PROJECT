import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please enter email and password.");
      return;
    }

    const demoEmail = "admin@greengrid.com";
    const demoPassword = "admin123";

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("greenGridUsers") || "[]");
    } catch {
      users = [];
    }

    const registeredUser = users.find(
      (user) =>
        user.email?.toLowerCase() === normalizedEmail &&
        user.password === password
    );

    const isDemoAdmin =
      normalizedEmail === demoEmail && password === demoPassword;

    if (!isDemoAdmin && !registeredUser) {
      setError("Invalid email or password.");
      return;
    }

    const loggedInUser = registeredUser || {
      name: "Admin",
      email: demoEmail,
    };

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-info">
        <Link to="/" className="login-logo">GreenGrid</Link>

        <div className="login-info-content">
          <span>SMART ENERGY MANAGEMENT</span>
          <h1>Manage Energy.<br />Build a Greener Future.</h1>
          <p>Monitor, analyze and manage your energy consumption with GreenGrid.</p>
        </div>

        <p className="login-copyright">© 2026 GreenGrid. All rights reserved.</p>
      </div>

      <div className="login-form-section">
        <div className="login-card">
          <div className="login-heading">
            <h2>Welcome Back</h2>
            <p>Login to your GreenGrid dashboard.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && <small className="form-error">{error}</small>}

            <div className="login-options">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={() => alert("Password reset feature coming soon.")}
              >
                Forgot password?
              </button>
            </div>

            <button type="submit" className="login-submit">Login</button>
          </form>

          <div className="auth-switch">
            Don't have an account? <Link to="/register">Create Account</Link>
          </div>

          <div className="back-home">
            <Link to="/">← Back to Home</Link>
          </div>

          <div className="demo-login">
            <strong>Demo:</strong> admin@greengrid.com / admin123
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
