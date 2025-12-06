export interface Project {
  id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  likes: number;
  views: number;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Dashboard",
    author: "Maria Santos",
    category: "Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    likes: 234,
    views: 1520,
  },
  {
    id: "2",
    title: "Mobile Banking App UI",
    author: "James Park",
    category: "Design",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    likes: 456,
    views: 2340,
  },
  {
    id: "3",
    title: "Sales Analytics Report",
    author: "Lisa Wang",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    likes: 189,
    views: 980,
  },
  {
    id: "4",
    title: "Brand Identity System",
    author: "Chris Miller",
    category: "Design",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop",
    likes: 567,
    views: 3200,
  },
  {
    id: "5",
    title: "Weather App",
    author: "Emma Brown",
    category: "Development",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
    likes: 321,
    views: 1750,
  },
  {
    id: "6",
    title: "Portfolio Website",
    author: "Ryan Clark",
    category: "Development",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
    likes: 412,
    views: 2100,
  },
];
