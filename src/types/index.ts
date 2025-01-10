export type Mode = "light" | "dark";
export type Tab = "Summary" | "Chart" | "Statistics" | "Analysis" | "Settings";
export type TimeFrame = "1d" | "3d" | "1w" | "1m" | "6m" | "1y" | "max";

export type ChartData = {
  time: number;
  price: number;
};
