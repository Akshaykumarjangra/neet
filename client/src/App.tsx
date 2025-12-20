import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { OwnerRoute } from "@/components/OwnerRoute";
import { GuestRoute } from "@/components/GuestRoute";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import GameLobbyDashboard from "@/pages/GameLobbyDashboard";
import Practice from "@/pages/Practice";
import Leaderboard from "@/pages/Leaderboard";
import PhysicsContent from "@/pages/PhysicsContent";
import ChemistryContent from "@/pages/ChemistryContent";
import Chemistry from "@/pages/Chemistry";
import BiologyContent from "@/pages/BiologyContent";
import Biology from "@/pages/Biology";
import ChapterViewer from "@/pages/ChapterViewer";
import MockTestPage from "@/pages/MockTest";
import MockTestResults from "@/pages/MockTestResults";
import QuestionnaireBuilder from "@/pages/QuestionnaireBuilder";
import Flashcards from "@/pages/Flashcards";
import LearningPath from "@/pages/LearningPath";
import MockTests from "@/pages/MockTests";
import Achievements from "@/pages/Achievements";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminContentManager from "@/pages/AdminContentManager";
import AdminUsers from "@/pages/AdminUsers";
import MentorDashboard from "@/pages/MentorDashboard";
import MentorDiscovery from "@/pages/MentorDiscovery";
import MentorProfile from "@/pages/MentorProfile";
import MyBookings from "@/pages/MyBookings";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/not-found";
import Library from "@/pages/Library";
import Explore from "@/pages/Explore";
import Class12 from "@/pages/Class12";
import ClassWiseContent from "@/pages/ClassWiseContent";
import Community from "@/pages/Community";
import Simulations from "@/pages/Simulations";
import Syllabus from "@/pages/Syllabus";
import Search from "@/pages/Search";
import Physics from "@/pages/Physics";
import Profile from "@/pages/Profile";
import Pricing from "@/pages/Pricing";
import Explain from "@/pages/Explain";
import AdminPaymentConfig from "@/pages/AdminPaymentConfig";
import QuestionBank from "@/pages/QuestionBank";
import LmsContentStudio from "@/pages/LmsContentStudio";
import MentorLmsAutomation from "@/pages/MentorLmsAutomation";
import NEETBlast from "@/pages/NEETBlast";
import BillingStatus from "@/pages/BillingStatus";
import AdminAnnouncements from "@/pages/AdminAnnouncements";
import Chat from "@/pages/Chat";
import PracticeAnalytics from "@/pages/PracticeAnalytics";
import { useEffect } from "react";
import { useLocation } from "wouter";

function Router() {
  const [, setLocation] = useLocation();

  // Simple route prefetch hooks: warm critical queries on landing/dashboard/practice routes
  useEffect(() => {
    const prefetch = (path: string, fn: () => void) => {
      if (window.location.pathname === path) {
        fn();
      }
    };

    prefetch("/dashboard", () => {
      queryClient.prefetchQuery({ queryKey: ["/api/learning-path/summary"] });
      queryClient.prefetchQuery({ queryKey: ["/api/questions/stats"] });
      queryClient.prefetchQuery({ queryKey: ["/api/mentors/recommendations"] });
      queryClient.prefetchQuery({ queryKey: ["/api/game/leaderboard"] });
    });

    prefetch("/practice", () => {
      queryClient.prefetchQuery({ queryKey: ["/api/topics"] });
    });

    prefetch("/", () => {
      queryClient.prefetchQuery({ queryKey: ["/api/questions/preview"] });
    });

    prefetch("/pricing", () => {
      queryClient.prefetchQuery({ queryKey: ["/api/subscription-plans"] });
    });

    prefetch("/billing-status", () => {
      queryClient.prefetchQuery({ queryKey: ["/api/billing/status"] });
    });

    prefetch("/explore", () => {
      queryClient.prefetchQuery({ queryKey: ["/api/lms/library"] });
    });
  }, []);

  return (
    <Switch>
      <Route path="/mentors/:id">
        <MentorProfile />
      </Route>
      <Route path="/mentors">
        <MentorDiscovery />
      </Route>
      <Route path="/explain">
        <Explain />
      </Route>
      <Route path="/explore">
        <ProtectedRoute>
          <Explore />
        </ProtectedRoute>
      </Route>
      <Route path="/class-wise">
        <ProtectedRoute>
          <ClassWiseContent />
        </ProtectedRoute>
      </Route>
      <Route path="/class-12">
        <ProtectedRoute>
          <Class12 />
        </ProtectedRoute>
      </Route>
      <Route path="/login">
        <GuestRoute>
          <Login />
        </GuestRoute>
      </Route>
      <Route path="/signup">
        <GuestRoute>
          <Signup />
        </GuestRoute>
      </Route>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/pricing">
        <Pricing />
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute>
          <GameLobbyDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/classic">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/physics">
        <ProtectedRoute>
          <Physics />
        </ProtectedRoute>
      </Route>
      <Route path="/physics-legacy">
        <ProtectedRoute>
          <PhysicsContent />
        </ProtectedRoute>
      </Route>
      <Route path="/chemistry">
        <ProtectedRoute>
          <Chemistry />
        </ProtectedRoute>
      </Route>
      <Route path="/chemistry-legacy">
        <ProtectedRoute>
          <ChemistryContent />
        </ProtectedRoute>
      </Route>
      <Route path="/biology">
        <ProtectedRoute>
          <Biology />
        </ProtectedRoute>
      </Route>
      <Route path="/botany">
        <ProtectedRoute>
          <Biology initialSection="Botany" />
        </ProtectedRoute>
      </Route>
      <Route path="/zoology">
        <ProtectedRoute>
          <Biology initialSection="Zoology" />
        </ProtectedRoute>
      </Route>
      <Route path="/biology-legacy">
        <ProtectedRoute>
          <BiologyContent />
        </ProtectedRoute>
      </Route>
      <Route path="/chapter/:subject/:classLevel/:chapterNumber">
        <ProtectedRoute>
          <ChapterViewer />
        </ProtectedRoute>
      </Route>
      <Route path="/practice">
        <ProtectedRoute>
          <Practice />
        </ProtectedRoute>
      </Route>
      <Route path="/progress/analytics">
        <ProtectedRoute>
          <PracticeAnalytics />
        </ProtectedRoute>
      </Route>
      <Route path="/leaderboard">
        <ProtectedRoute>
          <Leaderboard />
        </ProtectedRoute>
      </Route>
      <Route path="/learning-path">
        <ProtectedRoute>
          <LearningPath />
        </ProtectedRoute>
      </Route>
      <Route path="/mock-tests">
        <ProtectedRoute>
          <MockTests />
        </ProtectedRoute>
      </Route>
      <Route path="/mock-test/:id">
        <ProtectedRoute>
          <MockTestPage />
        </ProtectedRoute>
      </Route>
      <Route path="/mock-test/:id/results">
        <ProtectedRoute>
          <MockTestResults />
        </ProtectedRoute>
      </Route>
      <Route path="/flashcards">
        <ProtectedRoute>
          <Flashcards />
        </ProtectedRoute>
      </Route>
      <Route path="/build-test">
        <ProtectedRoute>
          <QuestionnaireBuilder />
        </ProtectedRoute>
      </Route>
      <Route path="/library">
        <ProtectedRoute>
          <Library />
        </ProtectedRoute>
      </Route>
      <Route path="/achievements">
        <ProtectedRoute>
          <Achievements />
        </ProtectedRoute>
      </Route>
      <Route path="/admin">
        <OwnerRoute>
          <AdminDashboard />
        </OwnerRoute>
      </Route>
      <Route path="/admin/lms-studio">
        <OwnerRoute>
          <LmsContentStudio />
        </OwnerRoute>
      </Route>
      <Route path="/admin/mentor-automation">
        <OwnerRoute>
          <MentorLmsAutomation />
        </OwnerRoute>
      </Route>
      <Route path="/admin/announcements">
        <OwnerRoute>
          <AdminAnnouncements />
        </OwnerRoute>
      </Route>
      <Route path="/admin/content">
        <OwnerRoute>
          <AdminContentManager />
        </OwnerRoute>
      </Route>
      <Route path="/admin/payments">
        <OwnerRoute>
          <AdminPaymentConfig />
        </OwnerRoute>
      </Route>
      <Route path="/admin/users">
        <OwnerRoute>
          <AdminUsers />
        </OwnerRoute>
      </Route>
      <Route path="/mentor-dashboard">
        <ProtectedRoute>
          <MentorDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/community">
        <Community />
      </Route>
      <Route path="/chat">
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      </Route>
      <Route path="/simulations">
        <ProtectedRoute>
          <Simulations />
        </ProtectedRoute>
      </Route>
      <Route path="/syllabus">
        <ProtectedRoute>
          <Syllabus />
        </ProtectedRoute>
      </Route>
      <Route path="/search">
        <ProtectedRoute>
          <Search />
        </ProtectedRoute>
      </Route>
      <Route path="/profile">
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      </Route>
      <Route path="/my-bookings">
        <ProtectedRoute>
          <MyBookings />
        </ProtectedRoute>
      </Route>
      <Route path="/billing-status">
        <ProtectedRoute>
          <BillingStatus />
        </ProtectedRoute>
      </Route>
      <Route path="/question-bank">
        <QuestionBank />
      </Route>
      <Route path="/neet-blast">
        <ProtectedRoute>
          <NEETBlast />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <ThemeProvider>
            <Toaster />
            <Router />
          </ThemeProvider>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
