import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useGamification } from "@/hooks/useGamification";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow, format } from "date-fns";
import { useLocation } from "wouter";
import {
  User,
  Mail,
  Calendar,
  Clock,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Trophy,
  Star,
  Zap,
  Flame,
  Shield,
  Crown,
  Medal,
  Atom,
  Leaf,
  Settings,
  Edit,
  Bell,
  Lock,
  LogOut,
  ChevronRight,
  FileText,
  Layers,
  GraduationCap,
  Loader2,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";

interface SubjectProgress {
  subject: string;
  progress: number;
  chaptersCompleted: number;
  totalChapters: number;
  color: string;
  icon: React.ElementType;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  earned: boolean;
  earnedDate?: Date;
  color: string;
}

interface RecentActivity {
  id: string;
  type: "chapter" | "question" | "test" | "flashcard";
  title: string;
  subject: string;
  timestamp: Date;
}

export default function Profile() {
  const { user, isLoading: authLoading, forceRefreshAuth } = useAuth();
  const { points, level, streak } = useGamification();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user?.mustChangePassword) {
      setShowPasswordDialog(true);
    }
  }, [user?.mustChangePassword]);

  useEffect(() => {
    if (user?.mustChangePassword && !showPasswordDialog) {
      setShowPasswordDialog(true);
    }
  }, [user?.mustChangePassword, showPasswordDialog]);

  const changePasswordMutation = useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to change password");
      }
      return response.json();
    },
    onSuccess: async () => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
      
      try {
        const freshData = await forceRefreshAuth();
        
        if (freshData.user?.mustChangePassword) {
          setPasswordError("Password was changed but session still requires password change. Please try again.");
          return;
        }
        
        toast({
          title: "Password Changed",
          description: "Your password has been updated successfully.",
        });
        setShowPasswordDialog(false);
      } catch (error) {
        setPasswordError("Password was changed but session refresh failed. Please log in again.");
      }
    },
    onError: (error: Error) => {
      setPasswordError(error.message);
    },
  });

  const handlePasswordSubmit = () => {
    setPasswordError("");
    
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    changePasswordMutation.mutate({ currentPassword, newPassword });
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      queryClient.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const { data: userStats } = useQuery<{
    totalAttempts: number;
    correctAnswers: number;
    accuracy: number;
  }>({
    queryKey: ["/api/stats/user", user?.id],
    enabled: !!user?.id,
  });

  const { data: achievementsData } = useQuery<Array<{
    id: number;
    name: string;
    description: string;
    icon: string;
    earnedAt: string;
  }>>({
    queryKey: ["/api/game/achievements", user?.id],
    enabled: !!user?.id,
  });

  const subjectProgress: SubjectProgress[] = [
    {
      subject: "Physics",
      progress: 42,
      chaptersCompleted: 10,
      totalChapters: 23,
      color: "from-blue-500 to-cyan-500",
      icon: Atom,
    },
    {
      subject: "Chemistry",
      progress: 35,
      chaptersCompleted: 14,
      totalChapters: 40,
      color: "from-purple-500 to-pink-500",
      icon: Flame,
    },
    {
      subject: "Biology",
      progress: 28,
      chaptersCompleted: 11,
      totalChapters: 38,
      color: "from-emerald-500 to-green-500",
      icon: Leaf,
    },
  ];

  const achievements: Achievement[] = [
    {
      id: "1",
      name: "First Steps",
      description: "Complete your first chapter",
      icon: Star,
      earned: true,
      earnedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      color: "text-yellow-500",
    },
    {
      id: "2",
      name: "Streak Master",
      description: "Maintain a 7-day study streak",
      icon: Flame,
      earned: streak >= 7,
      earnedDate: streak >= 7 ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) : undefined,
      color: "text-orange-500",
    },
    {
      id: "3",
      name: "Quiz Champion",
      description: "Score 100% on a practice quiz",
      icon: Trophy,
      earned: true,
      earnedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      color: "text-amber-500",
    },
    {
      id: "4",
      name: "Knowledge Seeker",
      description: "Complete 50 questions",
      icon: BookOpen,
      earned: (userStats?.totalAttempts ?? 0) >= 50,
      earnedDate: (userStats?.totalAttempts ?? 0) >= 50 ? new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) : undefined,
      color: "text-blue-500",
    },
    {
      id: "5",
      name: "Accuracy Expert",
      description: "Maintain 80% accuracy",
      icon: Target,
      earned: (userStats?.accuracy ?? 0) >= 80,
      color: "text-green-500",
    },
    {
      id: "6",
      name: "Elite Scholar",
      description: "Reach level 10",
      icon: Crown,
      earned: level >= 10,
      color: "text-purple-500",
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "chapter",
      title: "Laws of Motion",
      subject: "Physics",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "2",
      type: "question",
      title: "Completed 15 MCQs",
      subject: "Chemistry",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: "3",
      type: "flashcard",
      title: "Reviewed 20 flashcards",
      subject: "Biology",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: "4",
      type: "test",
      title: "Mock Test - Physics",
      subject: "Physics",
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    },
    {
      id: "5",
      type: "chapter",
      title: "Chemical Bonding",
      subject: "Chemistry",
      timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "chapter":
        return <BookOpen className="h-4 w-4" />;
      case "question":
        return <FileText className="h-4 w-4" />;
      case "test":
        return <Target className="h-4 w-4" />;
      case "flashcard":
        return <Layers className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "Physics":
        return "text-blue-500";
      case "Chemistry":
        return "text-purple-500";
      case "Biology":
        return "text-emerald-500";
      default:
        return "text-primary";
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "mentor":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  if (authLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading your profile...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const displayName = user?.name || user?.username || "Student";
  const userInitials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const joinDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background gradient-mesh-bg">
        <Header
          activeSubject="Profile"
          onSubjectChange={() => {}}
          userPoints={points}
          userLevel={level}
          studyStreak={streak}
        />

        <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl space-y-6" data-testid="profile-page">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-panel-strong glow-halo border-2 border-primary/20 overflow-hidden" data-testid="card-user-info">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary/30" data-testid="img-avatar">
                      <AvatarImage src="" alt={displayName} />
                      <AvatarFallback className="text-2xl md:text-3xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-4">
                      <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-user-name">
                        {displayName}
                      </h1>
                      <Badge 
                        className={`${getRoleBadgeColor(user?.role || "student")} capitalize`}
                        data-testid="badge-user-role"
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        {user?.role || "student"}
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 text-muted-foreground mb-4">
                      <div className="flex items-center gap-2" data-testid="text-user-email">
                        <Mail className="h-4 w-4" />
                        <span>{user?.email || "user@example.com"}</span>
                      </div>
                      <div className="flex items-center gap-2" data-testid="text-join-date">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {format(joinDate, "MMMM yyyy")}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2" data-testid="badge-level">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Level {level}
                      </Badge>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2" data-testid="badge-points">
                        <Star className="h-4 w-4 mr-2" />
                        {points.toLocaleString()} XP
                      </Badge>
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2" data-testid="badge-streak">
                        <Flame className="h-4 w-4 mr-2" />
                        {streak} Day Streak
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" className="space-y-6" data-testid="profile-tabs">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-2 bg-transparent p-0">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2"
                data-testid="tab-overview"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="progress" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2"
                data-testid="tab-progress"
              >
                <Target className="h-4 w-4 mr-2" />
                Progress
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2"
                data-testid="tab-achievements"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2"
                data-testid="tab-settings"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6" data-testid="content-overview">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Study Statistics */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="glass-panel h-full" data-testid="card-study-stats">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                          <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        Study Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-muted/50" data-testid="stat-study-time">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">Total Study Time</span>
                          </div>
                          <p className="text-2xl font-bold">45h 30m</p>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50" data-testid="stat-chapters">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <BookOpen className="h-4 w-4" />
                            <span className="text-sm">Chapters Completed</span>
                          </div>
                          <p className="text-2xl font-bold">35</p>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50" data-testid="stat-questions">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">Questions Attempted</span>
                          </div>
                          <p className="text-2xl font-bold">{userStats?.totalAttempts ?? 0}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50" data-testid="stat-accuracy">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Target className="h-4 w-4" />
                            <span className="text-sm">Accuracy Rate</span>
                          </div>
                          <p className="text-2xl font-bold">{Math.round(userStats?.accuracy ?? 0)}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="glass-panel h-full" data-testid="card-recent-activity">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                          <Clock className="h-5 w-5 text-white" />
                        </div>
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentActivities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            data-testid={`activity-item-${activity.id}`}
                          >
                            <div className={`p-2 rounded-lg bg-muted ${getSubjectColor(activity.subject)}`}>
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {activity.subject} • {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-6" data-testid="content-progress">
              <Card className="glass-panel" data-testid="card-subject-progress">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    Subject Progress
                  </CardTitle>
                  <CardDescription>
                    Track your learning progress across all subjects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {subjectProgress.map((subject) => {
                    const Icon = subject.icon;
                    return (
                      <motion.div
                        key={subject.subject}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                        data-testid={`progress-${subject.subject.toLowerCase()}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${subject.color}`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold">{subject.subject}</p>
                              <p className="text-sm text-muted-foreground">
                                {subject.chaptersCompleted} of {subject.totalChapters} chapters
                              </p>
                            </div>
                          </div>
                          <span className="text-lg font-bold">{subject.progress}%</span>
                        </div>
                        <Progress 
                          value={subject.progress} 
                          className="h-3"
                          data-testid={`progress-bar-${subject.subject.toLowerCase()}`}
                        />
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6" data-testid="content-achievements">
              <Card className="glass-panel" data-testid="card-achievements">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    Achievements
                  </CardTitle>
                  <CardDescription>
                    Your earned badges and milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((achievement) => {
                      const Icon = achievement.icon;
                      return (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            achievement.earned
                              ? "bg-muted/50 border-primary/30"
                              : "bg-muted/20 border-muted/30 opacity-60"
                          }`}
                          data-testid={`achievement-${achievement.id}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-3 rounded-lg ${achievement.earned ? "bg-gradient-to-br from-yellow-400 to-orange-500" : "bg-muted"}`}>
                              <Icon className={`h-6 w-6 ${achievement.earned ? "text-white" : "text-muted-foreground"}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold">{achievement.name}</p>
                                {achievement.earned && (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                    Earned
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              {achievement.earned && achievement.earnedDate && (
                                <p className="text-xs text-muted-foreground mt-2">
                                  {formatDistanceToNow(achievement.earnedDate, { addSuffix: true })}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6" data-testid="content-settings">
              <Card className="glass-panel" data-testid="card-settings">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-gray-500 to-gray-700">
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    Account Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account preferences and security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-14 text-left"
                      data-testid="button-edit-profile"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 mr-3">
                        <Edit className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Edit Profile</p>
                        <p className="text-xs text-muted-foreground">
                          Update your name, email, and avatar
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-14 text-left"
                      data-testid="button-notifications"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 mr-3">
                        <Bell className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Notifications</p>
                        <p className="text-xs text-muted-foreground">
                          Manage email and push notifications
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-14 text-left"
                      data-testid="button-security"
                      onClick={() => setShowPasswordDialog(true)}
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 mr-3">
                        <Lock className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Security</p>
                        <p className="text-xs text-muted-foreground">
                          Change password and security settings
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-14 text-left text-destructive hover:text-destructive"
                      data-testid="button-logout"
                      onClick={handleLogout}
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-rose-500 mr-3">
                        <LogOut className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Sign Out</p>
                        <p className="text-xs text-muted-foreground">
                          Log out of your account
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        {/* Password Change Dialog */}
        <Dialog 
          open={user?.mustChangePassword || showPasswordDialog} 
          onOpenChange={(open) => {
            if (user?.mustChangePassword) {
              return;
            }
            setShowPasswordDialog(open);
            if (!open) {
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setPasswordError("");
            }
          }}
        >
          <DialogContent 
            className="sm:max-w-md" 
            data-testid="dialog-change-password"
            hideCloseButton={user?.mustChangePassword}
            onEscapeKeyDown={(e) => user?.mustChangePassword && e.preventDefault()}
            onPointerDownOutside={(e) => user?.mustChangePassword && e.preventDefault()}
            onInteractOutside={(e) => user?.mustChangePassword && e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                {user?.mustChangePassword ? "Password Change Required" : "Change Password"}
              </DialogTitle>
              <DialogDescription>
                {user?.mustChangePassword ? (
                  <span className="flex items-center gap-2 text-amber-500">
                    <AlertTriangle className="h-4 w-4" />
                    You must change your password before continuing.
                  </span>
                ) : (
                  "Enter your current password and choose a new secure password."
                )}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    data-testid="input-current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    data-testid="button-toggle-current-password"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 8 characters)"
                    data-testid="input-new-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    data-testid="button-toggle-new-password"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  data-testid="input-confirm-password"
                />
              </div>

              {passwordError && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2" data-testid="text-password-error">
                  <AlertTriangle className="h-4 w-4" />
                  {passwordError}
                </div>
              )}
            </div>

            <DialogFooter>
              {!user?.mustChangePassword && (
                <Button
                  variant="outline"
                  onClick={() => setShowPasswordDialog(false)}
                  data-testid="button-cancel-password"
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={handlePasswordSubmit}
                disabled={!currentPassword || !newPassword || !confirmPassword || changePasswordMutation.isPending}
                data-testid="button-submit-password"
              >
                {changePasswordMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Changing...
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
