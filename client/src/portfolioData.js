export const portfolioData = {
  name: "Tejender Singh Shekhawat",
  role: "MERN Stack Developer & CS AI Student",
  typewriterRoles: [
    "Full Stack MERN Developer",
    "Computer Science & AI Student",
    "Frontend & UI Engineer",
    "Problem Solver & Builder"
  ],
  status: "Available for Internships (2026)",
  location: "Jaipur, Rajasthan, India",
  email: "shekhawattejendersingh@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  bio: "I am a passionate Computer Science & Artificial Intelligence undergraduate at JK Lakshmipat University, Jaipur. I specialize in developing modern full-stack web applications with the MERN stack (MongoDB, Express, React, Node.js) and integrating intelligent AI/ML capabilities. I care deeply about snappy performance, accessible UX, and writing clean, scalable code.",
  
  stats: [
    { label: "Completed Projects", value: "5+", description: "Production & Academic Apps" },
    { label: "Core Technologies", value: "12+", description: "MERN, Python, AI/ML" },
    { label: "Academic Score", value: "85.6%", description: "Class XII CBSE Distinction" },
    { label: "Hackathons & Events", value: "3+", description: "National & Campus Level" }
  ],

  codeSnippet: `// Tejender's Engineering Philosophy
const engineer = {
  name: "Tejender Singh Shekhawat",
  focus: ["MERN Stack", "Generative AI", "UI Polish"],
  mindset: "Build fast, measure impact, refactor cleanly",
  currentGoal: "Building high-performance web systems with AI capabilities"
};`,

  skills: [
    // Frontend
    { name: "React.js", level: 90, category: "Frontend", proficiency: "Advanced", icon: "Code2" },
    { name: "JavaScript (ES6+)", level: 88, category: "Frontend", proficiency: "Advanced", icon: "Code2" },
    { name: "HTML5 & Semantic Web", level: 95, category: "Frontend", proficiency: "Mastery", icon: "Layers" },
    { name: "CSS3 / Flexbox & Grid", level: 92, category: "Frontend", proficiency: "Advanced", icon: "Layers" },
    { name: "Responsive UI Design", level: 90, category: "Frontend", proficiency: "Advanced", icon: "Layers" },

    // Backend
    { name: "Node.js", level: 85, category: "Backend", proficiency: "Advanced", icon: "Terminal" },
    { name: "Express.js", level: 86, category: "Backend", proficiency: "Advanced", icon: "Terminal" },
    { name: "MongoDB & Mongoose", level: 82, category: "Backend", proficiency: "Proficient", icon: "Database" },
    { name: "RESTful API Design", level: 88, category: "Backend", proficiency: "Advanced", icon: "Database" },
    { name: "MySQL / Relational DB", level: 78, category: "Backend", proficiency: "Intermediate", icon: "Database" },

    // Tools & Technologies
    { name: "Git & GitHub", level: 90, category: "Tools & Technologies", proficiency: "Advanced", icon: "Code2" },
    { name: "VS Code & Tooling", level: 92, category: "Tools & Technologies", proficiency: "Advanced", icon: "Terminal" },
    { name: "Postman API Testing", level: 85, category: "Tools & Technologies", proficiency: "Proficient", icon: "Terminal" },
    { name: "Vite Bundler", level: 85, category: "Tools & Technologies", proficiency: "Proficient", icon: "Code2" },
    { name: "C / C++ Fundamentals", level: 84, category: "Tools & Technologies", proficiency: "Proficient", icon: "Code2" }
  ],

  projects: [
    {
      id: "project-1",
      title: "InstaGenius – AI Social Media Co-pilot",
      tagline: "Multimodal AI assistant generating viral captions, trending hashtags & audio pairings",
      description: "An AI-powered creator platform that generates viral captions, hashtags, and trending background music suggestions for Instagram content based on computer vision context.",
      category: "Full Stack",
      tech: ["React.js", "JavaScript", "Node.js", "Express", "CSS Grid", "OpenAI / Gemini"],
      github: "https://github.com",
      live: "https://example.com/instagenius",
      featured: true,
      metrics: "⚡ 3x faster caption generation for creators",
      architecture: "React SPA frontend with modern responsive CSS Grid, Express.js backend handling API rate limits and proxying multimodal AI prompts with smart context caching.",
      highlights: [
        "Dynamic computer-vision prompt analysis",
        "Contextual viral hashtag clustering",
        "Direct export & copy-to-clipboard workflows",
        "Responsive dark mode UI"
      ]
    },
    {
      id: "project-2",
      title: "Reading Efficiency Analyzer",
      tagline: "Computer vision gaze tracking to assess saccades, fixation stability, and reading pace",
      description: "An innovative computer vision system using OpenCV and MediaPipe to track eye fixations, saccades, and reading rhythm, scoring user reading focus and speed.",
      category: "AI / Python",
      tech: ["Python", "OpenCV", "MediaPipe", "Flask", "NumPy"],
      github: "https://github.com",
      live: "https://example.com/reading-analyzer",
      featured: true,
      metrics: "🎯 Sub-pixel pupil tracking with 94% accuracy",
      architecture: "OpenCV video stream processing pipeline with MediaPipe Iris landmark detection and real-time fixation duration clustering algorithms.",
      highlights: [
        "Real-time webcam fixation and saccade mapping",
        "WPM (Words Per Minute) reading speed calculation",
        "Distraction & cognitive load scoring",
        "Interactive analytics report generation"
      ]
    },
    {
      id: "project-3",
      title: "MERN DevPortfolio with Interactive CMS",
      tagline: "Production-ready developer portfolio with dual-format CV downloads and secure APIs",
      description: "A production-ready full-stack portfolio built with MongoDB, Express, React, and Node.js featuring dual-format CV downloads, contact form rate limiting, and dark/light mode toggle.",
      category: "Full Stack",
      tech: ["React", "Node.js", "Express", "MongoDB", "CSS Flexbox", "Helmet"],
      github: "https://github.com",
      live: "https://example.com/portfolio",
      featured: true,
      metrics: "🔒 Helmet & Rate Limit protected backend with MongoDB persistence",
      architecture: "Decoupled React client communicating through Vite reverse proxy to an Express API server with Mongoose schemas and strict security middleware.",
      highlights: [
        "Dual format CV download engine (PDF + DOCX)",
        "Rate-limited MongoDB contact form with feedback alerts",
        "Instant Dark/Light theme switching with CSS variables",
        "Keyboard-driven Command Palette (Cmd+K)"
      ]
    },
    {
      id: "project-4",
      title: "Campus Hackathon Portal & Event Registry",
      tagline: "High-throughput registration & judging platform for student hackathon events",
      description: "Interactive dashboard for student hackathon submissions, judging criteria, live announcements, and logistics coordination built for university events.",
      category: "Frontend",
      tech: ["React", "Vanilla CSS", "Flexbox", "Vite"],
      github: "https://github.com",
      live: "https://example.com/hackjklu",
      featured: false,
      metrics: "🚀 400+ participants coordinated across university tracks",
      architecture: "Component-driven React application with client-side submission validation, real-time timetable updates, and responsive schedule grid.",
      highlights: [
        "Live agenda and judging rubrics viewer",
        "Dynamic team search and track filtering",
        "Accessible mobile drawer and quick notification toasts"
      ]
    }
  ],

  timeline: [
    {
      id: "exp-1",
      type: "experience",
      title: "Social Media Coordinator",
      organization: "HackJKLU v5.0",
      period: "Jan 2026 – Mar 2026",
      description: "Led digital marketing, hackathon outreach campaigns, and participant coordination for a flagship national hackathon with 400+ attendees.",
      highlight: "Increased participant engagement by 45%"
    },
    {
      id: "exp-2",
      type: "experience",
      title: "Active Community Member",
      organization: "Google Developer Groups (GDG)",
      period: "Apr 2025 – Jul 2025",
      description: "Participated in hands-on GenAI workshops, collaborative open source sprints, and peer mentorship in web and AI technologies.",
      highlight: "GenAI Bootcamp Project Graduate"
    },
    {
      id: "exp-3",
      type: "experience",
      title: "Logistics & Hospitality Coordinator",
      organization: "Sabrang '24 Cultural Fest",
      period: "Sep 2024 – Sep 2025",
      description: "Coordinated accommodation and logistical operations for over 1,000 inter-college attendees and guest dignitaries.",
      highlight: "Managed multi-day operations seamlessly"
    },
    {
      id: "edu-1",
      type: "education",
      title: "B.Tech in Computer Science & Artificial Intelligence",
      organization: "JK Lakshmipat University, Jaipur",
      period: "2024 – 2028",
      description: "Rigorous coursework in Data Structures, Algorithms, Full Stack Web Engineering, Database Management Systems, and Artificial Intelligence fundamentals.",
      highlight: "Undergraduate Student (CS & AI)"
    },
    {
      id: "edu-2",
      type: "education",
      title: "Senior Secondary (Class XII) – CBSE",
      organization: "Central Board of Secondary Education",
      period: "2022 – 2023",
      description: "Specialized in Science stream (Physics, Chemistry, Mathematics, Computer Science).",
      highlight: "Secured 85.6% Distinction"
    },
    {
      id: "edu-3",
      type: "education",
      title: "Secondary School (Class X) – CBSE",
      organization: "Central Board of Secondary Education",
      period: "2020 – 2021",
      description: "Comprehensive foundation in Mathematics, Sciences, and General Academics.",
      highlight: "Secured 80.3% Distinction"
    }
  ],

  certifications: [
    {
      id: "cert-1",
      title: "GenAI Bootcamp Graduate",
      issuer: "Google Developer Group (GDG)",
      date: "2025",
      link: "https://developers.google.com",
      badgeText: "Google Developer Groups",
      description: "Intensive bootcamp on generative AI models, prompt engineering, multimodal integrations, and deploying AI web agents."
    },
    {
      id: "cert-2",
      title: "Competitive Hackathon Participant",
      issuer: "LNMIIT, Jaipur",
      date: "2025",
      link: "https://lnmiit.ac.in",
      badgeText: "Hackathon Award",
      description: "Developed and pitched a rapid prototype solution tackling smart campus automation in a 24-hour sprint."
    },
    {
      id: "cert-3",
      title: "Full Stack Web Development Certification",
      issuer: "MERN Stack Course",
      date: "2026",
      link: "#",
      badgeText: "MERN Specialist",
      description: "Mastery of React.js SPAs, Express REST APIs, MongoDB Mongoose ODM, and production cloud deployments."
    }
  ],

  // AI Assistant Knowledge Base for instant intelligent answers
  aiFaqs: [
    {
      keywords: ["skills", "technologies", "tech stack", "languages", "mern", "frontend", "backend"],
      answer: "Tejender specializes in full-stack engineering with the MERN Stack (MongoDB, Express.js, React.js, Node.js). His frontend toolkit includes React, ES6+ JavaScript, CSS3 (Flexbox/Grid), and responsive design. On the backend, he builds robust REST APIs with Express & Mongoose. He also works with Python, OpenCV, and MediaPipe for AI/computer vision."
    },
    {
      keywords: ["projects", "work", "instagenius", "reading", "hackathon"],
      answer: "Tejender's key projects include:\n1. 🌟 **InstaGenius**: An AI co-pilot generating captions, hashtags, and music recommendations.\n2. 👁️ **Reading Efficiency Analyzer**: An OpenCV & MediaPipe gaze-tracking system assessing saccades and reading pace.\n3. ⚡ **MERN DevPortfolio**: A production-grade portfolio with secure Express/MongoDB backend & dual CV download engine.\n4. 🚀 **Campus Hackathon Portal**: Event dashboard for registrations and scoring."
    },
    {
      keywords: ["education", "college", "university", "school", "jklu", "degree", "btech", "studies"],
      answer: "Tejender is currently pursuing a **B.Tech in Computer Science & Artificial Intelligence** at **JK Lakshmipat University, Jaipur** (2024–2028). He completed his Senior Secondary (Class XII) with **85.6% distinction** under the CBSE board."
    },
    {
      keywords: ["experience", "roles", "hackjklu", "gdg", "leadership", "community"],
      answer: "Tejender served as **Social Media Coordinator for HackJKLU v5.0** (managing outreach for 400+ attendees), is an active community participant in **Google Developer Groups (GDG)** where he graduated from their GenAI Bootcamp, and coordinated operations for **Sabrang '24**."
    },
    {
      keywords: ["hire", "internship", "availability", "available", "job", "full-time", "opportunity"],
      answer: "Tejender is actively available for **software engineering internships and full-stack/AI developer roles for 2026**! He is based in Jaipur, India and open to both on-site and remote opportunities. You can message him through the Contact form or email him directly at `shekhawattejendersingh@gmail.com`."
    },
    {
      keywords: ["resume", "cv", "download", "pdf", "docx"],
      answer: "You can download Tejender's resume in two formats: **PDF** (standard printable) or **Word (.docx)** (editable). Scroll down to the Resume section or use the Command Palette (Cmd+K) to download instantly!"
    },
    {
      keywords: ["contact", "email", "reach", "message", "linkedin", "github"],
      answer: "You can reach Tejender directly:\n• **Email**: shekhawattejendersingh@gmail.com\n• **Location**: Jaipur, Rajasthan, India\n• **LinkedIn & GitHub**: Links available in the top navbar and footer!\nYou can also send a direct message through the Contact section on this page."
    }
  ]
};
