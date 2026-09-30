import React, { useEffect, useState } from "react";

import EnergyChart from "../Components/EnergyChart";
import BuildingChart from "../Components/BuildingChart";

const BUILDINGS_API = "http://127.0.0.1:8000/api/buildings/";
const READINGS_API = "http://127.0.0.1:8000/api/readings/";

function Analytics() {
  const [period, setPeriod] = useState("week");
  const [buildings, setBuildings] = useState([]);
  const [energyData, setEnergyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalyticsData = async () => {
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

        setBuildings(buildingsData);
        setEnergyData(readingsData);
      } catch (err) {
        console.error("Analytics API Error:", err);
        setError("Unable to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [period]);

  // Remove duplicate buildings
  const uniqueBuildings = buildings.filter(
    (building, index, array) =>
      array.findIndex((item) => item.name === building.name) === index,
  );

  // Average consumption
  const averageConsumption =
    energyData.length > 0
      ? Math.round(
          energyData.reduce(
            (sum, item) => sum + Number(item.consumption || 0),
            0,
          ) / energyData.length,
        )
      : 0;

  // Total consumption
  const totalConsumption = energyData.reduce(
    (sum, item) => sum + Number(item.consumption || 0),
    0,
  );

  // Peak usage
  const peakReading =
    energyData.length > 0
      ? energyData.reduce((max, item) =>
          Number(item.consumption || 0) > Number(max.consumption || 0)
            ? item
            : max,
        )
      : null;

  // Average efficiency
  const averageEfficiency =
    uniqueBuildings.length > 0
      ? Math.round(
          uniqueBuildings.reduce(
            (sum, building) => sum + Number(building.efficiency || 0),
            0,
          ) / uniqueBuildings.length,
        )
      : 0;

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Analytics</h1>
          <p>Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Analytics</h1>
          <p>{error}</p>

          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Analytics</h1>

        <p>Analyze energy consumption and identify usage patterns.</p>
      </div>

      {/* STAT CARDS */}
      <div className="stat-grid">
        <div className="stat-card">
          <div>
            <p>Average Consumption</p>

            <h2>{averageConsumption.toLocaleString()} kWh</h2>

            <span>Daily average</span>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <p>Total Consumption</p>

            <h2>{totalConsumption.toLocaleString()} kWh</h2>

            <span className="positive">Current {period}</span>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <p>Peak Usage</p>

            <h2>
              {Number(peakReading?.consumption || 0).toLocaleString()} kWh
            </h2>

            <span>{peakReading?.day || "N/A"}</span>
          </div>
        </div>

        <div className="stat-card">
          <div>
            <p>Efficiency</p>

            <h2>{averageEfficiency}%</h2>

            <span className="positive">Average</span>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-row">
        <EnergyChart
          energyData={energyData}
          period={period}
          setPeriod={setPeriod}
        />

        <BuildingChart buildings={uniqueBuildings} period={period} />
      </div>
    </div>
  );
}

export default Analytics;
