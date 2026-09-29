import React, { useState } from "react";

const initialAlerts = [
  {
    id: 1,
    type: "warning",
    title: "High Consumption Detected",
    message: "Computer Lab consumption is 28% higher than its normal average.",
  },
  {
    id: 2,
    type: "danger",
    title: "Peak Load Warning",
    message: "Peak consumption reached 950 kWh today.",
  },
  {
    id: 3,
    type: "info",
    title: "Maintenance Reminder",
    message: "Computer Lab meter requires inspection.",
  },
];

function AlertsWidget() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const resolveAlert = (id) => {
    setAlerts((current) => current.filter((alert) => alert.id !== id));
  };

  return (
    <div className="alerts-card">
      <h2>Alerts & Notifications</h2>
      <p>Important energy updates</p>

      <div className="alerts-list">
        {alerts.length === 0 ? (
          <div className="no-alerts">
            <h3>All clear</h3>
            <p>No unresolved alerts right now.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div className={`alert-item ${alert.type}`} key={alert.id}>
              <div className="alert-content">
                <h3>{alert.title}</h3>
                <p>{alert.message}</p>
                <button
                  type="button"
                  className="resolve-btn"
                  onClick={() => resolveAlert(alert.id)}
                >
                  Mark Resolved
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AlertsWidget;
