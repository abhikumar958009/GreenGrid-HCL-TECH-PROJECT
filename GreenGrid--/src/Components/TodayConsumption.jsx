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
import { energyData } from "../data/energyData";

function TodayConsumption() {
  return (
    <div className="today-consumption-card">
      <h2>Energy Consumption</h2>
      <p>Energy usage from available data</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={energyData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
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

export default TodayConsumption;
