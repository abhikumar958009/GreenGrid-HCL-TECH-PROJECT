import React, { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { energyData } from "../data/energyData";

function EnergyChart() {
  const [period, setPeriod] = useState("This Week");

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h2>Energy Consumption Trend</h2>
          <p>Weekly energy usage</p>
        </div>

        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={energyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
            formatter={(value) => [
              `${Number(value).toLocaleString()} kWh`,
              "Consumption",
            ]}
          />
          <Line
            type="monotone"
            dataKey="consumption"
            stroke="#1d765c"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EnergyChart;
