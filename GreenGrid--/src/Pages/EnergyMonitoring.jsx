import React from "react";
import EnergyChart from "../Components/EnergyChart";
import BuildingChart from "../Components/BuildingChart";
import { buildings, energySummary } from "../data/energyData";

function EnergyMonitoring() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Energy Monitoring</h1>
        <p>Monitor current energy usage and building performance.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card energy"><div><p>Current Consumption</p><h2>820 kWh</h2><span className="positive">Live</span></div></div>
        <div className="stat-card cost"><div><p>Monthly Usage</p><h2>{energySummary.monthlyConsumption.toLocaleString()} kWh</h2><span>Current month</span></div></div>
        <div className="stat-card buildings"><div><p>Buildings Online</p><h2>{buildings.length}</h2><span>All systems active</span></div></div>
        <div className="stat-card peak"><div><p>Peak Load</p><h2>{energySummary.peakConsumption} kWh</h2><span>{energySummary.peakTime}</span></div></div>
      </div>

      <div className="charts-row">
        <EnergyChart />
        <BuildingChart />
      </div>

      <div className="buildings-card">
        <h2>Live Building Status</h2>
        <p>Current status of monitored buildings</p>
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

export default EnergyMonitoring;
