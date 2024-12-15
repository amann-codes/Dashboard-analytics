"use client";

import {
  Pie,
  PieChart as RechartsPieChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PieChartProps {
  data: { time: string; value: number; fill: string }[];
}

export function PieChart({ data }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          nameKey="time"
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          stroke="#000"
          paddingAngle={0}
        >
          {data.map((entry, index) => (
            <circle key={`fill-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
