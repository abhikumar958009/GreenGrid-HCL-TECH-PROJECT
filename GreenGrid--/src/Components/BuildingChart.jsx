import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { buildings } from "../data/energyData";

function BuildingChart() {
  return (
    <div className="building-chart-card">
      <div className="chart-header">
        <div>
          <h2>Building-wise Consumption</h2>
          <p>Energy usage by building</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={buildings}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11 }}
            interval={0}
            angle={-15}
            textAnchor="end"
            height={60}
          />
          <YAxis />
          <Tooltip
            formatter={(value) => [
              `${Number(value).toLocaleString()} kWh`,
              "Consumption",
            ]}
          />
          <Bar dataKey="consumption" fill="#2f9e7a" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BuildingChart;
