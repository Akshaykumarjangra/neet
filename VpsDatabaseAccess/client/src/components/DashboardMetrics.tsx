import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Calendar, Award } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  subtitle?: string;
}

function MetricCard({ title, value, icon, trend, subtitle }: MetricCardProps) {
  return (
    <Card className="glass-panel hover-elevate glow-halo">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-1">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent" data-testid={`metric-${title.toLowerCase().replace(/\s+/g, '-')}`}>{value}</div>
        {trend && (
          <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </p>
        )}
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface DashboardMetricsProps {
  questionsSolved?: number;
  accuracy?: number;
  studyStreak?: number;
  mockTestScore?: number;
}

export function DashboardMetrics({
  questionsSolved = 1847,
  accuracy = 78.5,
  studyStreak = 7,
  mockTestScore = 485,
}: DashboardMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="float-gentle">
        <MetricCard
          title="Questions Solved"
          value={questionsSolved.toLocaleString()}
          icon={<Target className="h-4 w-4" />}
          trend="+125 this week"
        />
      </div>
      <div className="float-medium">
        <MetricCard
          title="Accuracy Rate"
          value={`${accuracy}%`}
          icon={<Award className="h-4 w-4" />}
          trend="+5.2% vs last week"
        />
      </div>
      <div className="float-slow">
        <MetricCard
          title="Study Streak"
          value={`${studyStreak} days`}
          icon={<Calendar className="h-4 w-4" />}
          subtitle="Keep it up!"
        />
      </div>
      <div className="float-gentle">
        <MetricCard
          title="Latest Mock Test"
          value={`${mockTestScore}/720`}
          icon={<TrendingUp className="h-4 w-4" />}
          subtitle="67% percentile"
        />
      </div>
    </div>
  );
}
