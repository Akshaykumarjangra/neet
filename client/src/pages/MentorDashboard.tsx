import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GraduationCap,
  Clock,
  DollarSign,
  Star,
  Calendar,
  Users,
  BookOpen,
  Loader2,
  Plus,
  X,
  Trash2,
  Check,
  XCircle,
  Link as LinkIcon,
  TrendingUp,
  Award,
  Video,
  FileText,
  Wallet,
  CreditCard,
  Upload,
  Eye,
  Edit,
} from "lucide-react";

const SUBJECTS = ["Physics", "Chemistry", "Biology"] as const;
const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi"];
const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const mentorApplicationSchema = z.object({
  bio: z.string().min(50, "Bio must be at least 50 characters").max(2000, "Bio must be less than 2000 characters"),
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  topics: z.array(z.string()).optional(),
  hourlyRate: z.coerce.number().int().min(0, "Rate must be positive"),
  experienceYears: z.coerce.number().int().min(0).max(50),
  education: z.array(z.object({
    degree: z.string().min(1, "Degree is required"),
    institution: z.string().min(1, "Institution is required"),
    year: z.coerce.number().int().min(1950).max(new Date().getFullYear()).optional(),
  })).min(1, "Add at least one education entry"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
});

const mentorProfileSchema = z.object({
  bio: z.string().min(50).max(2000).optional(),
  subjects: z.array(z.string()).optional(),
  topics: z.array(z.string()).optional(),
  hourlyRate: z.coerce.number().int().min(0).optional(),
  experienceYears: z.coerce.number().int().min(0).max(50).optional(),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    year: z.coerce.number().optional(),
  })).optional(),
  languages: z.array(z.string()).optional(),
  isAvailable: z.boolean().optional(),
});

const availabilitySchema = z.object({
  dayOfWeek: z.coerce.number().int().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Use format HH:MM"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Use format HH:MM"),
});

type MentorApplication = z.infer<typeof mentorApplicationSchema>;
type MentorProfile = z.infer<typeof mentorProfileSchema>;
type AvailabilitySlot = z.infer<typeof availabilitySchema>;

interface MentorData {
  id: number;
  userId: string;
  bio: string | null;
  subjects: string[];
  topics: string[];
  hourlyRate: number;
  experienceYears: number;
  education: Array<{ degree: string; institution: string; year?: number }>;
  languages: string[];
  calendarTimezone: string | null;
  verificationStatus: "pending" | "approved" | "rejected";
  avgRating: number | null;
  reviewCount: number;
  totalEarningsCents: number;
  totalSessionsCompleted: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  availability?: AvailabilityData[];
  recentBookings?: BookingData[];
}

interface AvailabilityData {
  id: number;
  mentorId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
}

interface BookingData {
  id: number;
  startAt: string;
  endAt: string;
  status: "requested" | "confirmed" | "completed" | "cancelled";
  priceCents: number;
  paymentStatus: string;
  meetingLink: string | null;
  notes: string | null;
  studentName: string | null;
  studentAvatar?: string | null;
  createdAt: string;
}

interface ContentData {
  id: number;
  mentorId: number;
  title: string;
  description: string | null;
  type: "video" | "pdf" | "image" | "handwritten_note";
  url: string;
  thumbnailUrl: string | null;
  durationMinutes: number | null;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface EarningsData {
  totalEarningsCents: number;
  availableForPayoutCents: number;
  pendingPayoutsCents: number;
  thisMonthCents: number;
}

interface PayoutData {
  id: number;
  mentorId: number;
  amountCents: number;
  status: "pending" | "processing" | "completed" | "failed";
  periodStart: string;
  periodEnd: string;
  createdAt: string;
}

interface ContentFormData {
  title: string;
  description: string;
  type: "video" | "pdf" | "image" | "handwritten_note";
  url: string;
  thumbnailUrl: string;
  durationMinutes: number | null;
}

export default function MentorDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [topicInput, setTopicInput] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [meetingLinkInput, setMeetingLinkInput] = useState<Record<number, string>>({});

  const { data: mentorStatus, isLoading: statusLoading, refetch: refetchStatus } = useQuery<{ status: string; hasMentor: boolean; mentor?: MentorData }>({
    queryKey: ["/api/mentors/status"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/mentors/status", { credentials: "include" });
        if (response.ok) {
          const data = await response.json();
          if (data.status === "not_applied") {
            return { status: "not_applied", hasMentor: false };
          }
          return { status: data.status, hasMentor: true, mentor: data.mentor };
        }
        return { status: "not_applied", hasMentor: false };
      } catch {
        return { status: "not_applied", hasMentor: false };
      }
    },
    enabled: !!user,
  });

  const { data: bookings = [], refetch: refetchBookings } = useQuery<BookingData[]>({
    queryKey: ["/api/bookings", "mentor"],
    queryFn: async () => {
      const response = await fetch("/api/bookings?role=mentor", { credentials: "include" });
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!mentorStatus?.hasMentor && mentorStatus.mentor?.verificationStatus === "approved",
  });

  const applicationForm = useForm<MentorApplication>({
    resolver: zodResolver(mentorApplicationSchema),
    defaultValues: {
      bio: "",
      subjects: [],
      topics: [],
      hourlyRate: 500,
      experienceYears: 0,
      education: [{ degree: "", institution: "", year: undefined }],
      languages: ["English"],
    },
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: applicationForm.control,
    name: "education",
  });

  const profileForm = useForm<MentorProfile>({
    resolver: zodResolver(mentorProfileSchema),
  });

  const availabilityForm = useForm<AvailabilitySlot>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      dayOfWeek: 1,
      startTime: "09:00",
      endTime: "17:00",
    },
  });

  useEffect(() => {
    if (mentorStatus?.mentor && mentorStatus.mentor.verificationStatus === "approved") {
      const m = mentorStatus.mentor;
      profileForm.reset({
        bio: m.bio || "",
        subjects: m.subjects,
        topics: m.topics,
        hourlyRate: m.hourlyRate,
        experienceYears: m.experienceYears,
        education: m.education,
        languages: m.languages,
        isAvailable: m.isAvailable,
      });
      setTopics(m.topics || []);
    }
  }, [mentorStatus]);

  const applyMutation = useMutation({
    mutationFn: async (data: MentorApplication) => {
      return apiRequest("POST", "/api/mentors/apply", { ...data, topics });
    },
    onSuccess: () => {
      toast({ title: "Application submitted!", description: "Your mentor application is pending review." });
      refetchStatus();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to submit application", variant: "destructive" });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: MentorProfile) => {
      return apiRequest("PUT", "/api/mentors/my-profile", { ...data, topics });
    },
    onSuccess: () => {
      toast({ title: "Profile updated!", description: "Your mentor profile has been saved." });
      refetchStatus();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to update profile", variant: "destructive" });
    },
  });

  const addAvailabilityMutation = useMutation({
    mutationFn: async (data: AvailabilitySlot) => {
      return apiRequest("POST", "/api/mentors/availability", data);
    },
    onSuccess: () => {
      toast({ title: "Availability added!" });
      availabilityForm.reset();
      refetchStatus();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to add availability", variant: "destructive" });
    },
  });

  const deleteAvailabilityMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/mentors/availability/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Availability removed!" });
      refetchStatus();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to remove availability", variant: "destructive" });
    },
  });

  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, status, meetingLink }: { id: number; status: "confirmed" | "cancelled"; meetingLink?: string }) => {
      return apiRequest("PUT", `/api/bookings/${id}/status`, { status, meetingLink });
    },
    onSuccess: () => {
      toast({ title: "Booking updated!" });
      refetchBookings();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to update booking", variant: "destructive" });
    },
  });

  const handleAddTopic = () => {
    if (topicInput.trim() && !topics.includes(topicInput.trim())) {
      setTopics([...topics, topicInput.trim()]);
      setTopicInput("");
    }
  };

  const handleRemoveTopic = (topic: string) => {
    setTopics(topics.filter((t) => t !== topic));
  };

  if (authLoading || statusLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    setLocation("/login");
    return null;
  }

  const mentor = mentorStatus?.mentor;
  const isMentor = mentorStatus?.hasMentor && mentor?.verificationStatus === "approved";
  const isPending = mentorStatus?.hasMentor && mentor?.verificationStatus === "pending";
  const isRejected = mentorStatus?.hasMentor && mentor?.verificationStatus === "rejected";

  const upcomingBookings = bookings.filter((b) => b.status === "requested" || b.status === "confirmed");
  const pastBookings = bookings.filter((b) => b.status === "completed" || b.status === "cancelled");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-4 md:p-6 max-w-7xl">
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Mentor Dashboard</h1>
        </div>

        {isPending && (
          <Card className="mb-8 border-yellow-500/50 bg-yellow-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                Application Pending
              </CardTitle>
              <CardDescription>
                Your mentor application is being reviewed. We'll notify you once it's approved.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Submitted on: {mentor?.createdAt ? new Date(mentor.createdAt).toLocaleDateString() : "N/A"}
              </div>
            </CardContent>
          </Card>
        )}

        {isRejected && (
          <Card className="mb-8 border-red-500/50 bg-red-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                Application Rejected
              </CardTitle>
              <CardDescription>
                Unfortunately, your mentor application was not approved. You may reapply with updated information.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {!mentorStatus?.hasMentor || isRejected ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Become a Mentor
              </CardTitle>
              <CardDescription>
                Share your knowledge and help students succeed in their NEET preparation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...applicationForm}>
                <form onSubmit={applicationForm.handleSubmit((data) => applyMutation.mutate(data))} className="space-y-6">
                  <FormField
                    control={applicationForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell students about yourself, your teaching style, and experience..."
                            className="min-h-[120px]"
                            data-testid="input-bio"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Minimum 50 characters</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={applicationForm.control}
                    name="subjects"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subjects</FormLabel>
                        <div className="flex flex-wrap gap-3">
                          {SUBJECTS.map((subject) => (
                            <div key={subject} className="flex items-center gap-2">
                              <Checkbox
                                id={`subject-${subject}`}
                                checked={field.value?.includes(subject)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, subject]);
                                  } else {
                                    field.onChange(field.value.filter((s) => s !== subject));
                                  }
                                }}
                                data-testid={`checkbox-subject-${subject.toLowerCase()}`}
                              />
                              <Label htmlFor={`subject-${subject}`}>{subject}</Label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label>Topics (Optional)</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="Add a topic (e.g., Mechanics, Organic Chemistry)"
                        value={topicInput}
                        onChange={(e) => setTopicInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTopic())}
                        data-testid="input-topic"
                      />
                      <Button type="button" variant="outline" onClick={handleAddTopic} data-testid="button-add-topic">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="flex items-center gap-1">
                          {topic}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => handleRemoveTopic(topic)}
                            data-testid={`button-remove-topic-${topic}`}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={applicationForm.control}
                      name="hourlyRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hourly Rate (₹)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="500"
                              data-testid="input-hourly-rate"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={applicationForm.control}
                      name="experienceYears"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              data-testid="input-experience"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Education</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendEducation({ degree: "", institution: "", year: undefined })}
                        data-testid="button-add-education"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    {educationFields.map((field, index) => (
                      <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 p-3 border rounded-lg">
                        <FormField
                          control={applicationForm.control}
                          name={`education.${index}.degree`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Degree (e.g., M.Sc)" data-testid={`input-degree-${index}`} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={applicationForm.control}
                          name={`education.${index}.institution`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Institution" data-testid={`input-institution-${index}`} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={applicationForm.control}
                          name={`education.${index}.year`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input type="number" placeholder="Year" data-testid={`input-year-${index}`} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {educationFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeEducation(index)}
                            className="self-center"
                            data-testid={`button-remove-education-${index}`}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <FormField
                    control={applicationForm.control}
                    name="languages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Languages</FormLabel>
                        <div className="flex flex-wrap gap-3">
                          {LANGUAGES.map((lang) => (
                            <div key={lang} className="flex items-center gap-2">
                              <Checkbox
                                id={`lang-${lang}`}
                                checked={field.value?.includes(lang)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, lang]);
                                  } else {
                                    field.onChange(field.value.filter((l) => l !== lang));
                                  }
                                }}
                                data-testid={`checkbox-lang-${lang.toLowerCase()}`}
                              />
                              <Label htmlFor={`lang-${lang}`} className="text-sm">{lang}</Label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full md:w-auto"
                    disabled={applyMutation.isPending}
                    data-testid="button-submit-application"
                  >
                    {applyMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Submit Application
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : isMentor && mentor ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4" data-testid="tabs-list">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="profile" data-testid="tab-profile">Profile</TabsTrigger>
              <TabsTrigger value="availability" data-testid="tab-availability">Availability</TabsTrigger>
              <TabsTrigger value="bookings" data-testid="tab-bookings">Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card data-testid="card-rating">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Rating</CardTitle>
                    <Star className="h-4 w-4 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold" data-testid="text-rating">
                      {mentor.avgRating?.toFixed(1) || "N/A"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {mentor.reviewCount} reviews
                    </p>
                  </CardContent>
                </Card>

                <Card data-testid="card-sessions">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sessions</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold" data-testid="text-sessions">
                      {mentor.totalSessionsCompleted}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Completed sessions
                    </p>
                  </CardContent>
                </Card>

                <Card data-testid="card-earnings">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Earnings</CardTitle>
                    <DollarSign className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold" data-testid="text-earnings">
                      ₹{(mentor.totalEarningsCents / 100).toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Total earnings
                    </p>
                  </CardContent>
                </Card>

                <Card data-testid="card-upcoming">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                    <Calendar className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold" data-testid="text-upcoming-count">
                      {upcomingBookings.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Upcoming bookings
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Profile Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-lg">{user.name?.charAt(0) || "M"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg" data-testid="text-mentor-name">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {mentor.experienceYears} years experience
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {mentor.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" data-testid={`badge-subject-${subject}`}>
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-3">
                      {mentor.bio || "No bio provided"}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {mentor.recentBookings && mentor.recentBookings.length > 0 ? (
                      <div className="space-y-3">
                        {mentor.recentBookings.slice(0, 5).map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={booking.status === "completed" ? "default" : booking.status === "confirmed" ? "secondary" : "outline"}
                              >
                                {booking.status}
                              </Badge>
                              <span>{booking.studentName || "Student"}</span>
                            </div>
                            <span className="text-muted-foreground">
                              {new Date(booking.startAt).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">No recent activity</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>Update your mentor profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit((data) => updateProfileMutation.mutate(data))} className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                className="min-h-[120px]"
                                data-testid="input-profile-bio"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="subjects"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subjects</FormLabel>
                            <div className="flex flex-wrap gap-3">
                              {SUBJECTS.map((subject) => (
                                <div key={subject} className="flex items-center gap-2">
                                  <Checkbox
                                    id={`profile-subject-${subject}`}
                                    checked={field.value?.includes(subject)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([...(field.value || []), subject]);
                                      } else {
                                        field.onChange(field.value?.filter((s) => s !== subject) || []);
                                      }
                                    }}
                                    data-testid={`checkbox-profile-subject-${subject.toLowerCase()}`}
                                  />
                                  <Label htmlFor={`profile-subject-${subject}`}>{subject}</Label>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <Label>Topics</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            placeholder="Add a topic"
                            value={topicInput}
                            onChange={(e) => setTopicInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTopic())}
                            data-testid="input-profile-topic"
                          />
                          <Button type="button" variant="outline" onClick={handleAddTopic} data-testid="button-profile-add-topic">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {topics.map((topic) => (
                            <Badge key={topic} variant="secondary" className="flex items-center gap-1">
                              {topic}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTopic(topic)} />
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="hourlyRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hourly Rate (₹)</FormLabel>
                              <FormControl>
                                <Input type="number" data-testid="input-profile-rate" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="experienceYears"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Years of Experience</FormLabel>
                              <FormControl>
                                <Input type="number" data-testid="input-profile-experience" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="isAvailable"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-available"
                              />
                            </FormControl>
                            <FormLabel className="!mt-0">Available for new bookings</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="languages"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Languages</FormLabel>
                            <div className="flex flex-wrap gap-3">
                              {LANGUAGES.map((lang) => (
                                <div key={lang} className="flex items-center gap-2">
                                  <Checkbox
                                    id={`profile-lang-${lang}`}
                                    checked={field.value?.includes(lang)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([...(field.value || []), lang]);
                                      } else {
                                        field.onChange(field.value?.filter((l) => l !== lang) || []);
                                      }
                                    }}
                                    data-testid={`checkbox-profile-lang-${lang.toLowerCase()}`}
                                  />
                                  <Label htmlFor={`profile-lang-${lang}`} className="text-sm">{lang}</Label>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={updateProfileMutation.isPending}
                        data-testid="button-save-profile"
                      >
                        {updateProfileMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        Save Profile
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="availability" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Availability</CardTitle>
                  <CardDescription>Set your weekly availability for sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...availabilityForm}>
                    <form
                      onSubmit={availabilityForm.handleSubmit((data) => addAvailabilityMutation.mutate(data))}
                      className="flex flex-wrap gap-4 items-end"
                    >
                      <FormField
                        control={availabilityForm.control}
                        name="dayOfWeek"
                        render={({ field }) => (
                          <FormItem className="flex-1 min-w-[150px]">
                            <FormLabel>Day</FormLabel>
                            <Select onValueChange={(val) => field.onChange(parseInt(val))} value={field.value?.toString()}>
                              <FormControl>
                                <SelectTrigger data-testid="select-day">
                                  <SelectValue placeholder="Select day" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {DAYS_OF_WEEK.map((day, index) => (
                                  <SelectItem key={day} value={index.toString()} data-testid={`option-day-${day.toLowerCase()}`}>
                                    {day}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={availabilityForm.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem className="flex-1 min-w-[120px]">
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Input type="time" data-testid="input-start-time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={availabilityForm.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem className="flex-1 min-w-[120px]">
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                              <Input type="time" data-testid="input-end-time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={addAvailabilityMutation.isPending}
                        data-testid="button-add-availability"
                      >
                        {addAvailabilityMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                        Add
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {DAYS_OF_WEEK.map((day, dayIndex) => {
                      const daySlots = mentor.availability?.filter((a) => a.dayOfWeek === dayIndex) || [];
                      return (
                        <div key={day} className="flex items-start gap-4 p-3 border rounded-lg">
                          <div className="w-24 font-medium text-sm">{day}</div>
                          <div className="flex-1">
                            {daySlots.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {daySlots.map((slot) => (
                                  <Badge
                                    key={slot.id}
                                    variant="secondary"
                                    className="flex items-center gap-2"
                                    data-testid={`badge-slot-${slot.id}`}
                                  >
                                    {slot.startTime} - {slot.endTime}
                                    <X
                                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                                      onClick={() => deleteAvailabilityMutation.mutate(slot.id)}
                                      data-testid={`button-delete-slot-${slot.id}`}
                                    />
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">No availability set</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Pending & Upcoming Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingBookings.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg gap-4"
                          data-testid={`booking-${booking.id}`}
                        >
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={booking.studentAvatar || ""} />
                              <AvatarFallback>{booking.studentName?.charAt(0) || "S"}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{booking.studentName || "Student"}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(booking.startAt).toLocaleDateString()} at{" "}
                                {new Date(booking.startAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </p>
                              <Badge variant={booking.status === "confirmed" ? "default" : "outline"}>
                                {booking.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row gap-2 md:items-center">
                            {booking.status === "requested" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => updateBookingMutation.mutate({ id: booking.id, status: "confirmed" })}
                                  data-testid={`button-accept-${booking.id}`}
                                >
                                  <Check className="h-4 w-4 mr-1" /> Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateBookingMutation.mutate({ id: booking.id, status: "cancelled" })}
                                  data-testid={`button-decline-${booking.id}`}
                                >
                                  <XCircle className="h-4 w-4 mr-1" /> Decline
                                </Button>
                              </>
                            )}

                            {booking.status === "confirmed" && (
                              <div className="flex gap-2 items-center">
                                <Input
                                  placeholder="Meeting link"
                                  value={meetingLinkInput[booking.id] || booking.meetingLink || ""}
                                  onChange={(e) =>
                                    setMeetingLinkInput({ ...meetingLinkInput, [booking.id]: e.target.value })
                                  }
                                  className="w-48"
                                  data-testid={`input-meeting-link-${booking.id}`}
                                />
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    updateBookingMutation.mutate({
                                      id: booking.id,
                                      status: "confirmed",
                                      meetingLink: meetingLinkInput[booking.id],
                                    })
                                  }
                                  data-testid={`button-save-link-${booking.id}`}
                                >
                                  <LinkIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No upcoming bookings</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Past Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  {pastBookings.length > 0 ? (
                    <div className="space-y-3">
                      {pastBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                          data-testid={`past-booking-${booking.id}`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{booking.studentName?.charAt(0) || "S"}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{booking.studentName || "Student"}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(booking.startAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={booking.status === "completed" ? "default" : "destructive"}>
                              {booking.status}
                            </Badge>
                            <span className="text-sm font-medium">
                              ₹{(booking.priceCents / 100).toFixed(0)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No past bookings</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : null}
      </div>
    </div>
  );
}
