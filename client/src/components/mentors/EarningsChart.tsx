import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp } from "lucide-react";

interface EarningsChartProps {
    data: { date: string; amount: number }[];
    totalEarnings: number;
}

export function EarningsChart({ data, totalEarnings }: EarningsChartProps) {
    const formatINR = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

    return (
        <Card className="glass-panel col-span-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-primary" />
                        Earnings Overview
                    </CardTitle>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-200">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Total: {formatINR.format(totalEarnings / 100)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12, fill: '#888' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: '#888' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(val) => `₹${val / 100}`}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                formatter={(val: number) => [`₹${val / 100}`, 'Earnings']}
                            />
                            <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorEarnings)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
