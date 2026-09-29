import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      <header className="home-navbar">
        <Link to="/" className="home-logo">
          GreenGrid
        </Link>

        <nav>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <Link to="/login" className="home-login-btn">Login</Link>
          <Link to="/register" className="home-register-btn">Get Started</Link>
        </nav>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-content">
          <span className="hero-badge">SMART ENERGY MANAGEMENT</span>

          <h1>
            Manage Energy.
            <br />
            <span>Build a Greener Future.</span>
          </h1>

          <p>
            GreenGrid helps organizations monitor, analyze and manage their
            energy consumption through a simple, intelligent and centralized
            dashboard.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">Get Started</Link>
            <a href="#features" className="secondary-btn">Explore Features</a>
          </div>

          <div className="hero-trust">
            <div><strong>5+</strong><span>Buildings</span></div>
            <div><strong>12K+</strong><span>kWh Monitored</span></div>
            <div><strong>87%</strong><span>Avg. Efficiency</span></div>
          </div>
        </div>

        <div className="hero-dashboard-card">
          <div className="mini-card-header">
            <div>
              <span>Energy Overview</span>
              <h3>12,450 kWh</h3>
            </div>
            <span className="mini-status">● Live</span>
          </div>

          <div className="mini-chart">
            {[45, 62, 52, 78, 68, 92, 84].map((height, index) => (
              <div
                key={index}
                className="chart-bar"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>

          <div className="mini-stats">
            <div><span>Efficiency</span><strong>87%</strong></div>
            <div><span>Buildings</span><strong>5</strong></div>
            <div><span>Saved</span><strong>8%</strong></div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <span>FEATURES</span>
          <h2>Everything you need to manage energy</h2>
          <p>Monitor your energy usage, identify inefficiencies and make better decisions with real-time insights.</p>
        </div>

        <div className="features-grid">
          {[
            ["⚡", "Energy Monitoring", "Track energy consumption across your buildings in one place."],
            ["📊", "Smart Analytics", "Analyze consumption patterns and identify areas for improvement."],
            ["🏢", "Building Management", "Monitor individual building performance and efficiency."],
            ["🔔", "Smart Alerts", "Get notified about high consumption and important events."],
            ["📄", "Energy Reports", "Review detailed consumption reports and trends."],
            ["🌱", "Sustainability", "Reduce energy waste and build a more sustainable future."],
          ].map(([icon, title, text]) => (
            <div className="feature-card" key={title}>
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="how-section">
        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>Manage your energy in three simple steps</h2>
          <p>GreenGrid turns energy data into actionable information.</p>
        </div>

        <div className="steps-grid">
          {[
            ["01", "Monitor", "Collect and monitor energy consumption across your buildings."],
            ["02", "Analyze", "Analyze consumption patterns, efficiency and performance."],
            ["03", "Optimize", "Use insights to reduce waste and improve efficiency."],
          ].map(([number, title, text]) => (
            <div className="step-card" key={number}>
              <div className="step-number">{number}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-content">
          <span>ABOUT GREENGRID</span>
          <h2>Smarter energy management<br />for a sustainable tomorrow.</h2>
          <p>
            GreenGrid provides a centralized platform for monitoring energy
            consumption across multiple buildings. It transforms energy data
            into useful insights so organizations can understand consumption
            and improve efficiency.
          </p>

          <div className="about-stats">
            <div><strong>12,450+</strong><span>kWh Monitored</span></div>
            <div><strong>5</strong><span>Buildings</span></div>
            <div><strong>87%</strong><span>Efficiency</span></div>
          </div>

          <Link to="/register" className="primary-btn">Start Monitoring</Link>
        </div>
      </section>

      <section className="cta-section">
        <div>
          <span>GET STARTED TODAY</span>
          <h2>Ready to make your energy smarter?</h2>
          <p>Start monitoring your energy consumption with GreenGrid.</p>
        </div>

        <div className="cta-buttons">
          <Link to="/register" className="primary-btn">Create Account</Link>
          <Link to="/login" className="secondary-btn">Login</Link>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <div>
            <h2>GreenGrid</h2>
            <p>Smart energy monitoring and management platform.</p>
          </div>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <Link to="/login">Login</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 GreenGrid. All rights reserved.</span>
          <span>Smart Energy Management</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
