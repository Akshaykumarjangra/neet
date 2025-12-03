import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { QuickNavigationBar } from "@/components/QuickNavigationBar";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useToast } from "@/hooks/use-toast";

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  xpReward: number;
  rarity: string;
  unlocked: boolean;
  unlockedAt: string | null;
}

const rarityColors = {
  common: "from-gray-400 to-gray-600",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-yellow-400 to-orange-600",
};

const rarityGlows = {
  common: "shadow-gray-400/50",
  rare: "shadow-blue-400/50",
  epic: "shadow-purple-400/50",
  legendary: "shadow-yellow-400/50",
};

export default function Achievements() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: achievements = [], isLoading } = useQuery<Achievement[]>({
    queryKey: ['/api/game/achievements'],
  });

  const checkAchievementsMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/game/achievements/check'),
    onSuccess: (data: any) => {
      if (data.newlyUnlocked?.length > 0) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        data.newlyUnlocked.forEach((achievement: any) => {
          toast({
            title: "Achievement Unlocked!",
            description: `${achievement.name} - +${achievement.xpReward} XP`,
          });
        });
        
        queryClient.invalidateQueries({ queryKey: ['/api/game/achievements'] });
        queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      }
    },
  });

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName] || Icons.Award;
    return Icon;
  };

  const categories = Array.from(new Set(achievements.map(a => a.category)));
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Loading Achievements...
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 gradient-mesh-bg">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Achievements
            </h1>
            <p className="text-muted-foreground">
              {unlockedCount} / {achievements.length} Unlocked
            </p>
          </div>
          
          <Button 
            onClick={() => checkAchievementsMutation.mutate()}
            disabled={checkAchievementsMutation.isPending}
            className="bg-gradient-to-r from-yellow-400 to-orange-500"
            data-testid="button-check-achievements"
          >
            {checkAchievementsMutation.isPending ? "Checking..." : "Check Progress"}
          </Button>
        </div>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.TrendingUp className="h-5 w-5" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Unlocked Achievements</span>
                <span className="font-bold">{unlockedCount} / {achievements.length}</span>
              </div>
              <Progress value={(unlockedCount / achievements.length) * 100} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="glass-panel">
            <TabsTrigger value="all" data-testid="tab-all-achievements">
              All ({achievements.length})
            </TabsTrigger>
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                data-testid={`tab-${category}-achievements`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)} ({achievements.filter(a => a.category === category).length})
              </TabsTrigger>
            ))}
            <TabsTrigger value="unlocked" data-testid="tab-unlocked-achievements">
              Unlocked ({unlockedCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = getIcon(achievement.icon);
                const rarityColor = rarityColors[achievement.rarity as keyof typeof rarityColors] || rarityColors.common;
                const rarityGlow = rarityGlows[achievement.rarity as keyof typeof rarityGlows] || rarityGlows.common;

                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    data-testid={`achievement-${achievement.id}`}
                  >
                    <Card className={`glass-panel relative overflow-hidden ${achievement.unlocked ? `shadow-lg ${rarityGlow}` : 'opacity-60'}`}>
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${rarityColor}`} />
                      
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${rarityColor} ${achievement.unlocked ? '' : 'grayscale'}`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex flex-col gap-1 items-end">
                            <Badge 
                              variant={achievement.unlocked ? "default" : "outline"}
                              className={`${achievement.unlocked ? 'bg-gradient-to-r from-yellow-400 to-orange-500 border-none' : ''}`}
                            >
                              +{achievement.xpReward} XP
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {achievement.rarity}
                            </Badge>
                          </div>
                        </div>
                        
                        <CardTitle className="flex items-center gap-2 mt-3">
                          {achievement.name}
                          {achievement.unlocked && (
                            <Icons.CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </CardHeader>
                      
                      {achievement.unlocked && achievement.unlockedAt && (
                        <CardContent className="pt-0">
                          <p className="text-xs text-muted-foreground">
                            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </p>
                        </CardContent>
                      )}
                      
                      {!achievement.unlocked && (
                        <CardContent className="pt-0">
                          <Badge variant="outline" className="text-xs">
                            <Icons.Lock className="h-3 w-3 mr-1" />
                            Locked
                          </Badge>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {categories.map(category => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements
                  .filter(a => a.category === category)
                  .map((achievement, index) => {
                    const Icon = getIcon(achievement.icon);
                    const rarityColor = rarityColors[achievement.rarity as keyof typeof rarityColors] || rarityColors.common;
                    const rarityGlow = rarityGlows[achievement.rarity as keyof typeof rarityGlows] || rarityGlows.common;

                    return (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        data-testid={`achievement-${achievement.id}`}
                      >
                        <Card className={`glass-panel relative overflow-hidden ${achievement.unlocked ? `shadow-lg ${rarityGlow}` : 'opacity-60'}`}>
                          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${rarityColor}`} />
                          
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className={`p-3 rounded-lg bg-gradient-to-br ${rarityColor} ${achievement.unlocked ? '' : 'grayscale'}`}>
                                <Icon className="h-6 w-6 text-white" />
                              </div>
                              <div className="flex flex-col gap-1 items-end">
                                <Badge 
                                  variant={achievement.unlocked ? "default" : "outline"}
                                  className={`${achievement.unlocked ? 'bg-gradient-to-r from-yellow-400 to-orange-500 border-none' : ''}`}
                                >
                                  +{achievement.xpReward} XP
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {achievement.rarity}
                                </Badge>
                              </div>
                            </div>
                            
                            <CardTitle className="flex items-center gap-2 mt-3">
                              {achievement.name}
                              {achievement.unlocked && (
                                <Icons.CheckCircle2 className="h-4 w-4 text-green-500" />
                              )}
                            </CardTitle>
                            <CardDescription>{achievement.description}</CardDescription>
                          </CardHeader>
                          
                          {achievement.unlocked && achievement.unlockedAt && (
                            <CardContent className="pt-0">
                              <p className="text-xs text-muted-foreground">
                                Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                              </p>
                            </CardContent>
                          )}
                          
                          {!achievement.unlocked && (
                            <CardContent className="pt-0">
                              <Badge variant="outline" className="text-xs">
                                <Icons.Lock className="h-3 w-3 mr-1" />
                                Locked
                              </Badge>
                            </CardContent>
                          )}
                        </Card>
                      </motion.div>
                    );
                  })}
              </div>
            </TabsContent>
          ))}

          <TabsContent value="unlocked" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements
                .filter(a => a.unlocked)
                .map((achievement, index) => {
                  const Icon = getIcon(achievement.icon);
                  const rarityColor = rarityColors[achievement.rarity as keyof typeof rarityColors] || rarityColors.common;
                  const rarityGlow = rarityGlows[achievement.rarity as keyof typeof rarityGlows] || rarityGlows.common;

                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      data-testid={`achievement-${achievement.id}`}
                    >
                      <Card className={`glass-panel relative overflow-hidden shadow-lg ${rarityGlow}`}>
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${rarityColor}`} />
                        
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${rarityColor}`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex flex-col gap-1 items-end">
                              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 border-none">
                                +{achievement.xpReward} XP
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {achievement.rarity}
                              </Badge>
                            </div>
                          </div>
                          
                          <CardTitle className="flex items-center gap-2 mt-3">
                            {achievement.name}
                            <Icons.CheckCircle2 className="h-4 w-4 text-green-500" />
                          </CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          <p className="text-xs text-muted-foreground">
                            Unlocked {new Date(achievement.unlockedAt!).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Navigation */}
        <div className="mt-12 pt-8 border-t">
          <QuickNavigationBar currentPath="/achievements" />
        </div>
      </div>
    </div>
  );
}
