import { NextResponse } from "next/server";

const handler = async () => {
  const data = {
    daily: {
      userGrowth: [
        { time: "2024-12-01", value: 120 },
        { time: "2024-12-02", value: 180 },
        { time: "2024-12-03", value: 250 },
        { time: "2024-12-04", value: 300 },
        { time: "2024-12-05", value: 400 },
      ],
      revenue: [
        { time: "2024-12-01", value: 500 },
        { time: "2024-12-02", value: 800 },
        { time: "2024-12-03", value: 1200 },
        { time: "2024-12-04", value: 1500 },
        { time: "2024-12-05", value: 2000 },
      ],
      engagement: [
        { time: "2024-12-01", value: 70 },
        { time: "2024-12-02", value: 100 },
        { time: "2024-12-03", value: 150 },
        { time: "2024-12-04", value: 200 },
        { time: "2024-12-05", value: 300 },
      ],
      pieChartData: [
        { time: "North America", value: 10000, fill: "hsl(var(--chart-1))" },
        { time: "Europe", value: 7000, fill: "hsl(var(--chart-2))" },
        { time: "Asia", value: 5000, fill: "hsl(var(--chart-3))" },
        { time: "South America", value: 3000, fill: "hsl(var(--chart-4))" },
      ],
    },
    weekly: {
      userGrowth: [
        { time: "Week 1", value: 1000 },
        { time: "Week 2", value: 2000 },
        { time: "Week 3", value: 3500 },
        { time: "Week 4", value: 5000 },
      ],
      revenue: [
        { time: "Week 1", value: 5000 },
        { time: "Week 2", value: 10000 },
        { time: "Week 3", value: 17000 },
        { time: "Week 4", value: 25000 },
      ],
      engagement: [
        { time: "Week 1", value: 300 },
        { time: "Week 2", value: 700 },
        { time: "Week 3", value: 1200 },
        { time: "Week 4", value: 2000 },
      ],
      pieChartData: [
        { time: "North America", value: 15000, fill: "hsl(var(--chart-1))" },
        { time: "Europe", value: 12000, fill: "hsl(var(--chart-2))" },
        { time: "Asia", value: 9000, fill: "hsl(var(--chart-3))" },
        { time: "South America", value: 6000, fill: "hsl(var(--chart-4))" },
      ],
    },
    monthly: {
      userGrowth: [
        { time: "January", value: 5000 },
        { time: "February", value: 8000 },
        { time: "March", value: 15000 },
        { time: "April", value: 25000 },
      ],
      revenue: [
        { time: "January", value: 20000 },
        { time: "February", value: 35000 },
        { time: "March", value: 60000 },
        { time: "April", value: 100000 },
      ],
      engagement: [
        { time: "January", value: 1000 },
        { time: "February", value: 3000 },
        { time: "March", value: 7000 },
        { time: "April", value: 15000 },
      ],
      pieChartData: [
        { time: "North America", value: 30000, fill: "hsl(var(--chart-1))" },
        { time: "Europe", value: 25000, fill: "hsl(var(--chart-2))" },
        { time: "Asia", value: 20000, fill: "hsl(var(--chart-3))" },
        { time: "South America", value: 15000, fill: "hsl(var(--chart-4))" },
      ],
    },
  };

  return NextResponse.json(data, { status: 200 });
};

export { handler as GET };
