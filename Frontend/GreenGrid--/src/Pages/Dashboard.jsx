import React, { useEffect, useState } from "react";

import EnergyChart from "../Components/EnergyChart";
import BuildingChart from "../Components/BuildingChart";
import TodayConsumption from "../Components/TodayConsumption";
import TopBuildings from "../Components/TopBuildings";
import BuildingsOverview from "../Components/BuildingsOverview";
import RecentConsumption from "../Components/RecentConsumption";
import AlertsWidget from "../Components/AlertsWidget";

const BUILDINGS_API = "http://127.0.0.1:8000/api/buildings/";
const READINGS_API = "http://127.0.0.1:8000/api/readings/";

function Dashboard() {
  // ================= USER =================

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") || "null",
  );

  const userName = loggedInUser?.name || "Admin";

  // ================= GREETING =================

  const currentHour = new Date().getHours();

  let greeting = "Good Morning";

  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good Evening";
  }

  // ================= STATE =================

  const [period, setPeriod] = useState("week");

  const [buildings, setBuildings] = useState([]);

  const [energyData, setEnergyData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ================= FETCH DATA =================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [buildingsResponse, readingsResponse] = await Promise.all([
          fetch(BUILDINGS_API),
          fetch(`${READINGS_API}?period=${period}`),
        ]);

        if (!buildingsResponse.ok) {
          throw new Error("Failed to fetch buildings");
        }

        if (!readingsResponse.ok) {
          throw new Error("Failed to fetch energy readings");
        }

        const buildingsData = await buildingsResponse.json();
        const readingsData = await readingsResponse.json();

        setBuildings(Array.isArray(buildingsData) ? buildingsData : []);

        setEnergyData(Array.isArray(readingsData) ? readingsData : []);
      } catch (err) {
        console.error("Dashboard API Error:", err);

        setError(
          "Unable to load dashboard data. Please make sure Django server is running.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [period]);

  // ================= REMOVE DUPLICATE BUILDINGS =================

  const uniqueBuildings = buildings.filter(
    (building, index, array) =>
      array.findIndex((item) => item.name === building.name) === index,
  );

  // ================= BUILDING INSIGHTS =================

  const averageEfficiency =
    uniqueBuildings.length > 0
      ? Math.round(
          uniqueBuildings.reduce(
            (total, building) => total + Number(building.efficiency || 0),
            0,
          ) / uniqueBuildings.length,
        )
      : 0;

  const highConsumptionBuildings = uniqueBuildings.filter(
    (building) => building.status === "High",
  ).length;

  // ================= TOTAL BUILDING CONSUMPTION =================

  const totalConsumption = uniqueBuildings.reduce(
    (total, building) => total + Number(building.consumption || 0),
    0,
  );

  // ================= PEAK READING =================

  const peakReading = energyData.reduce(
    (max, item) =>
      Number(item.consumption || 0) > Number(max.consumption || 0) ? item : max,
    {
      consumption: 0,
      day: "",
    },
  );

  const peakConsumption = Number(peakReading.consumption || 0);

  // ================= ESTIMATED COST =================

  // Example electricity rate: ₹10 per kWh
  const estimatedCost = totalConsumption * 10;

  // ================= MONTHLY CHANGE =================

  const monthlyChange = 0;

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Loading Dashboard...</h1>

          <p>Fetching latest energy data...</p>
        </div>
      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>

          <p>{error}</p>

          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  // ================= MAIN =================

  return (
    <div className="dashboard">
      {/* ================= HEADER ================= */}

      <div className="dashboard-header dashboard-header-flex">
        <div>
          <h1>
            {greeting}, {userName} 👋
          </h1>

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

      {/* ================= STAT CARDS ================= */}

      <div className="stat-grid">
        {/* TOTAL CONSUMPTION */}

        <div className="stat-card energy">
          <div>
            <p>Total Consumption</p>

            <h2>{totalConsumption.toLocaleString()} kWh</h2>

            <span className="positive">
              {monthlyChange === 0
                ? "Live data"
                : `↓ ${Math.abs(monthlyChange)}% from last month`}
            </span>
          </div>
        </div>

        {/* ESTIMATED COST */}

        <div className="stat-card cost">
          <div>
            <p>Estimated Cost</p>

            <h2>₹{estimatedCost.toLocaleString()}</h2>

            <span>Based on current consumption</span>
          </div>
        </div>

        {/* ACTIVE BUILDINGS */}

        <div className="stat-card buildings">
          <div>
            <p>Active Buildings</p>

            <h2>{uniqueBuildings.length}</h2>

            <span>Total monitored buildings</span>
          </div>
        </div>

        {/* PEAK CONSUMPTION */}

        <div className="stat-card peak">
          <div>
            <p>Peak Consumption</p>

            <h2>{peakConsumption.toLocaleString()} kWh</h2>

            <span>
              {peakReading.day
                ? `Peak on ${peakReading.day}`
                : "No reading available"}
            </span>
          </div>
        </div>
      </div>

      {/* ================= INSIGHTS ================= */}

      <div className="dashboard-insights">
        <div className="insight-card">
          <div className="insight-icon">⚡</div>

          <div>
            <span>Current Usage</span>

            <strong>{totalConsumption.toLocaleString()} kWh</strong>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon">🌱</div>

          <div>
            <span>Average Efficiency</span>

            <strong>{averageEfficiency}%</strong>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon">🏢</div>

          <div>
            <span>Buildings Monitored</span>

            <strong>{uniqueBuildings.length}</strong>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon alert">⚠</div>

          <div>
            <span>High Consumption</span>

            <strong>{highConsumptionBuildings}</strong>
          </div>
        </div>
      </div>

      {/* ================= CHARTS ================= */}

      <div className="charts-row">
        <EnergyChart
          energyData={energyData}
          period={period}
          setPeriod={setPeriod}
        />

        <BuildingChart buildings={uniqueBuildings} period={period} />
      </div>

      {/* ================= LOWER SECTION ================= */}

      <div className="lower-row">
        <TodayConsumption energyData={energyData} period={period} />

        <TopBuildings buildings={uniqueBuildings} />
      </div>

      {/* ================= ALERTS ================= */}

      <AlertsWidget />

      {/* ================= BUILDINGS ================= */}

      <BuildingsOverview buildings={uniqueBuildings} />

      {/* ================= RECENT CONSUMPTION ================= */}

      <RecentConsumption buildings={uniqueBuildings} />
    </div>
  );
}

export default Dashboard;
