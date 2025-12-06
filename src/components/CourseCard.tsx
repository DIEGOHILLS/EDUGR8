import { Star, Users, Clock, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const levelColors = {
    Beginner: "bg-success/10 text-success border-success/20",
    Intermediate: "bg-warning/10 text-warning border-warning/20",
    Advanced: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/course/${course.id}`}>
        <div className="bg-card rounded-lg overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border border-border">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
              <Play className="h-6 w-6 text-accent-foreground ml-1" fill="currentColor" />
            </div>
          </div>
          <Badge
            variant="secondary"
            className={cn("absolute top-3 left-3", levelColors[course.level])}
          >
            {course.level}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-normal">
              {course.category}
            </Badge>
          </div>

          <h3 className="font-semibold text-card-foreground line-clamp-2 leading-tight">
            {course.title}
          </h3>

          <p className="text-sm text-muted-foreground">{course.instructor}</p>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-warning fill-warning" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-lg font-bold text-primary">
              R{course.price.toFixed(2)}
            </span>
            <span className="text-sm font-medium text-accent hover:underline transition-all hover:scale-105">
              Enroll Now
            </span>
          </div>
        </div>
        </div>
      </Link>
    </motion.div>
  );
}
