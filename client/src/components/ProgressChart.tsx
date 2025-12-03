import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

interface ProgressChartProps {
  data?: {
    date: string;
    score: number;
    accuracy: number;
  }[];
  title?: string;
  type?: "line" | "bar";
}

export function ProgressChart({
  data = [
    { date: "Mon", score: 75, accuracy: 70 },
    { date: "Tue", score: 82, accuracy: 78 },
    { date: "Wed", score: 78, accuracy: 72 },
    { date: "Thu", score: 85, accuracy: 80 },
    { date: "Fri", score: 90, accuracy: 85 },
    { date: "Sat", score: 88, accuracy: 82 },
    { date: "Sun", score: 92, accuracy: 88 },
  ],
  title = "Weekly Progress",
  type = "line",
}: ProgressChartProps) {
  return (
    <Card data-testid="chart-progress">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {type === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                  name="Score"
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))" }}
                  name="Accuracy %"
                />
              </LineChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="score" fill="hsl(var(--primary))" name="Score" radius={[4, 4, 0, 0]} />
                <Bar dataKey="accuracy" fill="hsl(var(--chart-2))" name="Accuracy %" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
