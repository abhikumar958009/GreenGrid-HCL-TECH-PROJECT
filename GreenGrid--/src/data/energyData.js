export const buildings = [
  {
    id: 1,
    name: "Main Building",
    consumption: 3980,
    efficiency: 91,
    status: "Normal",
  },
  {
    id: 2,
    name: "Computer Lab",
    consumption: 2988,
    efficiency: 78,
    status: "High",
  },
  {
    id: 3,
    name: "Library",
    consumption: 2241,
    efficiency: 89,
    status: "Normal",
  },
  {
    id: 4,
    name: "Hostel",
    consumption: 1992,
    efficiency: 84,
    status: "Normal",
  },
  {
    id: 5,
    name: "Auditorium",
    consumption: 1249,
    efficiency: 93,
    status: "Low",
  },
];

export const energyData = [
  { day: "Mon", consumption: 520 },
  { day: "Tue", consumption: 610 },
  { day: "Wed", consumption: 560 },
  { day: "Thu", consumption: 740 },
  { day: "Fri", consumption: 680 },
  { day: "Sat", consumption: 950 },
  { day: "Sun", consumption: 820 },
];

export const energySummary = {
  monthlyConsumption: 12450,
  estimatedCost: 124500,
  monthlyChange: -8,
  peakConsumption: 950,
  peakTime: "6:00 PM",
};
