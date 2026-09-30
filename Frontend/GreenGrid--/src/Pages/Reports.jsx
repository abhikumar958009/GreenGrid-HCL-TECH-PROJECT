import React, { useState } from "react";
import { energySummary } from "../data/energyData";

function Reports() {
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    ["Monthly Energy Report", "September 2026", `${energySummary.monthlyConsumption.toLocaleString()} kWh`],
    ["Monthly Energy Report", "August 2026", "13,520 kWh"],
    ["Weekly Consumption Report", "Sep 21 - Sep 27", "3,820 kWh"],
    ["Building Performance Report", "September 2026", "All Buildings"],
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Reports</h1>
        <p>View and manage your energy consumption reports.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card"><div><p>Monthly Report</p><h2>{energySummary.monthlyConsumption.toLocaleString()} kWh</h2><span>September 2026</span></div></div>
        <div className="stat-card"><div><p>Energy Cost</p><h2>₹{energySummary.estimatedCost.toLocaleString()}</h2><span className="positive">↓ 8% from last month</span></div></div>
        <div className="stat-card"><div><p>CO₂ Saved</p><h2>2.8 Tons</h2><span>This month</span></div></div>
        <div className="stat-card"><div><p>Efficiency</p><h2>87%</h2><span className="positive">Average</span></div></div>
      </div>

      <div className="recent-card">
        <h2>Available Reports</h2>
        <p>Review your generated energy reports.</p>

        <div className="table-wrapper">
          <table className="recent-table">
            <thead><tr><th>Report</th><th>Period</th><th>Consumption</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {reports.map(([name, period, consumption]) => (
                <tr key={`${name}-${period}`}>
                  <td>{name}</td>
                  <td>{period}</td>
                  <td>{consumption}</td>
                  <td><span className="status normal">Ready</span></td>
                  <td><button className="report-btn" onClick={() => setSelectedReport({ name, period, consumption })}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedReport && (
          <div className="report-details">
            <h3>{selectedReport.name}</h3>
            <p>Period: {selectedReport.period} · Consumption: {selectedReport.consumption}</p>
            <button className="report-btn" onClick={() => window.print()}>Print Report</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;
