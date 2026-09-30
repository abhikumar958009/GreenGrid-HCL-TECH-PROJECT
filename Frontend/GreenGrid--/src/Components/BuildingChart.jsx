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

function BuildingChart({ buildings = [], period = "week" }) {
  // Period ke according consumption field select karega
  const consumptionField = {
    week: "week_consumption",
    month: "month_consumption",
    year: "year_consumption",
  };

  const selectedField = consumptionField[period] || "week_consumption";

  // Chart ke liye data prepare
  const chartData = buildings.map((building) => ({
    ...building,
    chartConsumption: Number(building[selectedField] || 0),
  }));

  // Long building names ko short display name denge
  const formatBuildingName = (name) => {
    if (!name) return "";

    if (name.length > 12) {
      return name.substring(0, 12) + "...";
    }

    return name;
  };

  const periodTitle = {
    week: "Energy usage this week",
    month: "Energy usage this month",
    year: "Energy usage this year",
  };

  return (
    <div className="building-chart-card">
      <div className="chart-header">
        <div>
          <h2>Building-wise Consumption</h2>

          <p>{periodTitle[period] || "Energy usage by building"}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 35,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            tickFormatter={formatBuildingName}
            tick={{
              fontSize: 10,
            }}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={70}
          />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              `${Number(value).toLocaleString()} kWh`,
              "Consumption",
            ]}
          />

          <Bar
            dataKey="chartConsumption"
            fill="#2f9e7a"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BuildingChart;
