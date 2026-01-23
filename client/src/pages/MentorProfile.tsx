import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import BookingModal, { type MentorForBooking } from "@/components/mentors/BookingModal";
import {
  GraduationCap,
  Star,
  IndianRupee,
  Briefcase,
  Users,
  Languages,
  CheckCircle,
  Calendar,
  Award,
  BookOpen,
  MessageCircle,
  ArrowLeft,
  Share2,
  Clock,
  TrendingUp,
  Loader2,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

interface MentorDetailData {
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

interface AvailabilityData {
  slots: AvailabilitySlot[];
  bookedSlots: Array<{ id: number; startAt: string; endAt: string; status: string }>;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function StarRating({ rating, count, size = "default" }: { rating: number | null; count: number; size?: "default" | "large" }) {
  if (!rating && count === 0) {
    return (
      <div className="flex items-center gap-1 text-muted-foreground">
        <Star className={size === "large" ? "h-5 w-5" : "h-4 w-4"} />
        <span className={size === "large" ? "text-base" : "text-sm"}>New mentor</span>
      </div>
    );
  }

  const fullStars = Math.floor(rating || 0);
  const hasHalfStar = (rating || 0) - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${size === "large" ? "h-5 w-5" : "h-4 w-4"} ${
              i < fullStars
                ? "fill-yellow-400 text-yellow-400"
                : i === fullStars && hasHalfStar
                ? "fill-yellow-400/50 text-yellow-400"
                : "fill-none text-muted-foreground"
            }`}
          />
        ))}
      </div>
      <span className={`${size === "large" ? "text-lg font-semibold ml-2" : "text-sm ml-1"}`}>
        {rating?.toFixed(1)}
      </span>
      {count > 0 && (
        <span className={`${size === "large" ? "text-base" : "text-sm"} text-muted-foreground ml-1`}>
          ({count} {count === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}

export default function MentorProfile() {
  const [, params] = useRoute<{ id: string }>("/mentors/:id");
  const mentorId = params?.id ? parseInt(params.id, 10) : null;
  const { user } = useAuth();
  const { toast } = useToast();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<MentorForBooking | null>(null);

  const { data: mentor, isLoading, error } = useQuery<MentorDetailData>({
    queryKey: ["/api/mentors", mentorId],
    queryFn: async () => {
      const response = await fetch(`/api/mentors/${mentorId}`);
      if (!response.ok) throw new Error("Failed to fetch mentor");
      return response.json();
    },
    enabled: !!mentorId,
  });

  const { data: availability } = useQuery<AvailabilityData>({
    queryKey: ["/api/mentors", mentorId, "availability"],
    queryFn: async () => {
      const response = await fetch(`/api/mentors/${mentorId}/availability`);
      if (!response.ok) throw new Error("Failed to fetch availability");
      return response.json();
    },
    enabled: !!mentorId,
  });

  const handleBookSession = () => {
    if (!mentor) return;
    setSelectedMentor({
      id: mentor.id,
      userName: mentor.userName,
      userAvatar: mentor.userAvatar ?? null,
      subjects: mentor.subjects,
      hourlyRate: mentor.hourlyRate,
    });
    setShowBookingModal(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${mentor?.userName} - NEET Mentor`,
          text: `Check out ${mentor?.userName} on NEET Prep`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Profile link has been copied to clipboard.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !mentor) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto p-12 text-center">
            <X className="h-12 w-12 mx-auto text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-2">Mentor Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The mentor you're looking for doesn't exist or is no longer available.
            </p>
            <Link href="/mentors">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse All Mentors
              </Button>
            </Link>
          </Card>
        </main>
      </div>
    );
  }

  const initials = mentor.userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Back Button */}
          <Link href="/mentors">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Mentors
            </Button>
          </Link>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                    <AvatarImage src={mentor.userAvatar || undefined} alt={mentor.userName} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-3xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                          {mentor.userName}
                          <CheckCircle className="h-6 w-6 text-primary" />
                        </h1>
                        {mentor.userHeadline && (
                          <p className="text-lg text-muted-foreground mb-4">{mentor.userHeadline}</p>
                        )}
                        <StarRating rating={mentor.avgRating} count={mentor.reviewCount} size="large" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={handleShare}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-md bg-green-500/10">
                          <IndianRupee className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Hourly Rate</div>
                          <div className="font-semibold">₹{mentor.hourlyRate}/hr</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-md bg-blue-500/10">
                          <Briefcase className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Experience</div>
                          <div className="font-semibold">{mentor.experienceYears} years</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-md bg-purple-500/10">
                          <Users className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Sessions</div>
                          <div className="font-semibold">{mentor.totalSessionsCompleted}</div>
                        </div>
                      </div>
                      {mentor.isAvailable && (
                        <Badge variant="outline" className="text-green-600 border-green-600/30 bg-green-500/10">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                          Available Now
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button size="lg" onClick={handleBookSession} className="flex-1 min-w-[200px]">
              <Calendar className="h-5 w-5 mr-2" />
              Book Session
            </Button>
            <Button variant="outline" size="lg" disabled>
              <MessageCircle className="h-5 w-5 mr-2" />
              Message (Coming Soon)
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {mentor.bio ? (
                    <p className="text-muted-foreground leading-relaxed">{mentor.bio}</p>
                  ) : (
                    <p className="text-muted-foreground italic">No bio available.</p>
                  )}

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Education
                    </h3>
                    {mentor.education.length > 0 ? (
                      <div className="space-y-3">
                        {mentor.education.map((edu, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
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
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Subjects & Topics
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Subjects</div>
                        <div className="flex flex-wrap gap-2">
                          {mentor.subjects.map((subject) => (
                            <Badge key={subject} variant="secondary" className="text-sm py-1">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {mentor.topics && mentor.topics.length > 0 && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Topics</div>
                          <div className="flex flex-wrap gap-2">
                            {mentor.topics.map((topic) => (
                              <Badge key={topic} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Languages className="h-4 w-4" />
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mentor.languages.map((lang) => (
                        <Badge key={lang} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Reviews ({mentor.reviews.length})</span>
                    <StarRating rating={mentor.avgRating} count={mentor.reviewCount} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mentor.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {mentor.reviews.map((review) => (
                        <div key={review.id} className="p-4 rounded-lg bg-muted/30">
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={review.studentAvatar || undefined} />
                              <AvatarFallback>
                                {review.studentName?.slice(0, 2).toUpperCase() || "AN"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-medium">{review.studentName || "Anonymous"}</div>
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
                            <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No reviews yet.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Availability */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Weekly Availability
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                    <p className="text-muted-foreground text-sm">No availability set.</p>
                  )}
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Sessions</span>
                    <span className="font-semibold">{mentor.totalSessionsCompleted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Average Rating</span>
                    <span className="font-semibold">
                      {mentor.avgRating ? mentor.avgRating.toFixed(1) : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Member Since</span>
                    <span className="font-semibold">
                      {format(new Date(mentor.createdAt), "MMM yyyy")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {showBookingModal && selectedMentor && (
        <BookingModal
          mentor={selectedMentor}
          open={showBookingModal}
          onOpenChange={setShowBookingModal}
          onSuccess={() => {
            setShowBookingModal(false);
            setSelectedMentor(null);
          }}
        />
      )}
    </div>
  );
}

