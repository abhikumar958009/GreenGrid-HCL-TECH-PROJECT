import React from "react";

function TopBuildings({ buildings = [] }) {
  const topBuildings = [...buildings]
    .sort((a, b) => Number(b.consumption || 0) - Number(a.consumption || 0))
    .slice(0, 5);

  return (
    <div className="top-buildings-card">
      <h2>Top Consuming Buildings</h2>

      <p>Buildings with highest energy consumption</p>

      <div className="building-list">
        {topBuildings.map((building, index) => (
          <div className="building-item" key={building.id}>
            <span>{index + 1}</span>

            <div>
              <h3>{building.name}</h3>

              <p>{Number(building.consumption || 0).toLocaleString()} kWh</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopBuildings;
