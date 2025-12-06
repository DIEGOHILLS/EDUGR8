import { Heart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-card rounded-lg overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover border border-border">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              View Project
            </Button>
          </div>
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-card/90 text-card-foreground"
          >
            {project.category}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-card-foreground">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground">by {project.author}</p>

          <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{project.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{project.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
