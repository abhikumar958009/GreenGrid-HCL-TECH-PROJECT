import React from "react";
import EnergyChart from "../Components/EnergyChart";
import BuildingChart from "../Components/BuildingChart";
import { buildings, energyData, energySummary } from "../data/energyData";

function Analytics() {
  const averageDaily = Math.round(
    energyData.reduce((sum, item) => sum + item.consumption, 0) / energyData.length
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Analytics</h1>
        <p>Analyze energy consumption and identify usage patterns.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card"><div><p>Average Consumption</p><h2>{averageDaily} kWh</h2><span>Daily average</span></div></div>
        <div className="stat-card"><div><p>Monthly Consumption</p><h2>{energySummary.monthlyConsumption.toLocaleString()} kWh</h2><span className="positive">↓ 8% from last month</span></div></div>
        <div className="stat-card"><div><p>Peak Usage</p><h2>{energySummary.peakConsumption} kWh</h2><span>{energySummary.peakTime}</span></div></div>
        <div className="stat-card"><div><p>Efficiency</p><h2>{Math.round(buildings.reduce((s,b) => s + b.efficiency, 0) / buildings.length)}%</h2><span className="positive">Average</span></div></div>
      </div>

      <div className="charts-row">
        <EnergyChart />
        <BuildingChart />
      </div>
    </div>
  );
}

export default Analytics;
