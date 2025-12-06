import { useState, useEffect } from "react";
import { User, Award, Clock, BookOpen, TrendingUp, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressCard } from "@/components/ProgressCard";
import { EditProfileDialog, ProfileData } from "@/components/EditProfileDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useEnrollments } from "@/hooks/useEnrollments";
import { courses } from "@/data/courses";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, profile, loading: authLoading, updateProfile } = useAuth();
  const { enrollments, loading: enrollmentsLoading } = useEnrollments();
  const navigate = useNavigate();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    // Fetch completed courses as certificates
    const completedEnrollments = enrollments.filter((e) => e.progress >= 100);
    setCertificates(
      completedEnrollments.map((e) => ({
        title: e.course.title,
        date: e.completed_at
          ? new Date(e.completed_at).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })
          : "N/A",
        id: `CERT-${e.course_id.toUpperCase()}`,
      }))
    );
  }, [enrollments]);

  const recentlyViewed = courses.slice(0, 3);
  const totalProgress =
    enrollments.length > 0
      ? Math.round(
          enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length
        )
      : 0;

  const hoursLearned = enrollments.reduce((acc, e) => {
    const hours = parseInt(e.course.duration) || 0;
    return acc + Math.round((hours * e.progress) / 100);
  }, 0);

  const handleProfileSave = async (updatedProfile: ProfileData) => {
    await updateProfile({
      username: updatedProfile.username,
      email: updatedProfile.email,
      avatar_url: updatedProfile.profilePic,
      profession: updatedProfile.profession,
      work_type: updatedProfile.workType,
    });
  };

  if (authLoading || enrollmentsLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) return null;

  const profileData: ProfileData = {
    username: profile?.username || "",
    email: profile?.email || user.email || "",
    profilePic: profile?.avatar_url || "",
    profession: profile?.profession || "",
    workType: (profile?.work_type as "full-time" | "part-time") || "full-time",
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary rounded-lg p-6 text-primary-foreground"
            >
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Welcome back, {profile?.username?.split(" ")[0] || "Learner"}! 👋
              </h1>
              <p className="text-primary-foreground/80 mb-4">
                {enrollments.length > 0
                  ? "You're making great progress. Keep up the momentum!"
                  : "Start your learning journey by enrolling in a course!"}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-medium">{totalProgress}% overall progress</span>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { icon: BookOpen, label: "Enrolled", value: enrollments.length },
                { icon: Clock, label: "Hours Learned", value: hoursLearned },
                { icon: Award, label: "Certificates", value: certificates.length },
                { icon: TrendingUp, label: "Avg Progress", value: `${totalProgress}%` },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-lg p-4 shadow-card border border-border text-center"
                >
                  <stat.icon className="h-6 w-6 text-accent mx-auto mb-2" />
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Enrolled Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Continue Learning
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/courses">View All</Link>
                </Button>
              </div>
              {enrollments.length > 0 ? (
                <div className="space-y-4">
                  {enrollments.slice(0, 3).map((enrollment, index) => (
                    <ProgressCard
                      key={enrollment.id}
                      course={enrollment.course}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-lg p-8 shadow-card border border-border text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    You haven't enrolled in any courses yet
                  </p>
                  <Button asChild>
                    <Link to="/courses">Browse Courses</Link>
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Recently Viewed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Recently Viewed
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {recentlyViewed.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      to={`/course/${course.id}`}
                      className="bg-card rounded-lg overflow-hidden shadow-card border border-border group cursor-pointer block"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm text-card-foreground line-clamp-1">
                          {course.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {course.instructor}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-lg shadow-card border border-border p-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4 overflow-hidden border-2 border-border">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.username || ""}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-accent" />
                  )}
                </div>
                <h3 className="font-semibold text-lg text-card-foreground">
                  {profile?.username || "User"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {profile?.email || user.email}
                </p>
                {profile?.profession && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {profile.profession}
                  </p>
                )}
                <div className="flex gap-2 mt-3">
                  <Badge variant="secondary">Pro Member</Badge>
                  {profile?.work_type && (
                    <Badge variant="outline" className="capitalize">
                      {profile.work_type.replace("-", " ")}
                    </Badge>
                  )}
                </div>
                <div className="w-full mt-6 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Profile Completion</span>
                    <span className="font-medium text-foreground">
                      {profile?.bio && profile?.profession && profile?.avatar_url
                        ? "100%"
                        : profile?.profession || profile?.avatar_url
                        ? "70%"
                        : "50%"}
                    </span>
                  </div>
                  <Progress
                    value={
                      profile?.bio && profile?.profession && profile?.avatar_url
                        ? 100
                        : profile?.profession || profile?.avatar_url
                        ? 70
                        : 50
                    }
                    className="h-2"
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setIsEditProfileOpen(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </motion.div>

            {/* Certificates */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-lg shadow-card border border-border p-6"
            >
              <h3 className="font-semibold text-lg text-card-foreground mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Certificates
              </h3>
              {certificates.length > 0 ? (
                <div className="space-y-3">
                  {certificates.slice(0, 2).map((cert) => (
                    <div
                      key={cert.id}
                      className="p-3 bg-secondary rounded-md border border-border"
                    >
                      <p className="font-medium text-sm text-foreground line-clamp-1">
                        {cert.title}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          {cert.date}
                        </span>
                        <span className="text-xs text-accent font-mono">
                          {cert.id}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Complete courses to earn certificates
                </p>
              )}
              <Button variant="ghost" className="w-full mt-4 text-accent" asChild>
                <Link to="/certificates">View All Certificates</Link>
              </Button>
            </motion.div>

            {/* Learning Goals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-lg shadow-card border border-border p-6"
            >
              <h3 className="font-semibold text-lg text-card-foreground mb-4">
                Weekly Goal
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Learning Hours</span>
                  <span className="font-medium text-foreground">
                    {hoursLearned}/10 hrs
                  </span>
                </div>
                <Progress
                  value={Math.min((hoursLearned / 10) * 100, 100)}
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  {hoursLearned >= 10
                    ? "🎉 Goal reached! Great job!"
                    : `${10 - hoursLearned} more hours to reach your weekly goal!`}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
        profile={profileData}
        onSave={handleProfileSave}
      />
    </div>
  );
};

export default Dashboard;
