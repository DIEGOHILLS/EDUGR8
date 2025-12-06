export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isPreview?: boolean;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  students: number;
  price: number;
  duration: string;
  image: string;
  description: string;
  progress?: number;
  curriculum?: Section[];
  learnings?: string[];
}

export const categories = [
  "All",
  "Development",
  "Design",
  "Data Science",
  "Marketing",
  "Business",
  "Photography",
];

export const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export const courses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    category: "Development",
    level: "Beginner",
    rating: 4.8,
    students: 45230,
    price: 1599.99,
    duration: "52 hours",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects and become a full-stack developer.",
    learnings: [
      "Build real-world websites using HTML, CSS, and JavaScript",
      "Master React.js and build modern web applications",
      "Create server-side applications with Node.js",
      "Work with databases like MongoDB and PostgreSQL",
    ],
    curriculum: [
      {
        id: "s1",
        title: "Getting Started with Web Development",
        lessons: [
          { id: "l1", title: "Introduction to the Course", duration: "5:30", isPreview: true },
          { id: "l2", title: "Setting Up Your Development Environment", duration: "12:45" },
          { id: "l3", title: "How the Web Works", duration: "8:20", isPreview: true },
        ],
      },
      {
        id: "s2",
        title: "HTML Fundamentals",
        lessons: [
          { id: "l4", title: "HTML Document Structure", duration: "15:00" },
          { id: "l5", title: "Working with Text and Links", duration: "18:30" },
          { id: "l6", title: "Images and Media", duration: "14:15" },
        ],
      },
      {
        id: "s3",
        title: "CSS Styling",
        lessons: [
          { id: "l8", title: "CSS Selectors and Properties", duration: "20:00" },
          { id: "l9", title: "Box Model and Layout", duration: "25:30" },
          { id: "l10", title: "Flexbox and Grid", duration: "35:00" },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "UI/UX Design Masterclass",
    instructor: "Michael Chen",
    category: "Design",
    level: "Intermediate",
    rating: 4.9,
    students: 32150,
    price: 1399.99,
    duration: "38 hours",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
    description: "Master Figma, design systems, and user experience principles to create stunning interfaces.",
    learnings: [
      "Design professional UI in Figma from scratch",
      "Create comprehensive design systems",
      "Conduct user research and usability testing",
      "Build interactive prototypes",
    ],
    curriculum: [
      {
        id: "s1",
        title: "Introduction to UI/UX",
        lessons: [
          { id: "l1", title: "What is UI/UX Design?", duration: "10:00", isPreview: true },
          { id: "l2", title: "Design Thinking Process", duration: "18:00" },
        ],
      },
      {
        id: "s2",
        title: "Figma Essentials",
        lessons: [
          { id: "l3", title: "Figma Interface Overview", duration: "15:00" },
          { id: "l4", title: "Working with Frames and Shapes", duration: "22:00" },
          { id: "l5", title: "Typography and Colors", duration: "20:00" },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Python for Data Science",
    instructor: "Emily Rodriguez",
    category: "Data Science",
    level: "Beginner",
    rating: 4.7,
    students: 58420,
    price: 1699.99,
    duration: "45 hours",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop",
    description: "Learn Python, Pandas, NumPy, and data visualization for data science careers.",
    learnings: [
      "Master Python programming fundamentals",
      "Analyze data with Pandas and NumPy",
      "Create visualizations with Matplotlib and Seaborn",
      "Work with real-world datasets",
    ],
    curriculum: [
      {
        id: "s1",
        title: "Python Basics",
        lessons: [
          { id: "l1", title: "Introduction to Python", duration: "12:00", isPreview: true },
          { id: "l2", title: "Variables and Data Types", duration: "18:00" },
          { id: "l3", title: "Control Flow", duration: "22:00" },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Digital Marketing Strategy",
    instructor: "David Wilson",
    category: "Marketing",
    level: "Intermediate",
    rating: 4.6,
    students: 28750,
    price: 1199.99,
    duration: "28 hours",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
    description: "SEO, social media, content marketing, and analytics to grow your business.",
    learnings: [
      "Develop comprehensive marketing strategies",
      "Master SEO and content marketing",
      "Run effective social media campaigns",
      "Analyze marketing metrics",
    ],
  },
  {
    id: "5",
    title: "Advanced React & TypeScript",
    instructor: "Alex Thompson",
    category: "Development",
    level: "Advanced",
    rating: 4.9,
    students: 19850,
    price: 1899.99,
    duration: "42 hours",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    description: "Build scalable applications with React and TypeScript. Learn advanced patterns and best practices.",
    learnings: [
      "Master TypeScript with React",
      "Implement advanced state management",
      "Build reusable component libraries",
      "Write comprehensive tests",
    ],
    curriculum: [
      {
        id: "s1",
        title: "TypeScript Fundamentals",
        lessons: [
          { id: "l1", title: "TypeScript Setup", duration: "10:00", isPreview: true },
          { id: "l2", title: "Types and Interfaces", duration: "25:00" },
          { id: "l3", title: "Generics", duration: "30:00" },
        ],
      },
      {
        id: "s2",
        title: "Advanced React Patterns",
        lessons: [
          { id: "l4", title: "Custom Hooks", duration: "28:00" },
          { id: "l5", title: "Render Props and HOCs", duration: "35:00" },
          { id: "l6", title: "Context and State Management", duration: "40:00" },
        ],
      },
    ],
  },
  {
    id: "6",
    title: "Business Analytics Fundamentals",
    instructor: "Jennifer Lee",
    category: "Business",
    level: "Beginner",
    rating: 4.5,
    students: 35680,
    price: 1299.99,
    duration: "32 hours",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    description: "Excel, Power BI, and business intelligence for data-driven decisions.",
  },
  {
    id: "7",
    title: "Photography Fundamentals",
    instructor: "Robert Martinez",
    category: "Photography",
    level: "Beginner",
    rating: 4.8,
    students: 42100,
    price: 999.99,
    duration: "24 hours",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=225&fit=crop",
    description: "Camera basics, composition, and editing techniques for stunning photos.",
  },
  {
    id: "8",
    title: "Machine Learning A-Z",
    instructor: "Dr. Amanda Foster",
    category: "Data Science",
    level: "Advanced",
    rating: 4.8,
    students: 67890,
    price: 2299.99,
    duration: "58 hours",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop",
    description: "Deep learning, neural networks, and AI applications for cutting-edge projects.",
    learnings: [
      "Understand machine learning algorithms",
      "Build and train neural networks",
      "Implement deep learning models",
      "Deploy AI applications",
    ],
  },
];

export const enrolledCourses: Course[] = [
  { ...courses[0], progress: 65 },
  { ...courses[2], progress: 30 },
  { ...courses[4], progress: 85 },
];
