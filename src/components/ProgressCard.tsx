import { Play, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { Course } from "@/data/courses";

interface ProgressCardProps {
  course: Course;
  index?: number;
}

export function ProgressCard({ course, index = 0 }: ProgressCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-card rounded-lg overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover border border-border flex">
        {/* Image */}
        <div className="relative w-32 sm:w-40 flex-shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <Play className="h-4 w-4 text-accent-foreground ml-0.5" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-semibold text-card-foreground text-sm sm:text-base line-clamp-1">
              {course.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {course.instructor}
            </p>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-accent">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{course.duration}</span>
            </div>
            <Button size="sm" variant="ghost" className="text-accent hover:text-accent h-8 px-3" asChild>
              <Link to={`/course/${course.id}`}>Continue</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
