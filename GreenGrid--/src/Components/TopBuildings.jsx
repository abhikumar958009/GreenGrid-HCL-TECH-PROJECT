import React from "react";
import { buildings } from "../data/energyData";

function TopBuildings() {
  const topBuildings = [...buildings]
    .sort((a, b) => b.consumption - a.consumption)
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
              <p>{building.consumption.toLocaleString()} kWh</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopBuildings;
