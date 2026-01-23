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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { INDIAN_STATES } from "@/lib/indian-states";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useGamification } from "@/hooks/useGamification";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { formatDistanceToNow, format } from "date-fns";
import { useLocation } from "wouter";
import {
  User,
  Mail,
  Calendar,
  Clock,
  BookOpen,
  CreditCard,
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
  Layers,
  GraduationCap,
  Loader2,
  Eye,
  EyeOff,
  AlertTriangle,
  FileText,
  Check,
  MapPin,
  Building2,
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

type BillingInterval = "monthly" | "yearly";

interface SubscriptionSummary {
  id: number;
  status: string;
  billingInterval: BillingInterval;
  currentPeriodEnd: string | null;
  planName: string;
  planSlug: string;
}

interface SubscriptionStatusResponse {
  subscription: SubscriptionSummary | null;
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
  const [profileName, setProfileName] = useState(user?.displayName || "");
  const [profileHeadline, setProfileHeadline] = useState("");
  const [profileAvatarUrl, setProfileAvatarUrl] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileSchool, setProfileSchool] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [profileState, setProfileState] = useState("");
  const [_profilePreferences, setProfilePreferences] = useState<Record<string, any>>({});
  const [viewMode, setViewMode] = useState<"admin" | "mentor" | "student">(
    (user?.role as "admin" | "mentor" | "student") || "student"
  );

  const { data: profileData = { profile: { name: "", headline: "", avatarUrl: "", bio: "", school: "", city: "", state: "", preferences: {} } }, isLoading: profileLoading } = useQuery<{
    profile: {
      name: string;
      headline?: string | null;
      avatarUrl?: string | null;
      bio?: string | null;
      school?: string | null;
      city?: string | null;
      state?: string | null;
      preferences?: Record<string, any>;
    };
  }>({
    queryKey: ["/api/profile"],
    enabled: !!user?.id,
    queryFn: async () => {
      return apiRequest("GET", "/api/profile");
    },
  });

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

  useEffect(() => {
    if (profileData?.profile) {
      setProfileName(profileData.profile.name || user?.displayName || "");
      setProfileHeadline(profileData.profile.headline || "");
      setProfileAvatarUrl(profileData.profile.avatarUrl || "");
      setProfileBio(profileData.profile.bio || "");
      setProfileSchool(profileData.profile.school || "");
      setProfileCity(profileData.profile.city || "");
      setProfileState(profileData.profile.state || "");
      setProfilePreferences(profileData.profile.preferences || {});
    }
  }, [profileData?.profile, user?.displayName]);

  useEffect(() => {
    if (user?.role) {
      setViewMode((user.role as "admin" | "mentor" | "student") || "student");
    }
  }, [user?.role]);

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

  const updateProfileMutation = useMutation({
    mutationFn: async (payload: { name: string; headline?: string; avatarUrl?: string; bio?: string; school?: string; city?: string; state?: string }) => {
      return apiRequest("POST", "/api/profile", payload);
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["/api/profile"] });
      const previous = queryClient.getQueryData(["/api/profile"]);
      const optimistic = {
        profile: {
          name: payload.name,
          headline: payload.headline,
          avatarUrl: payload.avatarUrl,
          bio: payload.bio,
          school: payload.school,
          city: payload.city,
          state: payload.state,
          preferences: _profilePreferences,
        },
      };
      queryClient.setQueryData(["/api/profile"], optimistic);
      return { previous };
    },
    onSuccess: async () => {
      toast({
        title: "Profile saved",
        description: "Your profile has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      await forceRefreshAuth();
    },
    onError: (error: Error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["/api/profile"], context.previous);
      }
      toast({
        title: "Could not save profile",
        description: error.message,
        variant: "destructive",
      });
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

  const handleProfileSave = () => {
    const nextName = profileName.trim();
    const nextHeadline = profileHeadline.trim();
    const nextAvatar = profileAvatarUrl.trim();
    const nextBio = profileBio.trim();
    const nextSchool = profileSchool.trim();
    const nextCity = profileCity.trim();
    const nextState = profileState.trim();

    if (!nextName) {
      toast({
        title: "Name is required",
        description: "Please add a name before saving your profile.",
        variant: "destructive",
      });
      return;
    }

    if (nextBio.length > 1000) {
      toast({
        title: "Bio too long",
        description: "Bio must be under 1000 characters.",
        variant: "destructive",
      });
      return;
    }

    if (nextSchool.length > 200) {
      toast({
        title: "School name too long",
        description: "School name must be under 200 characters.",
        variant: "destructive",
      });
      return;
    }

    if (nextCity.length > 100) {
      toast({
        title: "City name too long",
        description: "City name must be under 100 characters.",
        variant: "destructive",
      });
      return;
    }

    updateProfileMutation.mutate({
      name: nextName,
      headline: nextHeadline,
      avatarUrl: nextAvatar,
      bio: nextBio,
      school: nextSchool,
      city: nextCity,
      state: nextState,
    });
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

  const { data: subscriptionStatus, isLoading: subscriptionLoading } = useQuery<SubscriptionStatusResponse>({
    queryKey: ["/api/billing/status"],
    enabled: !!user?.id,
  });

  const activeSubscription = subscriptionStatus?.subscription ?? null;
  const subscriptionRenewalDate = activeSubscription?.currentPeriodEnd
    ? format(new Date(activeSubscription.currentPeriodEnd), "PPP")
    : null;

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

  const getSubscriptionBadgeColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "cancelled":
      case "expired":
        return "bg-red-500/20 text-red-500 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-500 border-slate-500/30";
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

  const displayName = (profileName || user?.displayName || "Student").trim();
  const displayHeadline = profileHeadline?.trim() || user?.headline || "";
  const profileAvatar = profileAvatarUrl?.trim() || user?.avatarUrl || "";
  const userInitials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const joinDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
  const canSwitchRole = Boolean((user as any)?.isOwner || user?.isAdmin);
  const displayRole = (viewMode || (user?.role as "admin" | "mentor" | "student") || "student").toLowerCase();

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
                      <AvatarImage src={profileAvatar} alt={displayName} />
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
                        className={`${getRoleBadgeColor(displayRole)} capitalize`}
                        data-testid="badge-user-role"
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        {displayRole}
                      </Badge>
                    </div>

                    {canSwitchRole && (
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge variant="outline" className="text-xs">
                          Viewing as {displayRole}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2">
                              <Shield className="h-4 w-4" />
                              Switch View
                              <ChevronRight className="h-4 w-4 ml-auto" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-48">
                            <DropdownMenuItem
                              onClick={() => setViewMode("student")}
                              className={displayRole === "student" ? "bg-accent" : ""}
                            >
                              <User className="h-4 w-4 mr-2" />
                              Student View
                              {displayRole === "student" && <Check className="h-4 w-4 ml-auto" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setViewMode("mentor")}
                              className={displayRole === "mentor" ? "bg-accent" : ""}
                              disabled={user?.role !== "mentor" && !user?.isOwner && !user?.isAdmin}
                            >
                              <GraduationCap className="h-4 w-4 mr-2" />
                              Mentor Dashboard
                              {displayRole === "mentor" && <Check className="h-4 w-4 ml-auto" />}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setViewMode("admin")}
                              className={displayRole === "admin" ? "bg-accent" : ""}
                              disabled={!user?.isOwner && !user?.isAdmin}
                            >
                              <Shield className="h-4 w-4 mr-2" />
                              Admin Hub
                              {displayRole === "admin" && <Check className="h-4 w-4 ml-auto" />}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <span className="text-xs text-muted-foreground">
                          Preview dashboard panes in different roles.
                        </span>
                      </div>
                    )}

                    <p className="text-muted-foreground max-w-xl" data-testid="text-user-headline">
                      {displayHeadline || "Add a short headline to personalize your profile."}
                    </p>

                    {profileBio && (
                      <p className="text-sm text-muted-foreground max-w-xl mt-2 mb-4" data-testid="text-user-bio">
                        {profileBio}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row items-center gap-4 text-muted-foreground mb-4">
                      <div className="flex items-center gap-2" data-testid="text-user-email">
                        <Mail className="h-4 w-4" />
                        <span>{user?.email || "user@example.com"}</span>
                      </div>
                      <div className="flex items-center gap-2" data-testid="text-join-date">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {format(joinDate, "MMMM yyyy")}</span>
                      </div>
                      {(profileSchool || profileCity || profileState) && (
                        <div className="flex flex-wrap items-center gap-3">
                          {profileSchool && (
                            <div className="flex items-center gap-2" data-testid="text-user-school">
                              <Building2 className="h-4 w-4" />
                              <span className="text-sm">{profileSchool}</span>
                            </div>
                          )}
                          {(profileCity || profileState) && (
                            <div className="flex items-center gap-2" data-testid="text-user-location">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">
                                {[profileCity, profileState].filter(Boolean).join(", ")}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
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

          <Card className="glass-panel" data-testid="card-profile-settings">
            <CardHeader>
              <CardTitle>Profile settings</CardTitle>
              <CardDescription>Update your profile information. These values are shown in the header and menus.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <p className="text-sm text-muted-foreground">Name, headline, and avatar shown in your profile</p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="profile-name">Name *</Label>
                    <Input
                      id="profile-name"
                      value={profileName}
                      onChange={(event) => setProfileName(event.target.value)}
                      placeholder="Your name"
                      disabled={profileLoading || updateProfileMutation.isPending}
                      data-testid="input-profile-name"
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-headline">Headline</Label>
                    <Input
                      id="profile-headline"
                      value={profileHeadline}
                      onChange={(event) => setProfileHeadline(event.target.value)}
                      placeholder="e.g. Future NEET topper"
                      disabled={profileLoading || updateProfileMutation.isPending}
                      data-testid="input-profile-headline"
                      maxLength={200}
                    />
                    <p className="text-xs text-muted-foreground">{profileHeadline.length}/200</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-avatar">Avatar URL</Label>
                    <Input
                      id="profile-avatar"
                      value={profileAvatarUrl}
                      onChange={(event) => setProfileAvatarUrl(event.target.value)}
                      placeholder="https://..."
                      disabled={profileLoading || updateProfileMutation.isPending}
                      data-testid="input-profile-avatar"
                      maxLength={500}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-bio">Bio</Label>
                  <Textarea
                    id="profile-bio"
                    value={profileBio}
                    onChange={(event) => setProfileBio(event.target.value)}
                    placeholder="Tell us about yourself..."
                    disabled={profileLoading || updateProfileMutation.isPending}
                    data-testid="input-profile-bio"
                    maxLength={1000}
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">{profileBio.length}/1000</p>
                </div>
              </div>

              {/* Location & Education Section */}
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h3 className="text-lg font-semibold">Location & Education</h3>
                  <p className="text-sm text-muted-foreground">Your school and location information</p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="profile-school">School</Label>
                    <Input
                      id="profile-school"
                      value={profileSchool}
                      onChange={(event) => setProfileSchool(event.target.value)}
                      placeholder="Your school name"
                      disabled={profileLoading || updateProfileMutation.isPending}
                      data-testid="input-profile-school"
                      maxLength={200}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-city">City</Label>
                    <Input
                      id="profile-city"
                      value={profileCity}
                      onChange={(event) => setProfileCity(event.target.value)}
                      placeholder="Your city"
                      disabled={profileLoading || updateProfileMutation.isPending}
                      data-testid="input-profile-city"
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-state">State</Label>
                    <Select
                      value={profileState}
                      onValueChange={setProfileState}
                      disabled={profileLoading || updateProfileMutation.isPending}
                    >
                      <SelectTrigger id="profile-state" data-testid="select-profile-state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {INDIAN_STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t">
                <Button
                  onClick={handleProfileSave}
                  disabled={profileLoading || updateProfileMutation.isPending}
                  data-testid="button-save-profile"
                >
                  {updateProfileMutation.isPending ? (
                    <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Saving…</span>
                  ) : (
                    "Save profile"
                  )}
                </Button>
                <p className="text-sm text-muted-foreground">
                  Saves instantly and refreshes your header profile card.
                </p>
              </div>
            </CardContent>
          </Card>

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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="glass-panel" data-testid="card-subscription">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500">
                        <CreditCard className="h-5 w-5 text-white" />
                      </div>
                      Subscription
                    </CardTitle>
                    <CardDescription>
                      Manage your premium access and billing details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {subscriptionLoading ? (
                      <div className="flex items-center justify-center py-6">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : activeSubscription ? (
                      <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Current Plan</p>
                            <p className="text-xl font-semibold">{activeSubscription.planName}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={getSubscriptionBadgeColor(activeSubscription.status)}
                          >
                            {activeSubscription.status}
                          </Badge>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="p-4 rounded-lg bg-muted/50">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                              Billing interval
                            </p>
                            <p className="text-lg font-semibold capitalize">
                              {activeSubscription.billingInterval}
                            </p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/50">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                              Renews on
                            </p>
                            <p className="text-lg font-semibold">
                              {subscriptionRenewalDate || "—"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Button onClick={() => navigate("/billing-status")} className="gap-2">
                            View Billing
                          </Button>
                          <Button variant="outline" onClick={() => navigate("/pricing")}>
                            Manage Plan
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          You're currently exploring on the free tier. Upgrade to unlock premium
                          practice, AI guidance, and mentor sessions.
                        </p>
                        <Button onClick={() => navigate("/pricing")} className="w-full sm:w-auto">
                          Explore Premium Plans
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
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
