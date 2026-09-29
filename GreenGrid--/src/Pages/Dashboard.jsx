import React from "react";
import EnergyChart from "../Components/EnergyChart";
import BuildingChart from "../Components/BuildingChart";
import TodayConsumption from "../Components/TodayConsumption";
import TopBuildings from "../Components/TopBuildings";
import BuildingsOverview from "../Components/BuildingsOverview";
import RecentConsumption from "../Components/RecentConsumption";
import AlertsWidget from "../Components/AlertsWidget";
import { buildings, energySummary } from "../data/energyData";

function Dashboard() {
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") || "null"
  );

  const userName = loggedInUser?.name || "Admin";
  const currentHour = new Date().getHours();

  let greeting = "Good Morning";
  if (currentHour >= 12 && currentHour < 17) greeting = "Good Afternoon";
  else if (currentHour >= 17) greeting = "Good Evening";

  const averageEfficiency =
    buildings.length > 0
      ? Math.round(
          buildings.reduce((total, building) => total + building.efficiency, 0) /
            buildings.length
        )
      : 0;

  const highConsumptionBuildings = buildings.filter(
    (building) => building.status === "High"
  ).length;

  return (
    <div className="dashboard">
      <div className="dashboard-header dashboard-header-flex">
        <div>
          <h1>{greeting}, {userName} 👋</h1>
          <p>Monitor, analyze and manage your energy consumption.</p>
        </div>

        <div className="dashboard-date">
          <span>Dashboard</span>
          <strong>
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </strong>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card energy">
          <div>
            <p>Total Consumption</p>
            <h2>{energySummary.monthlyConsumption.toLocaleString()} kWh</h2>
            <span className="positive">
              ↓ {Math.abs(energySummary.monthlyChange)}% from last month
            </span>
          </div>
        </div>

        <div className="stat-card cost">
          <div>
            <p>Estimated Cost</p>
            <h2>₹{energySummary.estimatedCost.toLocaleString()}</h2>
            <span className="negative">↑ 12% from last month</span>
          </div>
        </div>

        <div className="stat-card buildings">
          <div>
            <p>Active Buildings</p>
            <h2>{buildings.length}</h2>
            <span>Total monitored buildings</span>
          </div>
        </div>

        <div className="stat-card peak">
          <div>
            <p>Peak Consumption</p>
            <h2>{energySummary.peakConsumption.toLocaleString()} kWh</h2>
            <span>Today at {energySummary.peakTime}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-insights">
        <div className="insight-card"><div className="insight-icon">⚡</div><div><span>Monthly Usage</span><strong>{energySummary.monthlyConsumption.toLocaleString()} kWh</strong></div></div>
        <div className="insight-card"><div className="insight-icon">🌱</div><div><span>Average Efficiency</span><strong>{averageEfficiency}%</strong></div></div>
        <div className="insight-card"><div className="insight-icon">🏢</div><div><span>Buildings Monitored</span><strong>{buildings.length}</strong></div></div>
        <div className="insight-card"><div className="insight-icon alert">⚠</div><div><span>High Consumption</span><strong>{highConsumptionBuildings}</strong></div></div>
      </div>

      <div className="charts-row">
        <EnergyChart />
        <BuildingChart />
      </div>

      <div className="lower-row">
        <TodayConsumption />
        <TopBuildings />
      </div>

      <AlertsWidget />
      <BuildingsOverview />
      <RecentConsumption />
    </div>
  );
}

export default Dashboard;
