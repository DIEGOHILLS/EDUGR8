import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Users,
  Clock,
  Play,
  Check,
  ArrowLeft,
  BookOpen,
  Award,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CourseReviews } from "@/components/CourseReviews";
import { courses } from "@/data/courses";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useEnrollments } from "@/hooks/useEnrollments";
import { toast } from "sonner";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const { isEnrolled } = useEnrollments();

  const course = courses.find((c) => c.id === id);
  const enrolled = id ? isEnrolled(id) : false;
  const inCart = id ? isInCart(id) : false;

  if (!course) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Course Not Found
          </h1>
          <Button asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const levelColors = {
    Beginner: "bg-success/10 text-success border-success/20",
    Intermediate: "bg-warning/10 text-warning border-warning/20",
    Advanced: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please sign in to add items to cart");
      navigate("/auth");
      return;
    }
    addToCart(course.id);
  };

  const totalLessons =
    course.curriculum?.reduce((acc, section) => acc + section.lessons.length, 0) || 0;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline">{course.category}</Badge>
                <Badge className={levelColors[course.level]}>{course.level}</Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {course.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-4">
                {course.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-warning fill-warning" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-muted-foreground">rating</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Instructor: <span className="text-foreground font-medium">{course.instructor}</span>
              </p>
            </motion.div>

            {/* Course Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative aspect-video rounded-lg overflow-hidden"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                <button className="w-16 h-16 rounded-full bg-accent flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="h-7 w-7 text-accent-foreground ml-1" fill="currentColor" />
                </button>
              </div>
            </motion.div>

            {/* What You'll Learn */}
            {course.learnings && course.learnings.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-lg p-6 shadow-card border border-border"
              >
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  What You'll Learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.learnings.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Curriculum */}
            {course.curriculum && course.curriculum.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-lg p-6 shadow-card border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    Course Curriculum
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {course.curriculum.length} sections • {totalLessons} lessons
                  </span>
                </div>
                <Accordion type="multiple" className="space-y-2">
                  {course.curriculum.map((section, sectionIndex) => (
                    <AccordionItem
                      key={section.id}
                      value={section.id}
                      className="border border-border rounded-md px-4"
                    >
                      <AccordionTrigger className="hover:no-underline py-3">
                        <div className="flex items-center gap-3 text-left">
                          <span className="text-sm font-medium text-foreground">
                            Section {sectionIndex + 1}: {section.title}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {section.lessons.length} lessons
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pb-2">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 rounded-md bg-secondary/50 hover:bg-secondary transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <Play className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">
                                  {lessonIndex + 1}. {lesson.title}
                                </span>
                                {lesson.isPreview && (
                                  <Badge variant="outline" className="text-xs">
                                    Preview
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            )}

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <CourseReviews courseId={course.id} isEnrolled={enrolled} />
            </motion.div>
          </div>

          {/* Sidebar - Sticky Enrollment Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-lg shadow-card border border-border p-6 lg:sticky lg:top-24"
            >
              <div className="text-3xl font-bold text-foreground mb-4">
                R{course.price.toFixed(2)}
              </div>

              {enrolled ? (
                <Button className="w-full mb-4" size="lg" asChild>
                  <Link to="/dashboard">
                    <Play className="h-5 w-5 mr-2" />
                    Continue Learning
                  </Link>
                </Button>
              ) : inCart ? (
                <Button className="w-full mb-4" size="lg" variant="secondary" disabled>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  In Cart
                </Button>
              ) : (
                <Button
                  className="w-full mb-4"
                  size="lg"
                  variant="accent"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              )}

              <div className="space-y-3 pt-4 border-t border-border">
                <h3 className="font-medium text-foreground">This course includes:</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration} of content</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Award className="h-4 w-4" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
