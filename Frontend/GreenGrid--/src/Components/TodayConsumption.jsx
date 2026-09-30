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

function TodayConsumption({ energyData = [], period = "week" }) {
  const uniqueData = energyData.filter(
    (item, index, array) =>
      array.findIndex((reading) => reading.day === item.day) === index,
  );

  const getTitle = () => {
    if (period === "month") return "Monthly Energy Consumption";
    if (period === "year") return "Yearly Energy Consumption";
    return "Weekly Energy Consumption";
  };

  return (
    <div className="today-consumption-card">
      <h2>{getTitle()}</h2>

      <p>Energy usage from available data</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={uniqueData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
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
