import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const projectCategories = ["All", "Development", "Design", "Data Science"];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Student Projects
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore amazing projects built by our community. Get inspired and showcase your own work.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-10"
        >
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card border-border text-base"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {projectCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-lg text-muted-foreground mb-4">
              No projects found
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Submit CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-card rounded-lg shadow-card border border-border p-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Share Your Project
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Built something cool? Submit your project to inspire other learners and get feedback from the community.
          </p>
          <Button variant="accent" size="lg">
            Submit Your Project
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
