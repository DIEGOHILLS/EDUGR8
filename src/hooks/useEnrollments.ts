import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { courses, Course } from "@/data/courses";

interface Enrollment {
  id: string;
  course_id: string;
  progress: number;
  enrolled_at: string;
  completed_at: string | null;
  course: Course;
}

export function useEnrollments() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrollments = async () => {
    if (!user) {
      setEnrollments([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", user.id)
      .order("enrolled_at", { ascending: false });

    if (!error && data) {
      const enrollmentsWithCourses = data
        .map((enrollment) => {
          const course = courses.find((c) => c.id === enrollment.course_id);
          return course
            ? { ...enrollment, course: { ...course, progress: enrollment.progress } }
            : null;
        })
        .filter(Boolean) as Enrollment[];
      setEnrollments(enrollmentsWithCourses);
    }
    setLoading(false);
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some((e) => e.course_id === courseId);
  };

  const updateProgress = async (courseId: string, progress: number) => {
    if (!user) return;

    await supabase
      .from("enrollments")
      .update({ progress, completed_at: progress >= 100 ? new Date().toISOString() : null })
      .eq("user_id", user.id)
      .eq("course_id", courseId);

    await fetchEnrollments();
  };

  useEffect(() => {
    fetchEnrollments();
  }, [user]);

  return { enrollments, loading, isEnrolled, updateProgress, refetch: fetchEnrollments };
}
