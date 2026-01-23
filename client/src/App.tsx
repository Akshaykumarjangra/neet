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
import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "wouter";

// Lazy load all pages for code-splitting and better performance
const Home = lazy(() => import("@/pages/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const GameLobbyDashboard = lazy(() => import("@/pages/GameLobbyDashboard"));
const RoleDashboard = lazy(() => import("@/pages/RoleDashboard"));
const Practice = lazy(() => import("@/pages/Practice"));
const Leaderboard = lazy(() => import("@/pages/Leaderboard"));
const PhysicsContent = lazy(() => import("@/pages/PhysicsContent"));
const ChemistryContent = lazy(() => import("@/pages/ChemistryContent"));
const Chemistry = lazy(() => import("@/pages/Chemistry"));
const BiologyContent = lazy(() => import("@/pages/BiologyContent"));
const Biology = lazy(() => import("@/pages/Biology"));
const ChapterViewer = lazy(() => import("@/pages/ChapterViewer"));
const MockTestPage = lazy(() => import("@/pages/MockTest"));
const MockTestResults = lazy(() => import("@/pages/MockTestResults"));
const QuestionnaireBuilder = lazy(() => import("@/pages/QuestionnaireBuilder"));
const Flashcards = lazy(() => import("@/pages/Flashcards"));
const LearningPath = lazy(() => import("@/pages/LearningPath"));
const MockTests = lazy(() => import("@/pages/MockTests"));
const Achievements = lazy(() => import("@/pages/Achievements"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AdminContentManager = lazy(() => import("@/pages/AdminContentManager"));
const AdminTestSeries = lazy(() => import("@/pages/AdminTestSeries"));
const AdminContentApprovals = lazy(() => import("@/pages/AdminContentApprovals"));
const AdminUsers = lazy(() => import("@/pages/AdminUsers"));
const StudentTestSeries = lazy(() => import("@/pages/StudentTestSeries"));
const MentorDashboard = lazy(() => import("@/pages/MentorDashboard"));
const MentorDiscovery = lazy(() => import("@/pages/MentorDiscovery"));
const MentorProfile = lazy(() => import("@/pages/MentorProfile"));
const MyBookings = lazy(() => import("@/pages/MyBookings"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Library = lazy(() => import("@/pages/Library"));
const Explore = lazy(() => import("@/pages/Explore"));
const Class12 = lazy(() => import("@/pages/Class12"));
const ClassWiseContent = lazy(() => import("@/pages/ClassWiseContent"));
const Community = lazy(() => import("@/pages/Community"));
const Simulations = lazy(() => import("@/pages/Simulations"));
const Syllabus = lazy(() => import("@/pages/Syllabus"));
const Search = lazy(() => import("@/pages/Search"));
const Physics = lazy(() => import("@/pages/Physics"));
const Profile = lazy(() => import("@/pages/Profile"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Explain = lazy(() => import("@/pages/Explain"));
const AdminPaymentConfig = lazy(() => import("@/pages/AdminPaymentConfig"));
const QuestionBank = lazy(() => import("@/pages/QuestionBank"));
const LmsContentStudio = lazy(() => import("@/pages/LmsContentStudio"));
const MentorLmsAutomation = lazy(() => import("@/pages/MentorLmsAutomation"));
const NEETBlast = lazy(() => import("@/pages/NEETBlast"));
const BillingStatus = lazy(() => import("@/pages/BillingStatus"));
const AdminAnnouncements = lazy(() => import("@/pages/AdminAnnouncements"));
const Chat = lazy(() => import("@/pages/Chat"));
const PracticeAnalytics = lazy(() => import("@/pages/PracticeAnalytics"));
const SampleChapterPreview = lazy(() => import("@/pages/SampleChapterPreview"));
const MockTestPreview = lazy(() => import("@/pages/MockTestPreview"));
const SimulationsPreview = lazy(() => import("@/pages/SimulationsPreview"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

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
    <Suspense fallback={<PageLoader />}>
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
        <Route path="/checkout">
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        </Route>
        <Route path="/dashboard">
          <ProtectedRoute>
            <RoleDashboard />
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
        <Route path="/preview/chapter">
          <SampleChapterPreview />
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
        <Route path="/preview/mock-test">
          <MockTestPreview />
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
        <Route path="/admin/approvals">
          <OwnerRoute>
            <AdminContentApprovals />
          </OwnerRoute>
        </Route>
        <Route path="/admin/users">
          <OwnerRoute>
            <AdminUsers />
          </OwnerRoute>
        </Route>
        <Route path="/admin/test-series">
          <OwnerRoute>
            <AdminTestSeries />
          </OwnerRoute>
        </Route>
        <Route path="/test-series">
          <ProtectedRoute>
            <StudentTestSeries />
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
        <Route path="/preview/simulations">
          <SimulationsPreview />
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
    </Suspense>
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
