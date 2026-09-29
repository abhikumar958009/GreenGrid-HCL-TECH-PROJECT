import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const getPasswordStrength = () => {
    if (!password) return { label: "", width: "0%", className: "" };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { label: "Weak", width: "33%", className: "weak" };
    if (strength <= 3) return { label: "Medium", width: "66%", className: "medium" };
    return { label: "Strong", width: "100%", className: "strong" };
  };

  const validateForm = () => {
    const nextErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) nextErrors.name = "Full name is required.";
    else if (trimmedName.length < 3) nextErrors.name = "Name must be at least 3 characters.";

    if (!trimmedEmail) nextErrors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password) nextErrors.password = "Password is required.";
    else if (password.length < 6) nextErrors.password = "Password must contain at least 6 characters.";

    if (!confirmPassword) nextErrors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";

    if (!agreeTerms) nextErrors.terms = "Please accept the Terms & Conditions.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      const trimmedEmail = email.trim().toLowerCase();

      let users = [];
      try {
        users = JSON.parse(localStorage.getItem("greenGridUsers") || "[]");
      } catch {
        users = [];
      }

      const existingUser = users.find(
        (user) => user.email?.toLowerCase() === trimmedEmail
      );

      if (existingUser) {
        setErrors({ email: "An account with this email already exists." });
        setLoading(false);
        return;
      }

      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: trimmedEmail,
        password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("greenGridUsers", JSON.stringify(users));

      setLoading(false);
      alert("Account created successfully!");
      navigate("/login", { replace: true });
    }, 500);
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="login-page">
      <div className="login-info">
        <Link to="/" className="login-logo">GreenGrid</Link>

        <div className="login-info-content">
          <span>SMART ENERGY MANAGEMENT</span>
          <h1>Start Managing<br />Energy Smarter.</h1>
          <p>Create your GreenGrid account and take control of your energy consumption.</p>
        </div>

        <p className="login-copyright">© 2026 GreenGrid. All rights reserved.</p>
      </div>

      <div className="login-form-section">
        <div className="login-card register-card">
          <div className="login-heading">
            <h2>Create Account</h2>
            <p>Join GreenGrid and start monitoring energy smarter.</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="register-name">Full Name</label>
              <input
                id="register-name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              {errors.name && <small className="form-error">{errors.name}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email Address</label>
              <input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              {errors.email && <small className="form-error">{errors.email}</small>}
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="register-password">Password</label>
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />

              {password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className={`strength-progress ${passwordStrength.className}`}
                      style={{ width: passwordStrength.width }}
                    />
                  </div>
                  <span className={`strength-text ${passwordStrength.className}`}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}

              {errors.password && <small className="form-error">{errors.password}</small>}
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="confirm-password">Confirm Password</label>
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />

              {errors.confirmPassword && (
                <small className="form-error">{errors.confirmPassword}</small>
              )}
            </div>

            <div className="register-terms">
              <label>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to the Terms & Conditions and Privacy Policy.</span>
              </label>
              {errors.terms && <small className="form-error">{errors.terms}</small>}
            </div>

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </div>

          <div className="back-home">
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
