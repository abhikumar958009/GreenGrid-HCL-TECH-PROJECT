import React, { useEffect, useState } from "react";

import EnergyChart from "../Components/EnergyChart";
import BuildingChart from "../Components/BuildingChart";

const BUILDINGS_API = "http://127.0.0.1:8000/api/buildings/";

const READINGS_API = "http://127.0.0.1:8000/api/readings/";

function EnergyMonitoring() {
  const [buildings, setBuildings] = useState([]);

  const [energyData, setEnergyData] = useState([]);

  const [period, setPeriod] = useState("week");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ================= FETCH DATA =================

  const fetchEnergyData = async () => {
    try {
      setLoading(true);

      setError("");

      const [buildingsResponse, readingsResponse] = await Promise.all([
        fetch(BUILDINGS_API),
        fetch(READINGS_API),
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
      console.error(err);

      setError("Unable to load energy monitoring data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnergyData();
  }, []);

  // ================= SUMMARY =================

  // Selected period ka data
  const selectedEnergyData = energyData.filter(
    (item) => item.period === period,
  );

  // Selected period ka total consumption
  const totalConsumption = selectedEnergyData.reduce(
    (total, item) => total + Number(item.consumption || 0),
    0,
  );

  // Selected period ka peak reading
  const peakReading = selectedEnergyData.reduce(
    (max, item) =>
      Number(item.consumption || 0) > Number(max.consumption || 0) ? item : max,
    {
      consumption: 0,
      day: "",
    },
  );

  const peakConsumption = Number(peakReading.consumption || 0);

  // Selected period ki latest reading
  const currentConsumption =
    selectedEnergyData.length > 0
      ? Number(
          selectedEnergyData[selectedEnergyData.length - 1].consumption || 0,
        )
      : 0;

  // Period label
  const periodLabels = {
    week: "This week",
    month: "This month",
    year: "This year",
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Energy Monitoring</h1>

          <p>Loading energy monitoring data...</p>
        </div>
      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Energy Monitoring</h1>

          <p>{error}</p>

          <button onClick={fetchEnergyData}>Retry</button>
        </div>
      </div>
    );
  }

  // ================= MAIN =================

  return (
    <div className="dashboard">
      {/* HEADER */}

      <div className="dashboard-header">
        <h1>Energy Monitoring</h1>

        <p>Monitor current energy usage and building performance.</p>
      </div>

      {/* STATS */}

      <div className="stat-grid">
        {/* CURRENT CONSUMPTION */}

        <div className="stat-card energy">
          <div>
            <p>Current Consumption</p>

            <h2>{currentConsumption.toLocaleString()} kWh</h2>

            <span className="positive">Live</span>
          </div>
        </div>

        {/* TOTAL USAGE */}

        <div className="stat-card cost">
          <div>
            <p>Total Usage</p>

            <h2>{totalConsumption.toLocaleString()} kWh</h2>

            <span>{periodLabels[period]}</span>
          </div>
        </div>

        {/* BUILDINGS */}

        <div className="stat-card buildings">
          <div>
            <p>Buildings Online</p>

            <h2>{buildings.length}</h2>

            <span>All systems active</span>
          </div>
        </div>

        {/* PEAK LOAD */}

        <div className="stat-card peak">
          <div>
            <p>Peak Load</p>

            <h2>{peakConsumption.toLocaleString()} kWh</h2>

            <span>{peakReading.day || "N/A"}</span>
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

        <BuildingChart buildings={buildings} />
      </div>

      {/* BUILDINGS */}

      <div className="buildings-card">
        <h2>Live Building Status</h2>

        <p>Current status of monitored buildings</p>

        <div className="table-wrapper">
          <table className="buildings-table">
            <thead>
              <tr>
                <th>Building</th>

                <th>Consumption</th>

                <th>Efficiency</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {buildings.map((building) => (
                <tr key={building.id}>
                  <td>{building.name}</td>

                  <td>
                    {Number(building.consumption || 0).toLocaleString()} kWh
                  </td>

                  <td>{building.efficiency}%</td>

                  <td>
                    <span className={`status ${building.status.toLowerCase()}`}>
                      {building.status}
                    </span>
                  </td>
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
