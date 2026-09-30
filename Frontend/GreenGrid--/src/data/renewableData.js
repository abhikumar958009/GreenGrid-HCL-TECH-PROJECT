export const renewableSources = {
  wind: [
    {
      id: "WT-01",
      name: "Wind Turbine 01",
      output: "245 kWh",
      capacity: "3.8 MW",
      efficiency: "91%",
      status: "Active",
    },
    {
      id: "WT-02",
      name: "Wind Turbine 02",
      output: "310 kWh",
      capacity: "4.2 MW",
      efficiency: "89%",
      status: "Active",
    },
  ],

  solar: [
    {
      id: "SP-01",
      name: "Solar Farm 01",
      output: "4,280 kWh",
      capacity: "5.2 MW",
      efficiency: "87%",
      status: "Active",
    },
    {
      id: "SP-02",
      name: "Solar Farm 02",
      output: "2,150 kWh",
      capacity: "3.1 MW",
      efficiency: "84%",
      status: "Active",
    },
  ],

  battery: [
    {
      id: "BAT-01",
      name: "Battery Storage 01",
      output: "1,920 kWh",
      capacity: "4.5 MWh",
      efficiency: "94%",
      status: "Charging",
    },
  ],

  substation: [
    {
      id: "SUB-01",
      name: "Main Substation",
      output: "8.4 MW",
      capacity: "12 MW",
      efficiency: "96%",
      status: "Active",
    },
  ],
};