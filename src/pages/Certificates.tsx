import { motion } from "framer-motion";
import { Award, Download, ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const certificates = [
  {
    id: "WD-2023-001",
    title: "Web Development Fundamentals",
    date: "Dec 2023",
    instructor: "Sarah Johnson",
    hours: 52,
  },
  {
    id: "DS-2023-042",
    title: "Introduction to Data Science",
    date: "Nov 2023",
    instructor: "Emily Rodriguez",
    hours: 45,
  },
  {
    id: "UI-2023-015",
    title: "UI/UX Design Basics",
    date: "Oct 2023",
    instructor: "Michael Chen",
    hours: 38,
  },
];

const Certificates = () => {
  const navigate = useNavigate();

  const handleDownload = (certId: string, title: string) => {
    toast.success("Certificate Downloaded", {
      description: `${title} certificate has been downloaded.`,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Award className="h-8 w-8 text-accent" />
            My Certificates
          </h1>
          <p className="text-muted-foreground">
            View and download your earned certificates
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="space-y-4">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-lg shadow-card border border-border p-6 hover:shadow-card-hover transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Instructor: {cert.instructor}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{cert.date}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {cert.hours} hours
                      </Badge>
                      <span className="text-xs text-accent font-mono">
                        {cert.id}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(cert.id, cert.title)}
                  className="flex-shrink-0"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {certificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-4">
              You haven't earned any certificates yet
            </p>
            <Button onClick={() => navigate("/courses")}>
              Browse Courses
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
