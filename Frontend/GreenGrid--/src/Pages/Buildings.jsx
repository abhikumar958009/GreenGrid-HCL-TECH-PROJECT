import React from "react";
import { buildings } from "../data/energyData";

function Buildings() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Buildings</h1>
        <p>Monitor and manage all your buildings.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card"><div><p>Total Buildings</p><h2>{buildings.length}</h2><span>Monitored locations</span></div></div>
        <div className="stat-card"><div><p>High Usage</p><h2>{buildings.filter((b) => b.status === "High").length}</h2><span>Need attention</span></div></div>
        <div className="stat-card"><div><p>Average Efficiency</p><h2>{Math.round(buildings.reduce((s,b) => s + b.efficiency, 0) / buildings.length)}%</h2><span>Across all buildings</span></div></div>
        <div className="stat-card"><div><p>Total Consumption</p><h2>{buildings.reduce((s,b) => s + b.consumption, 0).toLocaleString()} kWh</h2><span>Current data</span></div></div>
      </div>

      <div className="buildings-card">
        <h2>All Buildings</h2>
        <p>Current performance of monitored buildings</p>
        <div className="table-wrapper">
          <table className="buildings-table">
            <thead><tr><th>Building</th><th>Consumption</th><th>Efficiency</th><th>Status</th></tr></thead>
            <tbody>
              {buildings.map((building) => (
                <tr key={building.id}>
                  <td>{building.name}</td>
                  <td>{building.consumption.toLocaleString()} kWh</td>
                  <td>{building.efficiency}%</td>
                  <td><span className={`status ${building.status.toLowerCase()}`}>{building.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Buildings;
