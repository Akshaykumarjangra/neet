import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { GuestRoute } from "@/components/GuestRoute";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import GameLobbyDashboard from "@/pages/GameLobbyDashboard";
import Practice from "@/pages/Practice";
import Leaderboard from "@/pages/Leaderboard";
import PhysicsContent from "@/pages/PhysicsContent";
import ChemistryContent from "@/pages/ChemistryContent";
import BiologyContent from "@/pages/BiologyContent"; // Assuming BiologyContent page is created
import ChapterViewer from "@/pages/ChapterViewer";
import MockTestPage from "@/pages/MockTest";
import QuestionnaireBuilder from "@/pages/QuestionnaireBuilder";
import Flashcards from "@/pages/Flashcards";
import LearningPath from "@/pages/LearningPath";
import MockTests from "@/pages/MockTests";
import Achievements from "@/pages/Achievements";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminContentManager from "@/pages/AdminContentManager";
import MentorDashboard from "@/pages/MentorDashboard";
import MentorDiscovery from "@/pages/MentorDiscovery";
import Enrollment from "@/pages/Enrollment";
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

function Router() {
  return (
    <Switch>
      <Route path="/mentors">
        <MentorDiscovery />
      </Route>
      <Route path="/enroll">
        <Enrollment />
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
          <PhysicsContent />
        </ProtectedRoute>
      </Route>
      <Route path="/physics-subject">
        <ProtectedRoute>
          <Physics />
        </ProtectedRoute>
      </Route>
      <Route path="/chemistry">
        <ProtectedRoute>
          <ChemistryContent />
        </ProtectedRoute>
      </Route>
      <Route path="/biology">
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
      <Route path="/test/:id">
        <ProtectedRoute>
          <MockTestPage />
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
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/content">
        <ProtectedRoute>
          <AdminContentManager />
        </ProtectedRoute>
      </Route>
      <Route path="/mentor-dashboard">
        <ProtectedRoute>
          <MentorDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/community">
        <Community />
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