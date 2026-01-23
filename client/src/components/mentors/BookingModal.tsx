import { ChangeEvent, useMemo, useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addDays, addHours, format, setHours, setMinutes, startOfDay, parseISO, isFuture } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Calendar, CheckCircle, ChevronRight, Loader2, Sparkles, Globe2, Clock3 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { buildAvailableTimesForDate } from "./bookingUtils";

export interface MentorForBooking {
  id: number;
  userName: string;
  userAvatar?: string | null;
  subjects: string[];
  hourlyRate: number;
  calendarTimezone?: string | null;
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

interface BookingModalProps {
  mentor: MentorForBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBooked?: () => void;
  onSuccess?: () => void;
  mode?: "book" | "reschedule";
  bookingIdToReschedule?: number | null;
  initialStartAt?: string | null;
  initialEndAt?: string | null;
  onRescheduleComplete?: (bookingId: number) => Promise<void> | void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.25 },
};

export function BookingModal({
  mentor,
  open,
  onOpenChange,
  onBooked,
  onSuccess,
  mode = "book",
  bookingIdToReschedule,
  initialStartAt,
  initialEndAt,
  onRescheduleComplete,
}: BookingModalProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"select" | "confirm" | "success">("select");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [duration, setDuration] = useState(1);
  const [notes, setNotes] = useState("");
  const [viewMode, setViewMode] = useState<"days" | "calendar">("days");
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
  const [autoRedirect, setAutoRedirect] = useState(true);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const formatINR = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    []
  );
  const userTimezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);
  const formatInTimeZone = (date: Date, timeZone: string) =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    }).format(date);
  const mentorTimezone = mentor?.calendarTimezone || "UTC";
  const isReschedule = mode === "reschedule";
  const activeStepIndex = step === "select" ? 0 : step === "confirm" ? 1 : 2;
  const selectedStart = useMemo(() => {
    if (!selectedDate || !selectedTime) return null;
    const [h, m] = selectedTime.split(":").map(Number);
    const combined = new Date(selectedDate);
    combined.setHours(h, m, 0, 0);
    return combined;
  }, [selectedDate, selectedTime]);
  const mentorLocalTime = selectedStart ? formatInTimeZone(selectedStart, mentorTimezone) : null;
  const userLocalTime = selectedStart ? format(selectedStart, "hh:mm a") : null;
  const selectedDateLabel = selectedDate ? format(selectedDate, "EEE, MMM d") : "Pick a slot";
  const stepBadges = [
    { label: isReschedule ? "Pick new slot" : "Select slot", status: activeStepIndex >= 0 },
    { label: "Review", status: activeStepIndex >= 1 },
    { label: "Done", status: activeStepIndex >= 2 },
  ];

  const mentorId = mentor?.id;

  // Authentication check when opening modal
  useEffect(() => {
    if (open && !user) {
      toast({
        title: "Login Required",
        description: "Please log in to book a session with a mentor.",
        variant: "default",
      });
      onOpenChange(false);
      setLocation("/login");
    }
  }, [open, user, toast, onOpenChange, setLocation]);

  // Prefill selection when rescheduling
  useEffect(() => {
    if (!open || !initialStartAt) return;
    const start = new Date(initialStartAt);
    const end = initialEndAt ? new Date(initialEndAt) : null;
    setSelectedDate(startOfDay(start));
    setSelectedTime(format(start, "HH:mm"));
    if (end) {
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      if (hours > 0) setDuration(Math.round(hours));
    }
  }, [open, initialStartAt, initialEndAt]);

  // Focus trap for accessibility
  useEffect(() => {
    if (!open || !dialogContentRef.current) return;

    const container = dialogContentRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    firstElement?.focus();
    container.addEventListener("keydown", handleTab);
    window.addEventListener("keydown", handleEscape);

    return () => {
      container.removeEventListener("keydown", handleTab);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  const {
    data: availability,
    isLoading: isAvailabilityLoading,
    isError: isAvailabilityError,
    refetch: refetchAvailability,
  } = useQuery<AvailabilityData>({
    queryKey: ["/api/mentors", mentorId, "availability"],
    queryFn: async () => {
      const response = await fetch(`/api/mentors/${mentorId}/availability`);
      if (!response.ok) throw new Error("Failed to fetch availability");
      return response.json();
    },
    enabled: !!mentorId && open,
    placeholderData: (prev) => prev, // avoid flashing empty states on reopen
  });

  // Fetch previous bookings with this mentor for "Book Similar Time" suggestions
  const { data: previousBookings = [] } = useQuery<Array<{ startAt: string; endAt: string }>>({
    queryKey: ["/api/bookings", "student", mentorId],
    queryFn: async () => {
      const response = await fetch("/api/bookings", { credentials: "include" });
      if (!response.ok) return [];
      const bookings = await response.json();
      // Filter for completed bookings with this mentor
      return bookings
        .filter((b: any) => b.mentorId === mentorId && b.status === "completed")
        .slice(0, 3)
        .map((b: any) => ({ startAt: b.startAt, endAt: b.endAt }));
    },
    enabled: !!user && !!mentorId && open,
  });

  const similarTimeSuggestions = useMemo(() => {
    if (!previousBookings.length || !availability?.slots) return [];
    
    const suggestions: Array<{ date: Date; time: string }> = [];
    const today = startOfDay(new Date());
    
    previousBookings.forEach((booking) => {
      const prevStart = parseISO(booking.startAt);
      const prevTime = format(prevStart, "HH:mm");
      const prevDayOfWeek = prevStart.getDay();
      
      // Find next occurrence of the same day of week
      for (let i = 0; i < 14; i++) {
        const candidateDate = addDays(today, i);
        if (candidateDate.getDay() === prevDayOfWeek && isFuture(candidateDate)) {
          // Check if this time slot is available
          const daySlots = availability.slots.filter((s) => s.dayOfWeek === prevDayOfWeek);
          const [hour, minute] = prevTime.split(":").map(Number);
          
          const isAvailable = daySlots.some((slot) => {
            const [slotStartHour] = slot.startTime.split(":").map(Number);
            const [slotEndHour] = slot.endTime.split(":").map(Number);
            return hour >= slotStartHour && hour < slotEndHour;
          }) && !availability.bookedSlots?.some((booked) => {
            const bookedStart = new Date(booked.startAt);
            const bookedEnd = new Date(booked.endAt);
            const slotStart = setMinutes(setHours(candidateDate, hour), minute);
            const slotEnd = addHours(slotStart, duration);
            return slotStart < bookedEnd && slotEnd > bookedStart;
          });
          
          if (isAvailable) {
            suggestions.push({ date: candidateDate, time: prevTime });
            break;
          }
        }
      }
    });
    
    return suggestions.slice(0, 2);
  }, [previousBookings, availability, duration]);

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
    onMutate: async (data) => {
      setBookingError(null);
      const optimisticId = Math.random();
      const newBooking = {
        id: optimisticId,
        mentorId: data.mentorId,
        startAt: data.startAt,
        endAt: data.endAt,
        status: "requested",
        notes: data.notes,
      };
      await queryClient.cancelQueries({ queryKey: ["/api/bookings"] });
      const previous = queryClient.getQueryData<any[]>(["/api/bookings"]) || [];
      queryClient.setQueryData(["/api/bookings"], [...previous, newBooking]);
      return { previous };
    },
    onSuccess: (data) => {
      setStep("success");
      setRedirectCountdown(4);
      setAutoRedirect(true);
      onBooked?.();
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      if (isReschedule && bookingIdToReschedule && onRescheduleComplete) {
        Promise.resolve(onRescheduleComplete(bookingIdToReschedule)).catch((error) => {
          toast({
            title: "Reschedule warning",
            description: error?.message || "New slot booked, but updating the old booking failed.",
            variant: "destructive",
          });
        });
      }
      
      toast({
        title: isReschedule ? "Reschedule Requested!" : "Booking Requested!",
        description: `Your session with ${mentor?.userName} has been requested. You'll receive a confirmation once the mentor accepts.`,
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      
      // Parse error message for better user feedback
      let title = "Booking Failed";
      let description = error.message;
      setBookingError(description);
      
      const errorLower = error.message.toLowerCase();
      
      if (errorLower.includes("slot") || errorLower.includes("time") || errorLower.includes("unavailable")) {
        title = "Time Slot Unavailable";
        description = "This time slot has been booked or is no longer available. Please select another time.";
      } else if (errorLower.includes("mentor") && errorLower.includes("unavailable")) {
        title = "Mentor Unavailable";
        description = "The mentor is not available at this time. Please try another time slot or mentor.";
      } else if (errorLower.includes("verified") || errorLower.includes("verification")) {
        title = "Mentor Not Verified";
        description = "This mentor is not yet verified. Please choose another verified mentor.";
      } else if (errorLower.includes("401") || errorLower.includes("unauthorized") || errorLower.includes("login")) {
        title = "Authentication Required";
        description = "Please log in to book a session. Redirecting to login page...";
        setTimeout(() => setLocation("/login"), 2000);
      } else if (errorLower.includes("network") || errorLower.includes("fetch")) {
        title = "Network Error";
        description = "Unable to connect to the server. Please check your internet connection and try again.";
      } else if (errorLower.includes("400") || errorLower.includes("invalid")) {
        title = "Invalid Booking";
        description = "The booking details are invalid. Please check your selection and try again.";
      }
      
      toast({
        title,
        description,
        variant: "destructive",
      });
    },
  });

  const upcomingDays = useMemo(() => {
    const days = [] as Date[];
    const today = startOfDay(new Date());
    for (let i = 0; i < 14; i++) {
      days.push(addDays(today, i));
    }
    return days;
  }, []);

  const availableTimesForSelectedDate = useMemo(() => {
    if (!selectedDate || !availability?.slots) return [];
    return buildAvailableTimesForDate({
      selectedDate,
      slots: availability.slots,
      bookedSlots: availability.bookedSlots || [],
      durationHours: duration,
    });
  }, [selectedDate, availability, duration]);

  const totalPrice = mentor ? mentor.hourlyRate * duration : 0;

  const isSelectionValid = useMemo(() => {
    if (!selectedDate || !selectedTime) return false;
    return availableTimesForSelectedDate.includes(selectedTime);
  }, [selectedDate, selectedTime, availableTimesForSelectedDate]);

  const handleRedirectToBookings = () => {
    onOpenChange(false);
    setLocation("/my-bookings");
  };

  useEffect(() => {
    if (step !== "success" || !autoRedirect || redirectCountdown === null) return;
    if (redirectCountdown <= 0) {
      handleRedirectToBookings();
      return;
    }
    const timer = setTimeout(() => setRedirectCountdown((prev) => (prev === null ? prev : prev - 1)), 1000);
    return () => clearTimeout(timer);
  }, [step, autoRedirect, redirectCountdown]);

  const handleConfirmBooking = () => {
    if (!mentorId || !selectedDate || !selectedTime) {
      setBookingError("Select a date and time to continue.");
      return;
    }
    if (!isSelectionValid) {
      setBookingError("Selected time is no longer available. Please pick another slot.");
      return;
    }
    setBookingError(null);

    const [hour, minute] = selectedTime.split(":").map(Number);
    const startAt = setMinutes(setHours(selectedDate, hour), minute);
    const endAt = addHours(startAt, duration);
    if (startAt < new Date()) {
      setBookingError("Selected time is in the past. Choose a future slot.");
      return;
    }

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
    setBookingError(null);
    setRedirectCountdown(null);
    setAutoRedirect(true);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) resetModal();
    onOpenChange(next);
  };

  if (!mentor) return null;

  if (!user) {
    return null; // Don't render modal if user is not authenticated
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent 
        ref={dialogContentRef}
        className="max-w-5xl w-[calc(100%-1.5rem)] sm:w-full max-h-[92vh] overflow-y-auto top-[4%] translate-y-0 sm:top-[50%] sm:translate-y-[-50%]"
        data-testid="modal-booking"
        aria-labelledby="booking-title"
        aria-describedby="booking-description"
      >
        <div className="mb-4 overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-slate-900/80 text-white shadow-2xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <Sparkles className="h-6 w-6 text-amber-300" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.08em] text-white/70">Mentor booking</p>
                <p className="text-lg font-semibold">
                  {isReschedule ? "Find the perfect new slot" : "Book a world-class mentor"}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {stepBadges.map((item, idx) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs ${
                    item.status
                      ? "bg-emerald-500/15 text-emerald-100 border border-emerald-400/30"
                      : "bg-white/10 text-white/70 border border-white/10"
                  }`}
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      item.status ? "bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.25)]" : "bg-white/50"
                    }`}
                  />
                  <span>{idx + 1}. {item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 px-5 py-3 text-xs text-white/70 flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border border-white/20">
                <AvatarImage src={mentor.userAvatar || undefined} />
                <AvatarFallback className="bg-white/10 text-white">{mentor.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-white">{mentor.userName}</span>
              <span className="text-white/60">- {mentor.subjects.join(", ")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe2 className="h-4 w-4" />
              <span>Your tz: {userTimezone}</span>
              <span className="text-white/40">|</span>
              <span>Mentor tz: {mentorTimezone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock3 className="h-4 w-4" />
              <span>{selectedDateLabel}</span>
              {userLocalTime && <span>- {userLocalTime} ({userTimezone})</span>}
              {mentorLocalTime && <span className="text-white/60">/ {mentorLocalTime} ({mentorTimezone})</span>}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === "select" && (
            <motion.div key="select" {...fadeInUp}>
              <DialogHeader>
                <DialogTitle id="booking-title" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {isReschedule ? "Reschedule Session" : "Book Session"} with {mentor.userName}
                </DialogTitle>
                <DialogDescription id="booking-description">
                  {isReschedule
                    ? "Pick a new date and time. Your previous booking will be cancelled after you confirm."
                    : "Select a date and time for your mentoring session"}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4 lg:grid-cols-[1.6fr_1fr] items-start">
                <div className="space-y-6">
                  <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">Select Date</Label>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant={viewMode === "days" ? "secondary" : "ghost"}
                        onClick={() => setViewMode("days")}
                      >
                        2-wk strip
                      </Button>
                      <Button
                        size="sm"
                        variant={viewMode === "calendar" ? "secondary" : "ghost"}
                        onClick={() => setViewMode("calendar")}
                      >
                        Calendar
                      </Button>
                    </div>
                  </div>

                  {isAvailabilityLoading && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading availability...
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {Array.from({ length: 6 }).map((_, idx) => (
                          <Skeleton key={idx} className="h-16 w-14 rounded-lg" />
                        ))}
                      </div>
                    </div>
                  )}

                  {isAvailabilityError && (
                    <div className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm">
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Unable to load availability.</span>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => refetchAvailability()}>
                        Retry
                      </Button>
                    </div>
                  )}

                  {!isAvailabilityLoading && !isAvailabilityError && !availability?.slots?.length && (
                    <p className="text-sm text-muted-foreground">
                      This mentor hasn&apos;t published availability yet. Please check back later.
                    </p>
                  )}

                  {!isAvailabilityLoading && !isAvailabilityError && !!availability?.slots?.length && (
                    <>
                      {viewMode === "days" ? (
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
                                  setBookingError(null);
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
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
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
                                  setBookingError(null);
                                }}
                                disabled={!hasSlots}
                                className={`p-2 rounded-lg border text-center transition-all ${
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
                      )}
                    </>
                  )}
                </div>

                {similarTimeSuggestions.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Quick Book (Similar Time)</Label>
                    <div className="flex flex-wrap gap-2">
                      {similarTimeSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedDate(suggestion.date);
                            setSelectedTime(suggestion.time);
                          }}
                          className="px-3 py-2 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 text-sm font-medium transition-all"
                          data-testid={`button-similar-time-${idx}`}
                        >
                          {format(suggestion.date, "MMM d")} at {suggestion.time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDate && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Select Time</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Slots are shown in your timezone ({userTimezone}); mentor time ({mentorTimezone}) is shown beneath each slot.
                    </p>
                    {isAvailabilityLoading ? (
                      <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 8 }).map((_, idx) => (
                          <Skeleton key={idx} className="h-14 w-full rounded-lg" />
                        ))}
                      </div>
                    ) : availableTimesForSelectedDate.length > 0 ? (
                      <div className="grid grid-cols-4 gap-2">
                        {availableTimesForSelectedDate.map((time) => (
                          <button
                            key={time}
                            onClick={() => {
                              setSelectedTime(time);
                              setBookingError(null);
                            }}
                            className={`p-2 rounded-lg border text-sm font-medium transition-all text-left ${
                              selectedTime === time
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary/50"
                            }`}
                            data-testid={`button-time-${time}`}
                          >
                            <div className="font-semibold">{time} <span className="text-xs">({userTimezone})</span></div>
                            <div className="text-[11px] text-muted-foreground">
                              Mentor:{" "}
                              {selectedDate
                                ? formatInTimeZone(setMinutes(setHours(selectedDate, Number(time.split(":")[0])), Number(time.split(":")[1])), mentorTimezone)
                                : time}{" "}
                              ({mentorTimezone})
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">No available slots for this date.</p>
                    )}
                  </div>
                )}

                {!selectedDate && !isAvailabilityLoading && availability?.slots?.length && (
                  <p className="text-sm text-muted-foreground">Select a date to see available times.</p>
                )}

                <div>
                  <Label className="text-sm font-medium mb-2 block">Session Duration</Label>
                  <Select value={duration.toString()} onValueChange={(value: string) => setDuration(parseInt(value, 10))}>
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
                    <div className="text-2xl font-bold">{formatINR.format(totalPrice)}</div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <div className="font-medium">{formatINR.format(mentor.hourlyRate)}/hour</div>
                    <div>Your timezone: {userTimezone}</div>
                    <div>Mentor timezone: {mentorTimezone}</div>
                  </div>
                </div>
              </div>
            <div className="space-y-4 rounded-2xl border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Session summary</p>
                  <p className="text-lg font-semibold text-foreground">{selectedDateLabel}</p>
                  <p className="text-sm text-muted-foreground">
                    {userLocalTime ? `${userLocalTime} (${userTimezone})` : "Pick a time to see timezone sync"}
                  </p>
                </div>
                <div className="rounded-xl bg-background/70 px-3 py-2 text-right shadow-sm">
                  <div className="text-xs text-muted-foreground">Total</div>
                  <div className="text-2xl font-bold text-primary">{formatINR.format(totalPrice)}</div>
                  <div className="text-[11px] text-muted-foreground">{formatINR.format(mentor.hourlyRate)}/hour</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                <div className="rounded-lg border border-border/60 bg-background/70 p-3">
                  <div className="text-foreground font-semibold text-sm mb-1">Your timezone</div>
                  <div>{userTimezone}</div>
                  {userLocalTime && <div className="text-foreground text-sm">{userLocalTime}</div>}
                </div>
                <div className="rounded-lg border border-border/60 bg-background/70 p-3">
                  <div className="text-foreground font-semibold text-sm mb-1">Mentor timezone</div>
                  <div>{mentorTimezone}</div>
                  {mentorLocalTime && <div className="text-foreground text-sm">{mentorLocalTime}</div>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {stepBadges.map((item, idx) => (
                  <div
                    key={item.label}
                    className={`rounded-lg border px-3 py-2 ${
                      idx === activeStepIndex
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background/60 text-muted-foreground"
                    }`}
                  >
                    {idx + 1}. {item.label}
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 text-sm">
                <div className="font-semibold text-primary flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Visualize your slot
                </div>
                <p className="text-muted-foreground text-xs mt-1">
                  We align times across timezones so you never miss a session. Confirm to lock in this slot.
                </p>
              </div>

              <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                <Button variant="outline" onClick={() => handleOpenChange(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep("confirm")}
                  disabled={!selectedDate || !selectedTime || isAvailabilityLoading}
                  data-testid="button-continue-booking"
                  className="w-full sm:w-auto"
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </DialogFooter>
            </div>
          </div>
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
                  Review your booking details before confirming. You can cancel or reschedule later from My Bookings.
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
                        {mentor.subjects.join(", ")}
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
                      <div className="font-medium">
                        {selectedTime} <span className="text-xs text-muted-foreground">({userTimezone})</span>
                      </div>
                      {selectedDate && selectedTime && (
                        <div className="text-xs text-muted-foreground">
                          Mentor:{" "}
                          {formatInTimeZone(
                            setMinutes(
                              setHours(selectedDate, Number(selectedTime.split(":")[0])),
                              Number(selectedTime.split(":")[1])
                            ),
                            mentorTimezone
                          )}{" "}
                          ({mentorTimezone})
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-muted-foreground">Duration</div>
                      <div className="font-medium">{duration} hour{duration > 1 ? "s" : ""}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total Price</div>
                      <div className="font-bold text-primary">{formatINR.format(totalPrice)}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Notes (Optional)</Label>
                  <Input
                    placeholder="Any topics you'd like to focus on..."
                    value={notes}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNotes(e.target.value)}
                    data-testid="input-notes"
                  />
                </div>

                {bookingError && (
                  <div className="text-sm text-destructive rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2">
                    {bookingError}
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setStep("select")}>Back</Button>
                <Button onClick={handleConfirmBooking} data-testid="button-confirm-booking" disabled={createBookingMutation.isPending}>
                  {createBookingMutation.isPending
                    ? isReschedule
                      ? "Rescheduling..."
                      : "Booking..."
                    : isReschedule
                      ? "Confirm Reschedule"
                      : "Confirm Booking"}
                </Button>
              </DialogFooter>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div key="success" {...fadeInUp}>
              <DialogHeader>
                <div className="mx-auto h-12 w-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mb-4">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <DialogTitle>{isReschedule ? "Reschedule Requested!" : "Booking Requested!"}</DialogTitle>
                <DialogDescription>
                  {isReschedule
                    ? "Your session has been rescheduled. The previous booking will be closed, and the mentor will confirm the new time."
                    : "Your session has been requested. The mentor will confirm shortly, and you'll receive a notification."}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="text-sm text-green-600 dark:text-green-500 font-medium mb-2">
                    Next Steps:
                  </p>
                  <ul className="text-sm text-green-600 dark:text-green-500 space-y-1 list-disc list-inside">
                    <li>Wait for mentor confirmation (usually within 24 hours)</li>
                    <li>You'll receive a notification when confirmed</li>
                    <li>View and manage your booking in My Bookings</li>
                  </ul>
                </div>
                {redirectCountdown !== null && (
                  <div className="text-center text-xs text-muted-foreground">
                    Redirecting to My Bookings in {redirectCountdown}s{" "}
                    <button
                      type="button"
                      className="underline"
                      onClick={() => setAutoRedirect((v) => !v)}
                    >
                      {autoRedirect ? "(cancel)" : "(resume)"}
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleOpenChange(false)} className="flex-1">
                    Stay Here
                  </Button>
                  <Button 
                    onClick={handleRedirectToBookings} 
                    className="flex-1"
                  >
                    View My Bookings
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

export default BookingModal;

