import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { format, addHours, parseISO, startOfDay, addDays, setHours, setMinutes } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GraduationCap,
  Star,
  Clock,
  Languages,
  Search,
  Filter,
  BookOpen,
  Calendar,
  ChevronRight,
  Users,
  Award,
  X,
  Briefcase,
  MessageCircle,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  IndianRupee,
  CalendarDays,
  Timer,
  User,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const SUBJECTS = ["Physics", "Chemistry", "Biology"] as const;
const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi"];
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
  avgRating: number | null;
  reviewCount: number;
  totalSessionsCompleted: number;
  isAvailable: boolean;
  userName: string;
  userAvatar: string | null;
  userHeadline: string | null;
}

interface MentorDetailData extends MentorData {
  calendarTimezone: string | null;
  createdAt: string;
  reviews: Array<{
    id: number;
    rating: number;
    comment: string | null;
    createdAt: string;
    studentName: string | null;
    studentAvatar: string | null;
  }>;
}

interface AvailabilitySlot {
  id: number;
  mentorId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
}

interface BookedSlot {
  id: number;
  startAt: string;
  endAt: string;
  status: string;
}

interface AvailabilityData {
  slots: AvailabilitySlot[];
  bookedSlots: BookedSlot[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function StarRating({ rating, count }: { rating: number | null; count: number }) {
  const stars = rating || 0;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= stars
              ? "fill-yellow-500 text-yellow-500"
              : star - 0.5 <= stars
              ? "fill-yellow-500/50 text-yellow-500"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-1">
        ({count} {count === 1 ? "review" : "reviews"})
      </span>
    </div>
  );
}

function MentorCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </CardFooter>
    </Card>
  );
}

function MentorCard({
  mentor,
  onViewProfile,
  onBookSession,
}: {
  mentor: MentorData;
  onViewProfile: () => void;
  onBookSession: () => void;
}) {
  const initials = mentor.userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50" data-testid={`card-mentor-${mentor.id}`}>
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={mentor.userAvatar || undefined} alt={mentor.userName} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg truncate" data-testid={`text-mentor-name-${mentor.id}`}>
                {mentor.userName}
              </CardTitle>
              {mentor.userHeadline && (
                <p className="text-sm text-muted-foreground truncate">{mentor.userHeadline}</p>
              )}
              <StarRating rating={mentor.avgRating} count={mentor.reviewCount} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {mentor.bio && (
            <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-mentor-bio-${mentor.id}`}>
              {mentor.bio}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2">
            {(mentor.subjects as string[]).map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 rounded-md bg-green-500/10">
                <IndianRupee className="h-3.5 w-3.5 text-green-500" />
              </div>
              <span className="font-semibold">₹{mentor.hourlyRate}/hr</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 rounded-md bg-blue-500/10">
                <Briefcase className="h-3.5 w-3.5 text-blue-500" />
              </div>
              <span>{mentor.experienceYears} yrs exp</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 rounded-md bg-purple-500/10">
                <Users className="h-3.5 w-3.5 text-purple-500" />
              </div>
              <span>{mentor.totalSessionsCompleted} sessions</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 rounded-md bg-orange-500/10">
                <Languages className="h-3.5 w-3.5 text-orange-500" />
              </div>
              <span className="truncate">{(mentor.languages as string[]).slice(0, 2).join(", ")}</span>
            </div>
          </div>

          {mentor.isAvailable && (
            <Badge variant="outline" className="text-green-600 border-green-600/30 bg-green-500/10">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
              Available Now
            </Badge>
          )}
        </CardContent>
        <CardFooter className="flex gap-2 pt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onViewProfile}
            data-testid={`button-view-profile-${mentor.id}`}
          >
            View Profile
          </Button>
          <Button
            className="flex-1"
            onClick={onBookSession}
            data-testid={`button-book-session-${mentor.id}`}
          >
            Book Session
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function MentorProfileModal({
  mentorId,
  open,
  onOpenChange,
  onBookSession,
}: {
  mentorId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookSession: () => void;
}) {
  const { data: mentor, isLoading } = useQuery<MentorDetailData>({
    queryKey: ["/api/mentors", mentorId],
    queryFn: async () => {
      const response = await fetch(`/api/mentors/${mentorId}`);
      if (!response.ok) throw new Error("Failed to fetch mentor");
      return response.json();
    },
    enabled: !!mentorId && open,
  });

  const { data: availability } = useQuery<AvailabilityData>({
    queryKey: ["/api/mentors", mentorId, "availability"],
    queryFn: async () => {
      const response = await fetch(`/api/mentors/${mentorId}/availability`);
      if (!response.ok) throw new Error("Failed to fetch availability");
      return response.json();
    },
    enabled: !!mentorId && open,
  });

  if (!mentorId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col" data-testid="modal-mentor-profile">
        {isLoading ? (
          <div className="space-y-4 p-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : mentor ? (
          <>
            <DialogHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20 border-2 border-primary/20">
                  <AvatarImage src={mentor.userAvatar || undefined} alt={mentor.userName} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xl">
                    {mentor.userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <DialogTitle className="text-xl">{mentor.userName}</DialogTitle>
                  {mentor.userHeadline && (
                    <DialogDescription className="text-base">{mentor.userHeadline}</DialogDescription>
                  )}
                  <div className="mt-2">
                    <StarRating rating={mentor.avgRating} count={mentor.reviewCount} />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {(mentor.subjects as string[]).map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </DialogHeader>

            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    About
                  </h4>
                  <p className="text-muted-foreground">{mentor.bio || "No bio provided."}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-primary">₹{mentor.hourlyRate}</div>
                    <div className="text-xs text-muted-foreground">Per Hour</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-blue-500">{mentor.experienceYears}</div>
                    <div className="text-xs text-muted-foreground">Years Exp</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-purple-500">{mentor.totalSessionsCompleted}</div>
                    <div className="text-xs text-muted-foreground">Sessions</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-yellow-500">{mentor.avgRating?.toFixed(1) || "N/A"}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Education
                  </h4>
                  {(mentor.education as Array<{ degree: string; institution: string; year?: number }>).length > 0 ? (
                    <div className="space-y-2">
                      {(mentor.education as Array<{ degree: string; institution: string; year?: number }>).map((edu, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-2 rounded-lg bg-muted/30">
                          <Award className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium">{edu.degree}</div>
                            <div className="text-sm text-muted-foreground">
                              {edu.institution} {edu.year && `(${edu.year})`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No education details provided.</p>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(mentor.languages as string[]).map((lang) => (
                      <Badge key={lang} variant="outline">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {mentor.topics && (mentor.topics as string[]).length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Topics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(mentor.topics as string[]).map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Weekly Availability
                  </h4>
                  {availability?.slots && availability.slots.length > 0 ? (
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {DAYS_OF_WEEK.map((day, idx) => {
                        const daySlots = availability.slots.filter((s) => s.dayOfWeek === idx);
                        return (
                          <div key={day} className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">{day}</div>
                            {daySlots.length > 0 ? (
                              daySlots.map((slot) => (
                                <div
                                  key={slot.id}
                                  className="text-xs p-1 rounded bg-green-500/10 text-green-600"
                                >
                                  {slot.startTime}
                                </div>
                              ))
                            ) : (
                              <div className="text-xs p-1 text-muted-foreground">-</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No availability set.</p>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Reviews ({mentor.reviews?.length || 0})
                  </h4>
                  {mentor.reviews && mentor.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {mentor.reviews.map((review) => (
                        <div key={review.id} className="p-4 rounded-lg bg-muted/30">
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={review.studentAvatar || undefined} />
                              <AvatarFallback className="text-xs">
                                {review.studentName?.slice(0, 2).toUpperCase() || "AN"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{review.studentName || "Anonymous"}</div>
                              <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= review.rating
                                        ? "fill-yellow-500 text-yellow-500"
                                        : "text-muted-foreground/30"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {format(new Date(review.createdAt), "MMM d, yyyy")}
                            </div>
                          </div>
                          {review.comment && (
                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No reviews yet.</p>
                  )}
                </div>
              </div>
            </ScrollArea>

            <DialogFooter className="pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button onClick={onBookSession} data-testid="button-book-from-profile">
                <Calendar className="h-4 w-4 mr-2" />
                Book Session
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">Failed to load mentor details.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function BookingModal({
  mentorId,
  mentor,
  open,
  onOpenChange,
}: {
  mentorId: number | null;
  mentor: MentorData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<"select" | "confirm" | "success">("select");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [duration, setDuration] = useState(1);
  const [notes, setNotes] = useState("");

  const { data: availability } = useQuery<AvailabilityData>({
    queryKey: ["/api/mentors", mentorId, "availability"],
    queryFn: async () => {
      const response = await fetch(`/api/mentors/${mentorId}/availability`);
      if (!response.ok) throw new Error("Failed to fetch availability");
      return response.json();
    },
    enabled: !!mentorId && open,
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: { mentorId: number; startAt: string; endAt: string; notes?: string }) => {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create booking");
      }
      return response.json();
    },
    onSuccess: () => {
      setStep("success");
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const upcomingDays = useMemo(() => {
    const days = [];
    const today = startOfDay(new Date());
    for (let i = 0; i < 14; i++) {
      days.push(addDays(today, i));
    }
    return days;
  }, []);

  const availableTimesForSelectedDate = useMemo(() => {
    if (!selectedDate || !availability?.slots) return [];
    const dayOfWeek = selectedDate.getDay();
    const daySlots = availability.slots.filter((s) => s.dayOfWeek === dayOfWeek);
    
    const times: string[] = [];
    daySlots.forEach((slot) => {
      const [startHour] = slot.startTime.split(":").map(Number);
      const [endHour] = slot.endTime.split(":").map(Number);
      for (let hour = startHour; hour < endHour; hour++) {
        times.push(`${hour.toString().padStart(2, "0")}:00`);
      }
    });
    
    return times.filter((time) => {
      const [hour, minute] = time.split(":").map(Number);
      const slotStart = setMinutes(setHours(selectedDate, hour), minute);
      const slotEnd = addHours(slotStart, duration);
      
      return !availability.bookedSlots?.some((booked) => {
        const bookedStart = new Date(booked.startAt);
        const bookedEnd = new Date(booked.endAt);
        return (slotStart < bookedEnd && slotEnd > bookedStart);
      });
    });
  }, [selectedDate, availability, duration]);

  const totalPrice = mentor ? mentor.hourlyRate * duration : 0;

  const handleConfirmBooking = () => {
    if (!mentorId || !selectedDate || !selectedTime) return;
    
    const [hour, minute] = selectedTime.split(":").map(Number);
    const startAt = setMinutes(setHours(selectedDate, hour), minute);
    const endAt = addHours(startAt, duration);

    createBookingMutation.mutate({
      mentorId,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      notes: notes || undefined,
    });
  };

  const resetModal = () => {
    setStep("select");
    setSelectedDate(null);
    setSelectedTime(null);
    setDuration(1);
    setNotes("");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) resetModal();
    onOpenChange(open);
  };

  if (!mentorId || !mentor) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg" data-testid="modal-booking">
        <AnimatePresence mode="wait">
          {step === "select" && (
            <motion.div key="select" {...fadeInUp}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Book Session with {mentor.userName}
                </DialogTitle>
                <DialogDescription>
                  Select a date and time for your mentoring session
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Select Date</Label>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {upcomingDays.map((day) => {
                      const dayOfWeek = day.getDay();
                      const hasSlots = availability?.slots?.some((s) => s.dayOfWeek === dayOfWeek);
                      const isSelected = selectedDate && format(selectedDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");
                      
                      return (
                        <button
                          key={day.toISOString()}
                          onClick={() => {
                            setSelectedDate(day);
                            setSelectedTime(null);
                          }}
                          disabled={!hasSlots}
                          className={`flex-shrink-0 p-2 rounded-lg border text-center min-w-[60px] transition-all ${
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : hasSlots
                              ? "border-border hover:border-primary/50"
                              : "border-border/30 opacity-50 cursor-not-allowed"
                          }`}
                          data-testid={`button-date-${format(day, "yyyy-MM-dd")}`}
                        >
                          <div className="text-xs font-medium">{format(day, "EEE")}</div>
                          <div className="text-lg font-bold">{format(day, "d")}</div>
                          <div className="text-xs">{format(day, "MMM")}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Select Time</Label>
                    {availableTimesForSelectedDate.length > 0 ? (
                      <div className="grid grid-cols-4 gap-2">
                        {availableTimesForSelectedDate.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                              selectedTime === time
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary/50"
                            }`}
                            data-testid={`button-time-${time}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">No available slots for this date.</p>
                    )}
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium mb-2 block">Session Duration</Label>
                  <Select value={duration.toString()} onValueChange={(v) => setDuration(parseInt(v))}>
                    <SelectTrigger data-testid="select-duration">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Hour</SelectItem>
                      <SelectItem value="2">2 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Total Price</div>
                    <div className="text-2xl font-bold">₹{totalPrice}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Rate</div>
                    <div className="font-medium">₹{mentor.hourlyRate}/hour</div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => handleOpenChange(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep("confirm")}
                  disabled={!selectedDate || !selectedTime}
                  data-testid="button-continue-booking"
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </DialogFooter>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div key="confirm" {...fadeInUp}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Confirm Booking
                </DialogTitle>
                <DialogDescription>
                  Review your booking details before confirming
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="p-4 rounded-lg bg-muted/30 space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mentor.userAvatar || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {mentor.userName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{mentor.userName}</div>
                      <div className="text-sm text-muted-foreground">
                        {(mentor.subjects as string[]).join(", ")}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Date</div>
                      <div className="font-medium">
                        {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Time</div>
                      <div className="font-medium">{selectedTime}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Duration</div>
                      <div className="font-medium">{duration} hour{duration > 1 ? "s" : ""}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total Price</div>
                      <div className="font-bold text-primary">₹{totalPrice}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Notes (Optional)</Label>
                  <Input
                    placeholder="Any topics you'd like to focus on..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    data-testid="input-booking-notes"
                  />
                </div>

                {!user && (
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                    <p className="text-sm text-yellow-600 dark:text-yellow-500">
                      Please{" "}
                      <Link href="/login" className="underline font-medium">
                        log in
                      </Link>{" "}
                      to complete your booking.
                    </p>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setStep("select")}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <Button
                  onClick={handleConfirmBooking}
                  disabled={!user || createBookingMutation.isPending}
                  data-testid="button-confirm-booking"
                >
                  {createBookingMutation.isPending ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirm Booking
                    </>
                  )}
                </Button>
              </DialogFooter>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div key="success" {...fadeInUp} className="text-center py-8">
              <div className="mb-4">
                <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <DialogTitle className="mb-2">Booking Confirmed!</DialogTitle>
              <DialogDescription className="mb-6">
                Your session with {mentor.userName} has been requested. 
                You'll receive a confirmation once the mentor accepts.
              </DialogDescription>
              <div className="space-y-2">
                <Button onClick={() => handleOpenChange(false)} className="w-full" data-testid="button-done">
                  Done
                </Button>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    View My Bookings
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

export default function MentorDiscovery() {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number]>([5000]);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedMentorId, setSelectedMentorId] = useState<number | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingMentor, setBookingMentor] = useState<MentorData | null>(null);

  const { data: mentors, isLoading, error } = useQuery<MentorData[]>({
    queryKey: ["/api/mentors"],
    queryFn: async () => {
      const response = await fetch("/api/mentors");
      if (!response.ok) throw new Error("Failed to fetch mentors");
      return response.json();
    },
  });

  const filteredMentors = useMemo(() => {
    if (!mentors) return [];
    
    return mentors.filter((mentor) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!mentor.userName.toLowerCase().includes(query) &&
            !(mentor.bio?.toLowerCase().includes(query))) {
          return false;
        }
      }

      if (selectedSubjects.length > 0) {
        const mentorSubjects = mentor.subjects as string[];
        if (!selectedSubjects.some((s) => mentorSubjects.includes(s))) {
          return false;
        }
      }

      if (selectedLanguage) {
        const mentorLanguages = mentor.languages as string[];
        if (!mentorLanguages.includes(selectedLanguage)) {
          return false;
        }
      }

      if (mentor.hourlyRate > priceRange[0]) {
        return false;
      }

      return true;
    });
  }, [mentors, searchQuery, selectedSubjects, selectedLanguage, priceRange]);

  const handleViewProfile = (mentor: MentorData) => {
    setSelectedMentorId(mentor.id);
    setProfileModalOpen(true);
  };

  const handleBookSession = (mentor: MentorData) => {
    setBookingMentor(mentor);
    setSelectedMentorId(mentor.id);
    setBookingModalOpen(true);
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSubjects([]);
    setSelectedLanguage("");
    setPriceRange([5000]);
    setSelectedDays([]);
  };

  const hasActiveFilters = searchQuery || selectedSubjects.length > 0 || selectedLanguage || priceRange[0] < 5000 || selectedDays.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                  NP
                </div>
                <span className="font-bold text-xl hidden sm:block">NEET Prep</span>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/mentors" className="text-foreground font-medium">
              Find Mentors
            </Link>
            <Link href="/enroll" className="text-muted-foreground hover:text-foreground transition-colors">
              Explore
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Link href="/login">
              <Button variant="ghost" data-testid="button-login">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button data-testid="button-signup">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline" data-testid="badge-mentors">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Expert Mentorship
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-title">
            Find Your{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              NEET Mentor
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-subtitle">
            Connect with experienced NEET educators for personalized 1-on-1 guidance. 
            Get expert help in Physics, Chemistry, and Biology from verified mentors.
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mentors by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
              data-testid="button-toggle-filters"
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                  {selectedSubjects.length + (selectedLanguage ? 1 : 0) + (priceRange[0] < 5000 ? 1 : 0)}
                </Badge>
              )}
            </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-muted-foreground"
                data-testid="button-clear-filters"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Card className="mt-4 p-6" data-testid="panel-filters">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Subjects</Label>
                      <div className="space-y-2">
                        {SUBJECTS.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <Checkbox
                              id={`subject-${subject}`}
                              checked={selectedSubjects.includes(subject)}
                              onCheckedChange={() => toggleSubject(subject)}
                              data-testid={`checkbox-subject-${subject.toLowerCase()}`}
                            />
                            <Label
                              htmlFor={`subject-${subject}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {subject}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-3 block">Language</Label>
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger data-testid="select-language">
                          <SelectValue placeholder="Any language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any language</SelectItem>
                          {LANGUAGES.map((lang) => (
                            <SelectItem key={lang} value={lang}>
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Max Price: ₹{priceRange[0]}/hr
                      </Label>
                      <Slider
                        value={priceRange}
                        onValueChange={(v) => setPriceRange(v as [number])}
                        max={5000}
                        min={100}
                        step={100}
                        className="py-4"
                        data-testid="slider-price"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₹100</span>
                        <span>₹5000</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-3 block">Availability</Label>
                      <div className="flex flex-wrap gap-1">
                        {DAYS_OF_WEEK.map((day, idx) => (
                          <button
                            key={day}
                            onClick={() => {
                              setSelectedDays((prev) =>
                                prev.includes(idx) ? prev.filter((d) => d !== idx) : [...prev, idx]
                              );
                            }}
                            className={`px-2 py-1 text-xs rounded border transition-all ${
                              selectedDays.includes(idx)
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary/50"
                            }`}
                            data-testid={`button-day-${day.toLowerCase()}`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="loading-skeleton">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <MentorCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <Card className="p-12 text-center" data-testid="error-state">
            <div className="text-red-500 mb-4">
              <X className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Failed to Load Mentors</h3>
            <p className="text-muted-foreground mb-4">Please try again later.</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </Card>
        ) : filteredMentors.length === 0 ? (
          <Card className="p-12 text-center" data-testid="empty-state">
            <div className="text-muted-foreground mb-4">
              <Users className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Mentors Found</h3>
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters
                ? "Try adjusting your filters to find more mentors."
                : "No mentors are currently available. Please check back later."}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground" data-testid="text-results-count">
                Showing {filteredMentors.length} mentor{filteredMentors.length !== 1 ? "s" : ""}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-testid="grid-mentors"
            >
              {filteredMentors.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                  onViewProfile={() => handleViewProfile(mentor)}
                  onBookSession={() => handleBookSession(mentor)}
                />
              ))}
            </motion.div>
          </>
        )}
      </main>

      <MentorProfileModal
        mentorId={selectedMentorId}
        open={profileModalOpen}
        onOpenChange={setProfileModalOpen}
        onBookSession={() => {
          setProfileModalOpen(false);
          if (selectedMentorId) {
            const mentor = mentors?.find((m) => m.id === selectedMentorId);
            if (mentor) {
              setBookingMentor(mentor);
              setBookingModalOpen(true);
            }
          }
        }}
      />

      <BookingModal
        mentorId={selectedMentorId}
        mentor={bookingMentor}
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
      />

      <footer className="border-t border-border/40 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                NP
              </div>
              <span className="font-semibold">NEET Prep</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NEET Prep. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
