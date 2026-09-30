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

// ================= WEEKLY DATA =================

export const weeklyEnergyData = [
  { day: "Mon", consumption: 520 },
  { day: "Tue", consumption: 610 },
  { day: "Wed", consumption: 560 },
  { day: "Thu", consumption: 740 },
  { day: "Fri", consumption: 680 },
  { day: "Sat", consumption: 950 },
  { day: "Sun", consumption: 820 },
];
export const energyData = weeklyEnergyData;
// ================= MONTHLY DATA =================

export const monthlyEnergyData = [
  { day: "Week 1", consumption: 4200 },
  { day: "Week 2", consumption: 5100 },
  { day: "Week 3", consumption: 4700 },
  { day: "Week 4", consumption: 5600 },
];

// ================= YEARLY DATA =================

export const yearlyEnergyData = [
  { day: "Jan", consumption: 11200 },
  { day: "Feb", consumption: 10800 },
  { day: "Mar", consumption: 12400 },
  { day: "Apr", consumption: 11800 },
  { day: "May", consumption: 13200 },
  { day: "Jun", consumption: 14500 },
  { day: "Jul", consumption: 13900 },
  { day: "Aug", consumption: 15100 },
  { day: "Sep", consumption: 14700 },
  { day: "Oct", consumption: 15600 },
  { day: "Nov", consumption: 14900 },
  { day: "Dec", consumption: 16200 },
];

// ================= SUMMARY =================

export const energySummary = {
  monthlyConsumption: 12450,
  estimatedCost: 124500,
  monthlyChange: -8,
  peakConsumption: 950,
  peakTime: "6:00 PM",
};
