# ⚡ Tejender Singh Shekhawat - MERN Stack Portfolio

A full-stack, production-ready developer portfolio built for the **MERN Stack Course Assignment: Personal Portfolio Website**.

---

## 🌟 Overview & Key Features

This portfolio demonstrates complete end-to-end MERN stack integration with a focus on UI polish, responsiveness, accessibility, and robust backend engineering.

### 8 Required Assignment Sections:
1. **Hero / Landing Section**:
   - Animated entrance using Framer Motion.
   - Dynamic **Typewriter effect** cycling through engineering roles.
   - Dual Call-To-Action buttons to download CV in both **PDF** and **Word (.docx)** formats.
   - Status badge and social link integrations.
2. **About Me**:
   - Professional bio, location (Jaipur, India), and academic status at JK Lakshmipat University.
   - Dynamic profile avatar card and key statistics grid.
3. **Skills Section**:
   - Grouped by **Frontend**, **Backend**, and **Tools & Technologies**.
   - Interactive category filter tabs.
   - **Animated progress bars** with proficiency level badges (*Mastery*, *Advanced*, *Proficient*, *Intermediate*).
4. **Projects Showcase**:
   - Interactive project cards with technology stack badges, project summaries, GitHub repository links, and live demo links.
   - Filter tabs by category (*All*, *Full Stack*, *Frontend*, *AI / Python*).
5. **CV / Resume Download Center**:
   - Backend-served routes for both **PDF** (`/api/resume/pdf`) and **Word .docx** (`/api/resume/docx`).
6. **Education & Experience Timeline**:
   - Animated vertical timeline with interactive filter toggles (*All*, *Education*, *Experience*).
   - Milestones including B.Tech CS & AI, CBSE schooling, HackJKLU, and GDG community engagement.
7. **Certifications & Achievements**:
   - Verified credential cards covering Google Developer Groups GenAI Bootcamp, hackathons, and certifications.
8. **Contact Form (Backend Connected)**:
   - Functional contact form validating Name, Email, and Message.
   - Direct integration with the Express.js API and MongoDB database.

### 🎨 Dream Portfolio Interactive Features:
- **Interactive Command Palette (`Cmd+K` / `Ctrl+K`)**: Rapid keyboard-driven navigation, direct project lookup, instant theme toggle, and one-click actions.
- **"Ask Tejender AI" Conversational Assistant**: Grounded portfolio co-mpilot widget answering recruiter and visitor questions about skills, projects, and availability in real time.
- **Project Deep-Dive Modals**: Click "Explore Architecture & Details" to inspect system design, metrics, engineering highlights, and live demo links.
- **Interactive Code Terminal**: Embedded developer philosophy snippet with one-click copy feedback.
- **Live Real-Time Skill Filtering**: Instant search bar dynamically filtering skills by name and proficiency.
- **Top Reading Scroll Indicator & Back-to-Top Navigation**: Smooth progress tracking as visitors scroll.
- **Dark Mode / Light Mode**: Instant toggle with silky CSS variable transitions.
- **Backend Security & Reliability**: Protected with `helmet`, `express-rate-limit`, CORS origin checks, and health monitor (`/api/health`).

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Vite
- **Backend**: Node.js, Express.js, Helmet, Express Rate Limit, CORS, Dotenv
- **Database**: MongoDB, Mongoose ODM

---

## 🚀 Local Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory (based on `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
# Server will run on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
# Frontend will run on http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status check |
| `POST` | `/api/contact` | Submits contact message to MongoDB |
| `GET` | `/api/resume/pdf` | Downloads resume in PDF format |
| `GET` | `/api/resume/docx` | Downloads resume in Word format |

---

## 👨‍💻 Author

**Tejender Singh Shekhawat**  
B.Tech in Computer Science & Artificial Intelligence  
JK Lakshmipat University, Jaipur, India
