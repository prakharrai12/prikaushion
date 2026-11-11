export type SkillItem = {
  name: string;
  level?: number; // 0-100 percentage for skill bar (Frontend, Backend, AI only)
  core?: boolean;
};

export type SkillGroup = {
  id: string;
  category: string;
  index: string;
  items: SkillItem[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    index: "01",
    category: "Frontend",
    items: [
      { name: "React", level: 90, core: true },
      { name: "TypeScript", level: 70, core: true },
      { name: "Vite", level: 85 },
      { name: "Tailwind CSS", level: 90, core: true },
      { name: "HTML/CSS/JS", level: 92 },
      { name: "GSAP", level: 75, core: true },
      { name: "Framer Motion", level: 70 },
    ],
  },
  {
    id: "backend",
    index: "02",
    category: "Backend & Data",
    items: [
      { name: "Python", level: 78, core: true },
      { name: "FastAPI", level: 70 },
      { name: "REST APIs", level: 75 },
    ],
  },
  {
    id: "ai",
    index: "03",
    category: "AI & Machine Learning",
    items: [
      { name: "RAG", level: 65, core: true },
      { name: "Sentiment analysis", level: 60 },
      { name: "Prompt engineering", level: 88, core: true },
      { name: "Ollama (local LLMs)", level: 60 },
    ],
  },
  {
    id: "embedded",
    index: "04",
    category: "Embedded / IoT",
    items: [
      { name: "ESP32-S3", core: true },
      { name: "ESP32-P4" },
      { name: "Sensors & servos" },
    ],
  },
  {
    id: "workflow",
    index: "05",
    category: "Workflow & Cloud",
    items: [
      { name: "Google Antigravity", core: true },
      { name: "Git & GitHub" },
      { name: "Cloudflare Pages" },
      { name: "Excel (intermediate)" },
    ],
  },
  {
    id: "languages",
    index: "06",
    category: "Spoken Languages",
    items: [
      { name: "English — intermediate–advanced" },
      { name: "Hindi — advanced" },
      { name: "Japanese — learning" },
      { name: "Spanish — learning" },
    ],
  },
];

export interface ConstellationNode {
  id: string;
  name: string;
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  core: boolean;
  connections: string[];
}

export const constellationNodes: ConstellationNode[] = [
  { id: "react", name: "React", x: 48, y: 44, core: true, connections: ["typescript", "tailwind", "gsap", "vite", "python"] },
  { id: "typescript", name: "TypeScript", x: 26, y: 32, core: true, connections: ["react", "vite", "fastapi"] },
  { id: "tailwind", name: "Tailwind CSS", x: 74, y: 32, core: true, connections: ["react", "html"] },
  { id: "gsap", name: "GSAP", x: 68, y: 64, core: true, connections: ["react", "framer"] },
  { id: "vite", name: "Vite", x: 38, y: 18, core: false, connections: ["react", "typescript"] },
  { id: "html", name: "HTML/CSS/JS", x: 86, y: 22, core: false, connections: ["tailwind"] },
  { id: "framer", name: "Framer Motion", x: 80, y: 78, core: false, connections: ["gsap"] },
  { id: "python", name: "Python", x: 32, y: 62, core: true, connections: ["react", "fastapi", "rag", "ollama"] },
  { id: "fastapi", name: "FastAPI", x: 16, y: 50, core: false, connections: ["python", "typescript"] },
  { id: "rag", name: "RAG", x: 42, y: 80, core: true, connections: ["python", "prompt"] },
  { id: "prompt", name: "Prompt Eng.", x: 20, y: 78, core: true, connections: ["rag", "ollama"] },
  { id: "ollama", name: "Ollama", x: 12, y: 92, core: false, connections: ["prompt", "esp32"] },
  { id: "esp32", name: "ESP32-S3", x: 54, y: 92, core: true, connections: ["python", "ollama"] },
];
