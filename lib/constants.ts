export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
]

export const services = [
  {
    title: "Full Stack Developer",
    icon: "code",
    description: "Building fast, scalable, and reliable full-stack applications powered by contemporary web technologies.",
  },
  {
    title: "AI Agent Developer",
    icon: "smartphone",
    description: "I create smart, autonomous AI agents that automate tasks and power intelligent digital experiences.",
  },
  {
    title: "Real-time Systems",
    icon: "database",
    description: "Implementing real-time features using Socket.IO for instant updates and communication.",
  },
  {
    title: "Problem Solver",
    icon: "box",
    description: "Solved 400+ coding problems across LeetCode, GeeksForGeeks, and CodeStudio.",
  },
]

export const experiences = [
  {
    title: "Full Stack Developer Intern",
    company_name: "AdTakAi",
    icon: "starbucks", // Placeholder
    iconBg: "#383E56",
    date: "Feb 2025 - Mar 2025",
    points: [
      "Converted Figma designs into responsive, pixel-perfect UIs with smooth animations and cross-device compatibility.",
      "Integrated APIs and managed dynamic forms, ensuring robust error handling and close collaboration with designers for seamless UI/UX.",
    ],
    tech: ["React", "Figma", "API Integration"],
  },
  {
    title: "Software Developer Intern",
    company_name: "Invoir",
    icon: "tesla", // Placeholder
    iconBg: "#E6DEDD",
    date: "Mar 2024 - Jul 2024",
    points: [
      "Developed secure user authentication using JSON Web Tokens (JWT) to manage access and protect sensitive routes.",
      "Worked on frontend (React) and backend (MongoDB) by building user interfaces and connecting them to efficient, scalable data models.",
    ],
    tech: ["React", "MongoDB", "JWT", "Node.js"],
  },
]

export const technologies = [
  { name: "C++", icon: "cpp" }, // Placeholder icon name
  { name: "JavaScript", icon: "js" },
  { name: "React JS", icon: "react" },
  { name: "Node JS", icon: "node" },
  { name: "Express JS", icon: "node" },
  { name: "Socket.IO", icon: "socketio" }, // Placeholder icon name
  { name: "Redux", icon: "redux" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "MySQL", icon: "mysql" }, // Placeholder icon name
  { name: "Git", icon: "git" },
  { name: "Postman", icon: "postman" }, // Placeholder icon name
]

export const projects = [
  {
    name: "Next Gen Smart Waste Bins",
    description:
      "Implemented CVRP algorithm with real-time Socket.IO and JWT-secured access; built React.js + OpenStreetMap dashboard for live bin monitoring and route optimization. Accepted as a research paper at IC3-2025.",
    tags: [
      { name: "react", color: "text-blue-500" },
      { name: "socket.io", color: "text-green-500" },
      { name: "cvrp", color: "text-pink-500" },
    ],
    image: "/placeholder.jpg",
    source_code_link: "https://github.com/Madan2468/NEXT-GENERATION-SMART-WASTE-BINS",
    live_link: "https://next-generation-smart-waste-bins-frontend.onrender.com",
  },
  {
    name: "Competitive Coding Leaderboard",
    description:
      "Built a real-time coding performance tracker integrating LeetCode, Codeforces, and GitHub with a custom ranking system. Scaled to 300+ users in first month with steady daily traffic.",
    tags: [
      { name: "react", color: "text-blue-500" },
      { name: "node", color: "text-green-500" },
      { name: "api", color: "text-pink-500" },
    ],
    image: "/placeholder.jpg",
    source_code_link: "https://github.com/Madan2468/Competitve-Coding-leaderboard",
    live_link: "https://competitive-coding-leaderboard.vercel.app",
  },
  {
    name: "ResQLink",
    description:
      "Developed a real-time animal rescue platform enabling users to report injured animals with images, location, and urgency. Built a scalable full-stack app using React.js, Node.js, MongoDB, and Socket.IO.",
    tags: [
      { name: "mern", color: "text-blue-500" },
      { name: "socket.io", color: "text-green-500" },
      { name: "geolocation", color: "text-pink-500" },
    ],
    image: "/placeholder.jpg",
    source_code_link: "https://github.com/Madan2468/resqlink_backend",
    live_link: "https://resq-link-frontend.vercel.app",
  },
]

