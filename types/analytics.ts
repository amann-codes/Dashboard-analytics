export type Data = {
  userGrowth: { time: string; value: number }[];
  revenue: { time: string; value: number }[];
  engagement: { time: string; value: number }[];
  pieChartData: { time: string; value: number; fill: string }[];
};

export type TimeFrame = "daily" | "weekly" | "monthly";
export type Region = 'north' | 'south' | 'east' | 'west';