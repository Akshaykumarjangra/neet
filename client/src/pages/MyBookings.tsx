import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format, isPast, isFuture, parseISO } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import BookingModal, { type MentorForBooking } from "@/components/mentors/BookingModal";
import { deriveHourlyRate } from "@/components/mentors/bookingUtils";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  Clock,
  Video,
  X,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Star,
  Filter,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { Link } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { ReviewModal } from "@/components/mentors/ReviewModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StudentBooking {
  id: number;
  mentorId: number;
  mentorName: string | null;
  mentorAvatar?: string | null;
  startAt: string;
  endAt: string;
  status: "requested" | "confirmed" | "completed" | "cancelled";
  meetingLink?: string | null;
  priceCents?: number;
  createdAt: string;
  updatedAt: string;
  notes?: string | null;
}

type BookingFilter = "all" | "upcoming" | "past" | "cancelled";

export default function MyBookings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<BookingFilter>("all");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<StudentBooking | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [bookingToReview, setBookingToReview] = useState<StudentBooking | null>(null);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [bookingToReschedule, setBookingToReschedule] = useState<StudentBooking | null>(null);

  const { data: bookings = [], isLoading, refetch } = useQuery<StudentBooking[]>({
    queryKey: ["/api/bookings", "student"],
    queryFn: async () => {
      const response = await fetch("/api/bookings", { credentials: "include" });
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!user?.id,
    staleTime: 60 * 1000,
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: number) => {
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to cancel booking");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking cancelled",
        description: "Your booking has been cancelled successfully.",
      });
      setCancelDialogOpen(false);
      setBookingToCancel(null);
      refetch();
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const rescheduleCancelMutation = useMutation({
    mutationFn: async (bookingId: number) => {
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to cancel previous booking");
      }
      return response.json();
    },
    onError: (error: Error) => {
      toast({
        title: "Reschedule issue",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { data: rescheduleMentorDetails } = useQuery<any>({
    queryKey: ["/api/mentors", bookingToReschedule?.mentorId],
    queryFn: async () => {
      if (!bookingToReschedule?.mentorId) return null;
      const response = await fetch(`/api/mentors/${bookingToReschedule.mentorId}`, { credentials: "include" });
      if (!response.ok) throw new Error("Failed to load mentor details");
      return response.json();
    },
    enabled: !!bookingToReschedule,
  });

  const rescheduleMentor: MentorForBooking | null = useMemo(() => {
    if (!bookingToReschedule) return null;
    if (rescheduleMentorDetails) {
      return {
        id: rescheduleMentorDetails.id,
        userName: rescheduleMentorDetails.userName,
        userAvatar: rescheduleMentorDetails.userAvatar,
        subjects: rescheduleMentorDetails.subjects || [],
        hourlyRate: rescheduleMentorDetails.hourlyRate || 0,
        calendarTimezone: rescheduleMentorDetails.calendarTimezone,
      };
    }
    const derivedRate = deriveHourlyRate(
      bookingToReschedule.priceCents ?? 0,
      bookingToReschedule.startAt,
      bookingToReschedule.endAt
    );
    return {
      id: bookingToReschedule.mentorId,
      userName: bookingToReschedule.mentorName || "Mentor",
      userAvatar: bookingToReschedule.mentorAvatar,
      subjects: [],
      hourlyRate: derivedRate,
      calendarTimezone: undefined,
    };
  }, [bookingToReschedule, rescheduleMentorDetails]);

  const filteredBookings = useMemo(() => {
    const now = new Date();
    switch (activeTab) {
      case "upcoming":
        return bookings.filter(
          (b) => (b.status === "requested" || b.status === "confirmed") && isFuture(parseISO(b.startAt))
        );
      case "past":
        return bookings.filter((b) => b.status === "completed" || isPast(parseISO(b.startAt)));
      case "cancelled":
        return bookings.filter((b) => b.status === "cancelled");
      default:
        return bookings;
    }
  }, [bookings, activeTab]);

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    return new Date(b.startAt).getTime() - new Date(a.startAt).getTime();
  });

  const stats = useMemo(() => {
    const now = new Date();
    const upcoming = bookings.filter(
      (b) => (b.status === "requested" || b.status === "confirmed") && isFuture(parseISO(b.startAt))
    );
    const past = bookings.filter((b) => b.status === "completed" || isPast(parseISO(b.startAt)));
    const cancelled = bookings.filter((b) => b.status === "cancelled");
    return {
      total: bookings.length,
      upcoming: upcoming.length,
      past: past.length,
      cancelled: cancelled.length,
    };
  }, [bookings]);

  const handleCancelBooking = (booking: StudentBooking) => {
    setBookingToCancel(booking);
    setCancelDialogOpen(true);
  };

  const confirmCancel = () => {
    if (bookingToCancel) {
      cancelBookingMutation.mutate(bookingToCancel.id);
    }
  };

  const handleRescheduleComplete = async (bookingId: number) => {
    if (!bookingId) return;
    await rescheduleCancelMutation.mutateAsync(bookingId);
    refetch();
    queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
  };

  const openReschedule = (booking: StudentBooking) => {
    setBookingToReschedule(booking);
    setRescheduleModalOpen(true);
  };

  const getStatusBadge = (status: StudentBooking["status"]) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmed
          </Badge>
        );
      case "requested":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-600">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="secondary">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive">
            <X className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
              <p className="text-muted-foreground">Manage your mentor sessions</p>
            </div>
            <Link href="/mentors">
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Book New Session
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">Total</div>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">Upcoming</div>
                <div className="text-2xl font-bold text-green-600">{stats.upcoming}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">Past</div>
                <div className="text-2xl font-bold">{stats.past}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">Cancelled</div>
                <div className="text-2xl font-bold text-destructive">{stats.cancelled}</div>
              </CardContent>
            </Card>
          </div>

          {/* Bookings List */}
          <Card>
            <CardHeader>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as BookingFilter)}>
                <TabsList>
                  <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming ({stats.upcoming})</TabsTrigger>
                  <TabsTrigger value="past">Past ({stats.past})</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled ({stats.cancelled})</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              ) : sortedBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                  <p className="text-muted-foreground mb-4">
                    {activeTab === "all"
                      ? "You haven't booked any sessions yet."
                      : `No ${activeTab} bookings found.`}
                  </p>
                  <Link href="/mentors">
                    <Button>
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Your First Session
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedBookings.map((booking) => {
                    const startDate = parseISO(booking.startAt);
                    const endDate = parseISO(booking.endAt);
                    const isUpcoming = isFuture(startDate) && (booking.status === "requested" || booking.status === "confirmed");
                    const canJoin = booking.status === "confirmed" && booking.meetingLink && isUpcoming;
                    const canCancel = isUpcoming && booking.status !== "cancelled";
                    const canReschedule = isUpcoming && booking.status !== "cancelled";
                    const canReview = booking.status === "completed" && isPast(endDate);

                    return (
                      <div
                        key={booking.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={booking.mentorAvatar || undefined} />
                              <AvatarFallback>
                                {booking.mentorName?.charAt(0) || "M"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">{booking.mentorName || "Mentor"}</h3>
                                {getStatusBadge(booking.status)}
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  {format(startDate, "EEEE, MMMM d, yyyy")}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  {format(startDate, "h:mm a")} - {format(endDate, "h:mm a")}
                                </div>
                                {booking.priceCents && (
                                  <div className="flex items-center gap-2">
                                    <span>₹{(booking.priceCents / 100).toFixed(2)}</span>
                                  </div>
                                )}
                                {booking.notes && (
                                  <div className="mt-2 p-2 bg-muted rounded text-xs">
                                    <strong>Notes:</strong> {booking.notes}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {canJoin && (
                              <Button
                                size="sm"
                                onClick={() => window.open(booking.meetingLink!, "_blank")}
                              >
                                <Video className="h-4 w-4 mr-2" />
                                Join Meeting
                              </Button>
                            )}
                            {canCancel && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCancelBooking(booking)}
                                disabled={cancelBookingMutation.isPending}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            )}
                            {canReschedule && (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => openReschedule(booking)}
                              >
                                <Clock className="h-4 w-4 mr-2" />
                                Reschedule
                              </Button>
                            )}
                            {canReview && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setBookingToReview(booking);
                                  setReviewModalOpen(true);
                                }}
                              >
                                <Star className="h-4 w-4 mr-2" />
                                Leave Review
                              </Button>
                            )}
                            <Link href={`/mentors/${booking.mentorId}`}>
                              <Button size="sm" variant="ghost">
                                View Profile
                                <ExternalLink className="h-4 w-4 ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {bookingToCancel && (
            <div className="py-4">
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Mentor:</span>
                  <span className="ml-2 font-medium">{bookingToCancel.mentorName}</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="ml-2 font-medium">
                    {format(parseISO(bookingToCancel.startAt), "MMMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Keep Booking
            </Button>
            <Button
              variant="destructive"
              onClick={confirmCancel}
              disabled={cancelBookingMutation.isPending}
            >
              {cancelBookingMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Cancel Booking"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      {bookingToReview && (
        <ReviewModal
          bookingId={bookingToReview.id}
          mentorId={bookingToReview.mentorId}
          mentorName={bookingToReview.mentorName || "Mentor"}
          open={reviewModalOpen}
          onOpenChange={(open) => {
            setReviewModalOpen(open);
            if (!open) {
              setBookingToReview(null);
              refetch();
            }
          }}
          onSuccess={() => {
            refetch();
          }}
        />
      )}
      {rescheduleModalOpen && bookingToReschedule && rescheduleMentor && (
        <BookingModal
          mentor={rescheduleMentor}
          open={rescheduleModalOpen}
          onOpenChange={(open) => {
            setRescheduleModalOpen(open);
            if (!open) {
              setBookingToReschedule(null);
            }
          }}
          onBooked={() => {
            refetch();
            queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
          }}
          mode="reschedule"
          bookingIdToReschedule={bookingToReschedule.id}
          initialStartAt={bookingToReschedule.startAt}
          initialEndAt={bookingToReschedule.endAt}
          onRescheduleComplete={handleRescheduleComplete}
        />
      )}
    </div>
  );
}

