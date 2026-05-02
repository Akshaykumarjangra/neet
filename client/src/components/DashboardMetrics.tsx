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
    <Card className="glass-card hover:glow-primary hover:scale-[1.02] transition-all duration-300 border-primary/10 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-1 relative z-10">
        <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className="text-primary p-2 rounded-xl bg-primary/10 glow-primary">{icon}</div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-black italic tracking-tighter bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent" data-testid={`metric-${title.toLowerCase().replace(/\s+/g, '-')}`}>{value}</div>
        {trend && (
          <p className="text-xs text-green-500 dark:text-green-400 mt-1 flex items-center gap-1 font-bold italic">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </p>
        )}
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1 font-medium italic">{subtitle}</p>
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
        <div className="mt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-[10px] uppercase tracking-widest font-black italic hover:text-primary transition-colors"
            onClick={() => {
              const text = `I just scored ${mockTestScore}/720 in a NEET Mock Test on ZERO AI! 🚀 Join me at https://neet.zeropage.in`;
              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
            }}
          >
            Share My Score 🚀
          </Button>
        </div>
      </div>
    </div>
  );
}
