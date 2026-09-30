import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  weeklyEnergyData,
  monthlyEnergyData,
  yearlyEnergyData,
} from "../data/energyData";

function EnergyChart({ energyData = [], period, setPeriod }) {
  // ================= SELECT DATA =================

  let chartData = energyData;

  if (period === "week") {
    chartData = weeklyEnergyData;
  } else if (period === "month") {
    chartData = monthlyEnergyData;
  } else if (period === "year") {
    chartData = yearlyEnergyData;
  }

  // ================= REMOVE DUPLICATES =================

  const uniqueChartData = chartData.filter(
    (item, index, array) =>
      array.findIndex((data) => data.day === item.day) === index,
  );

  // ================= TITLES =================

  const periodTitle = {
    week: "Weekly energy usage",
    month: "Monthly energy usage",
    year: "Yearly energy usage",
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h2>Energy Consumption Trend</h2>

          <p>{periodTitle[period] || "Energy usage"}</p>
        </div>

        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={uniqueChartData}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="day"
            interval={0}
            tick={{
              fontSize: 12,
            }}
            tickMargin={8}
          />

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
