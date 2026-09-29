import React from "react";
import { buildings } from "../data/energyData";

function RecentConsumption() {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });

  const recentData = buildings.map((building) => ({
    building: building.name,
    date: today,
    consumption: Math.round(building.consumption / 7),
  }));

  return (
    <div className="recent-card">
      <h2>Recent Consumption</h2>
      <p>Latest energy consumption records</p>

      <div className="table-wrapper">
        <table className="recent-table">
          <thead>
            <tr>
              <th>Building</th>
              <th>Date</th>
              <th>Consumption</th>
            </tr>
          </thead>

          <tbody>
            {recentData.map((item) => (
              <tr key={`${item.building}-${item.date}`}>
                <td>{item.building}</td>
                <td>{item.date}</td>
                <td>{item.consumption.toLocaleString()} kWh</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentConsumption;
