import { useState, useEffect } from "react";
import { Star, User, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Review {
  id: string;
  user_id: string;
  course_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profile?: {
    username: string | null;
    avatar_url: string | null;
  };
}

interface CourseReviewsProps {
  courseId: string;
  isEnrolled: boolean;
}

export function CourseReviews({ courseId, isEnrolled }: CourseReviewsProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const userReview = reviews.find((r) => r.user_id === user?.id);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("course_id", courseId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      // Fetch profiles for reviews
      const userIds = data.map((r) => r.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, username, avatar_url")
        .in("id", userIds);

      const reviewsWithProfiles = data.map((review) => ({
        ...review,
        profile: profiles?.find((p) => p.id === review.user_id),
      }));

      setReviews(reviewsWithProfiles);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to leave a review");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("reviews").upsert(
      {
        user_id: user.id,
        course_id: courseId,
        rating,
        comment: comment.trim() || null,
      },
      { onConflict: "user_id,course_id" }
    );

    if (error) {
      toast.error("Failed to submit review");
    } else {
      toast.success(userReview ? "Review updated!" : "Review submitted!");
      setShowForm(false);
      setComment("");
      await fetchReviews();
    }

    setSubmitting(false);
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="bg-card rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Student Reviews
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= averageRating
                        ? "text-warning fill-warning"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>
          )}
        </div>
        {isEnrolled && user && !showForm && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowForm(true);
              if (userReview) {
                setRating(userReview.rating);
                setComment(userReview.comment || "");
              }
            }}
          >
            {userReview ? "Edit Review" : "Write Review"}
          </Button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-6 p-4 bg-secondary rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1"
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "text-warning fill-warning"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Review (optional)
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this course..."
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="accent" disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {userReview ? "Update Review" : "Submit Review"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
        </motion.form>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No reviews yet. Be the first to review this course!
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 bg-secondary/50 rounded-lg border border-border"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  {review.profile?.avatar_url ? (
                    <img
                      src={review.profile.avatar_url}
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-accent" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      {review.profile?.username || "Anonymous"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "text-warning fill-warning"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  {review.comment && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
