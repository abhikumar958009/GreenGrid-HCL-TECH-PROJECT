import React from "react";

function RecentConsumption({ buildings = [] }) {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });

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
            {buildings.map((building) => (
              <tr key={`${building.id}-${today}`}>
                <td>{building.name}</td>

                <td>{today}</td>

                <td>
                  {Number(building.consumption || 0).toLocaleString()} kWh
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentConsumption;
