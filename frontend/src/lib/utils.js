import { clsx } from "clsx";
import {
  CheckCircle,
  Clock,
  Lightbulb,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const TECH_CATEGORIES = [
  // Front-End
  {
    id: "frontend",
    label: "Front-End",
    emoji: "🎨",
    color: "from-pink-50 to-rose-50",
    selectedBg: "bg-pink-50",
    accent: "border-pink-300",
    glow: "shadow-pink-200",
    badge: "bg-pink-100 text-pink-700 border-pink-200",
    dot: "bg-pink-500",
    stacks: [
      { id: "react", name: "React", icon: "⚛️", desc: "Hooks, Redux, Next.js" },
      {
        id: "angular",
        name: "Angular",
        icon: "🅰️",
        desc: "RxJS, Services, NgRx",
      },
      {
        id: "react-native",
        name: "React Native",
        icon: "📱",
        desc: "Mobile, Expo, Navigation",
      },
      { id: "vue", name: "Vue.js", icon: "💚", desc: "Composition API, Vuex" },
      { id: "svelte", name: "Svelte", icon: "🔥", desc: "Stores, SvelteKit" },
    ],
  },
  // Back-End
  {
    id: "backend",
    label: "Back-End",
    emoji: "⚙️",
    color: "from-indigo-50 to-purple-50",
    selectedBg: "bg-indigo-50",
    accent: "border-indigo-300",
    glow: "shadow-indigo-200",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
    dot: "bg-[#3538cd]",
    stacks: [
      {
        id: "nodejs",
        name: "Node.js",
        icon: "🟢",
        desc: "Express, REST, GraphQL",
      },
      { id: "dotnet", name: ".NET / C#", icon: "🔷", desc: "ASP.NET, EF Core" },
      {
        id: "python-backend",
        name: "Python",
        icon: "🐍",
        desc: "Django, FastAPI, Flask",
      },
      { id: "java", name: "Java", icon: "☕", desc: "Spring Boot, Hibernate" },
      {
        id: "golang",
        name: "Go (Golang)",
        icon: "🐹",
        desc: "Goroutines, gRPC, REST",
      },
    ],
  },
  // Full-Stack
  {
    id: "fullstack",
    label: "Full-Stack",
    emoji: "🚀",
    color: "from-blue-50 to-cyan-50",
    selectedBg: "bg-blue-50",
    accent: "border-blue-300",
    glow: "shadow-blue-200",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    stacks: [
      {
        id: "mern",
        name: "MERN Stack",
        icon: "⚡",
        desc: "MongoDB, Express, React, Node",
      },
      {
        id: "mean",
        name: "MEAN Stack",
        icon: "🔮",
        desc: "MongoDB, Express, Angular, Node",
      },
      {
        id: "python-full",
        name: "Python Full-Stack",
        icon: "🐍",
        desc: "Django / FastAPI + React",
      },
      {
        id: "t3",
        name: "T3 Stack",
        icon: "🔺",
        desc: "Next.js, tRPC, Prisma, TS",
      },
      {
        id: "jamstack",
        name: "JAMstack",
        icon: "🌐",
        desc: "Gatsby / Next + Headless CMS",
      },
    ],
  },
  // DevOps / Cloud
  {
    id: "devops",
    label: "DevOps / Cloud",
    emoji: "☁️",
    color: "from-emerald-50 to-teal-50",
    selectedBg: "bg-emerald-50",
    accent: "border-emerald-300",
    glow: "shadow-emerald-200",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    stacks: [
      { id: "aws", name: "AWS", icon: "🟠", desc: "EC2, S3, Lambda, RDS" },
      {
        id: "docker",
        name: "Docker / K8s",
        icon: "🐳",
        desc: "Containers, Orchestration",
      },
      {
        id: "azure",
        name: "Azure",
        icon: "🔵",
        desc: "Azure DevOps, Functions",
      },
      {
        id: "ci-cd",
        name: "CI/CD",
        icon: "🔄",
        desc: "GitHub Actions, Jenkins",
      },
    ],
  },
  // Quality Analyst
  {
    id: "qa",
    label: "Quality Analyst",
    emoji: "🔍",
    color: "from-orange-50 to-amber-50",
    selectedBg: "bg-orange-50",
    accent: "border-orange-300",
    glow: "shadow-orange-200",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    dot: "bg-orange-500",
    stacks: [
      {
        id: "manual-testing",
        name: "Manual Testing",
        icon: "📝",
        desc: "Test Cases, Regression, UAT",
      },
      {
        id: "automation-testing",
        name: "Automation Testing",
        icon: "🤖",
        desc: "Selenium, Cypress, Playwright",
      },
      {
        id: "api-testing",
        name: "API Testing",
        icon: "🔌",
        desc: "Postman, REST, GraphQL Testing",
      },
      {
        id: "performance-testing",
        name: "Performance Testing",
        icon: "⚡",
        desc: "JMeter, Load Testing, K6",
      },
      {
        id: "security-testing",
        name: "Security Testing",
        icon: "🛡️",
        desc: "OWASP, Penetration Testing",
      },
    ],
  },
  // Data Structures & Algorithms
  {
    id: "dsa",
    label: "Data Structures & Algorithms",
    emoji: "🧮",
    color: "from-purple-50 to-indigo-50",
    selectedBg: "bg-purple-50",
    accent: "border-purple-300",
    glow: "shadow-purple-200",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
    stacks: [
      {
        id: "arrays",
        name: "Arrays",
        icon: "�",
        desc: "Sorting, Searching, Two Pointers",
      },
      {
        id: "linked-lists",
        name: "Linked Lists",
        icon: "🔗",
        desc: "Singly, Doubly, Circular Lists",
      },
      {
        id: "trees-graphs",
        name: "Trees & Graphs",
        icon: "🌳",
        desc: "BST, DFS, BFS, Graph Algorithms",
      },
      {
        id: "dynamic-programming",
        name: "Dynamic Programming",
        icon: "💡",
        desc: "Memoization, Tabulation, Optimization",
      },
      {
        id: "algorithms",
        name: "Algorithms",
        icon: "⚙️",
        desc: "Greedy, Divide & Conquer, Backtracking",
      },
    ],
  },
  // Database
  {
    id: "database",
    label: "Database",
    emoji: "🗄️",
    color: "from-blue-50 to-cyan-50",
    selectedBg: "bg-blue-50",
    accent: "border-blue-300",
    glow: "shadow-blue-200",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    stacks: [
      {
        id: "sql",
        name: "SQL",
        icon: "📝",
        desc: "MySQL, PostgreSQL, Queries",
      },
      {
        id: "nosql",
        name: "NoSQL",
        icon: "🔥",
        desc: "MongoDB, Redis, Cassandra",
      },
      {
        id: "database-design",
        name: "Database Design",
        icon: "🏗️",
        desc: "Normalization, Schema Design, ERD",
      },
      {
        id: "optimization",
        name: "Performance Optimization",
        icon: "⚡",
        desc: "Indexing, Query Optimization",
      },
      {
        id: "orm",
        name: "ORM & ODM",
        icon: "🔌",
        desc: "Prisma, Mongoose, TypeORM",
      },
    ],
  },
];

export const GUIDELINES = [
  {
    icon: MessageSquare,
    color: "text-[#3538cd]",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    title: "Think Out Loud",
    desc: "Verbalize your thought process. Interviewers value reasoning as much as answers.",
  },
  {
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    title: "Take Your Time",
    desc: "There's no rush. Read each question carefully before answering.",
  },
  {
    icon: Lightbulb,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    title: "Use Real Examples",
    desc: "Back your answers with concrete examples from past projects or experience.",
  },
  {
    icon: Shield,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    title: "Be Honest",
    desc: "It's okay to say you don't know. Intellectual honesty is a valued trait.",
  },
  {
    icon: Zap,
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
    title: "Stay Concise",
    desc: "Give structured, focused answers. Avoid rambling or going off-topic.",
  },
  {
    icon: CheckCircle,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    title: "10 Questions",
    desc: "You'll answer 10 AI-generated questions tailored to your tech and experience.",
  },
];

export const blobToBase64 = (blob) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
