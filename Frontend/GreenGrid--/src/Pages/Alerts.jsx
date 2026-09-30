import React, { useState } from "react";

const initialAlerts = [
  { id: 1, type: "warning", title: "High Consumption Detected", message: "Computer Lab consumption is 28% higher than its normal average." },
  { id: 2, type: "danger", title: "Peak Load Warning", message: "Peak consumption reached 950 kWh today." },
  { id: 3, type: "info", title: "Maintenance Reminder", message: "Computer Lab meter requires inspection." },
];

function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Alerts</h1>
        <p>Review and resolve important energy notifications.</p>
      </div>

      <div className="alerts-card">
        <h2>Active Alerts</h2>
        <p>{alerts.length} notification(s) require attention.</p>

        <div className="alerts-list">
          {alerts.length === 0 ? (
            <div className="no-alerts"><h3>All clear</h3><p>No active alerts.</p></div>
          ) : (
            alerts.map((alert) => (
              <div className={`alert-item ${alert.type}`} key={alert.id}>
                <div className="alert-content">
                  <h3>{alert.title}</h3>
                  <p>{alert.message}</p>
                  <button className="resolve-btn" onClick={() => setAlerts((current) => current.filter((item) => item.id !== alert.id))}>
                    Mark Resolved
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Alerts;
