import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import {
  GraduationCap,
  Star,
  IndianRupee,
  Briefcase,
  Users,
  Languages,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export interface MentorCardData {
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
  verificationStatus?: string;
}

interface MentorCardProps {
  mentor: MentorCardData;
  onViewProfile?: () => void;
  onBookSession?: () => void;
  size?: "compact" | "standard" | "featured";
  showQuickBook?: boolean;
  className?: string;
}

function StarRating({ rating, count }: { rating: number | null; count: number }) {
  if (!rating && count === 0) {
    return (
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Star className="h-3 w-3" />
        <span>New mentor</span>
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
            className={`h-3 w-3 ${
              i < fullStars
                ? "fill-yellow-400 text-yellow-400"
                : i === fullStars && hasHalfStar
                ? "fill-yellow-400/50 text-yellow-400"
                : "fill-none text-muted-foreground"
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-medium ml-1">{rating?.toFixed(1)}</span>
      {count > 0 && (
        <span className="text-xs text-muted-foreground ml-1">({count})</span>
      )}
    </div>
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25 },
};

export function MentorCard({
  mentor,
  onViewProfile,
  onBookSession,
  size = "standard",
  showQuickBook = true,
  className = "",
}: MentorCardProps) {
  const { user } = useAuth();
  const initials = mentor.userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isFeatured = size === "featured";
  const isCompact = size === "compact";

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={!isCompact ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={className}
    >
      <Card
        className={`h-full hover:shadow-lg transition-all duration-300 border-border/50 ${
          isFeatured ? "border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent" : ""
        }`}
        data-testid={`card-mentor-${mentor.id}`}
      >
        <CardHeader className={`${isCompact ? "pb-2" : "pb-4"}`}>
          <div className="flex items-start gap-3">
            <Avatar className={`${isFeatured ? "h-20 w-20 border-2" : isCompact ? "h-12 w-12" : "h-16 w-16"} border-primary/20`}>
              <AvatarImage src={mentor.userAvatar || undefined} alt={mentor.userName} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className={`${isFeatured ? "text-xl" : isCompact ? "text-base" : "text-lg"} truncate`} data-testid={`text-mentor-name-${mentor.id}`}>
                    {mentor.userName}
                    {mentor.verificationStatus === "approved" && (
                      <CheckCircle className="inline-block h-4 w-4 ml-1 text-primary" />
                    )}
                  </CardTitle>
                  {mentor.userHeadline && !isCompact && (
                    <p className={`${isFeatured ? "text-sm" : "text-xs"} text-muted-foreground truncate mt-1`}>
                      {mentor.userHeadline}
                    </p>
                  )}
                  <div className="mt-1">
                    <StarRating rating={mentor.avgRating} count={mentor.reviewCount} />
                  </div>
                </div>
                {isFeatured && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className={isCompact ? "space-y-2" : "space-y-4"}>
          {mentor.bio && !isCompact && (
            <p className={`${isFeatured ? "text-sm" : "text-xs"} text-muted-foreground ${isFeatured ? "line-clamp-3" : "line-clamp-2"}`} data-testid={`text-mentor-bio-${mentor.id}`}>
              {mentor.bio}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {mentor.subjects.slice(0, isCompact ? 2 : 4).map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
            {mentor.subjects.length > (isCompact ? 2 : 4) && (
              <Badge variant="outline" className="text-xs">
                +{mentor.subjects.length - (isCompact ? 2 : 4)} more
              </Badge>
            )}
          </div>

          <div className={`grid ${isCompact ? "grid-cols-2" : "grid-cols-2"} gap-2 ${isCompact ? "pt-1" : "pt-2"}`}>
            <div className="flex items-center gap-2 text-xs">
              <div className="p-1.5 rounded-md bg-green-500/10">
                <IndianRupee className={`${isCompact ? "h-3 w-3" : "h-3.5 w-3.5"} text-green-500`} />
              </div>
              <span className="font-semibold">₹{mentor.hourlyRate}/hr</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="p-1.5 rounded-md bg-blue-500/10">
                <Briefcase className={`${isCompact ? "h-3 w-3" : "h-3.5 w-3.5"} text-blue-500`} />
              </div>
              <span>{mentor.experienceYears} yrs</span>
            </div>
            {!isCompact && (
              <>
                <div className="flex items-center gap-2 text-xs">
                  <div className="p-1.5 rounded-md bg-purple-500/10">
                    <Users className="h-3.5 w-3.5 text-purple-500" />
                  </div>
                  <span>{mentor.totalSessionsCompleted} sessions</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="p-1.5 rounded-md bg-orange-500/10">
                    <Languages className="h-3.5 w-3.5 text-orange-500" />
                  </div>
                  <span className="truncate">{(mentor.languages as string[]).slice(0, 2).join(", ")}</span>
                </div>
              </>
            )}
          </div>

          {mentor.isAvailable && (
            <Badge variant="outline" className="text-green-600 border-green-600/30 bg-green-500/10 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
              Available Now
            </Badge>
          )}
        </CardContent>
        {!isCompact && (
          <CardFooter className={`flex gap-2 ${isFeatured ? "pt-4" : "pt-4"}`}>
            {onViewProfile && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={onViewProfile}
                data-testid={`button-view-profile-${mentor.id}`}
                size={isFeatured ? "default" : "sm"}
              >
                View Profile
              </Button>
            )}
            {onBookSession && showQuickBook && (
              <Button
                className="flex-1"
                onClick={onBookSession}
                data-testid={`button-book-session-${mentor.id}`}
                size={isFeatured ? "default" : "sm"}
                aria-label={`Book a session with ${mentor.userName}`}
                title={!user ? "Login required to book a session" : `Book a session with ${mentor.userName}`}
              >
                {isFeatured ? "Book Session" : "Book"}
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}

