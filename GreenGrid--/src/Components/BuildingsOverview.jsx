import React from "react";
import { buildings } from "../data/energyData";

function BuildingsOverview() {
  return (
    <div className="buildings-card">
      <h2>Buildings Overview</h2>
      <p>Current energy status of monitored buildings</p>

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
                <td>{building.consumption.toLocaleString()} kWh</td>
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
  );
}

export default BuildingsOverview;
