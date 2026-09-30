import React from "react";

function BuildingsOverview({ buildings = [] }) {
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

                <td>
                  {Number(building.consumption || 0).toLocaleString()} kWh
                </td>

                <td>{Number(building.efficiency || 0)}%</td>

                <td>
                  <span
                    className={`status ${String(
                      building.status || "",
                    ).toLowerCase()}`}
                  >
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
