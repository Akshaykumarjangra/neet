import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ReviewModalProps {
  bookingId: number;
  mentorId: number;
  mentorName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.25 },
};

export function ReviewModal({
  bookingId,
  mentorId,
  mentorName,
  open,
  onOpenChange,
  onSuccess,
}: ReviewModalProps) {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const submitReviewMutation = useMutation({
    mutationFn: async (data: { rating: number; comment?: string; isAnonymous: boolean }) => {
      const response = await fetch(`/api/bookings/${bookingId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit review");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/mentors", mentorId] });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      onSuccess?.();
      handleClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleClose = () => {
    setRating(0);
    setHoveredRating(0);
    setComment("");
    setIsAnonymous(false);
    onOpenChange(false);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    submitReviewMutation.mutate({
      rating,
      comment: comment.trim() || undefined,
      isAnonymous,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md" data-testid="modal-review">
        <AnimatePresence mode="wait">
          <motion.div {...fadeInUp}>
            <DialogHeader>
              <DialogTitle>Leave a Review</DialogTitle>
              <DialogDescription>
                Share your experience with {mentorName}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div>
                <Label className="text-sm font-medium mb-3 block">Rating</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none"
                      data-testid={`button-rating-${star}`}
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-none text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      {rating === 1 && "Poor"}
                      {rating === 2 && "Fair"}
                      {rating === 3 && "Good"}
                      {rating === 4 && "Very Good"}
                      {rating === 5 && "Excellent"}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="review-comment" className="text-sm font-medium mb-2 block">
                  Your Review (Optional)
                </Label>
                <Textarea
                  id="review-comment"
                  placeholder="Share your experience, what you learned, or any feedback..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  maxLength={500}
                  data-testid="textarea-review-comment"
                />
                <div className="text-xs text-muted-foreground mt-1 text-right">
                  {comment.length}/500
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous-review"
                  checked={isAnonymous}
                  onCheckedChange={(checked) => setIsAnonymous(checked === true)}
                  data-testid="checkbox-anonymous"
                />
                <Label
                  htmlFor="anonymous-review"
                  className="text-sm font-normal cursor-pointer"
                >
                  Submit as anonymous
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={rating === 0 || submitReviewMutation.isPending}
                data-testid="button-submit-review"
              >
                {submitReviewMutation.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </DialogFooter>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

