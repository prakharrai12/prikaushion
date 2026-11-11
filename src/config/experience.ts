export type Experience = {
  id: string;
  date: string;
  role: string;
  org: string;
  location?: string;
  description: string;
  tags: string[];
};

export const experiences: Experience[] = [
  {
    id: "01",
    date: "Aug – Nov 2026",
    role: "Website Developer & Core Organiser",
    org: "Hacks 2026 — hosted by NARI",
    location: "Greater Noida, IN",
    description: "Built the official hackathon website (thehacks.in) and am organising the event on 22 Nov 2026 — managing crowd flow and handling participant queries as a core organiser.",
    tags: ["React", "Vite", "Tailwind", "Event Ops"],
  },
  {
    id: "02",
    date: "31 Aug – 11 Oct 2026",
    role: "Internship — Web & AI Projects",
    org: "Amity Polytechnic, AUGN Campus",
    location: "Greater Noida, IN",
    description: "Six-week internship delivering four projects — Finculator, VipraPulse (AI brand-intelligence), an event-hosting platform, and an Indian-meal calorie tracker.",
    tags: ["Python", "FastAPI", "React", "AI"],
  },
  {
    id: "03",
    date: "28 May – 28 Jun 2026",
    role: "STEM Educator (AI & Coding)",
    org: "Vision Sports School & Vision Basketball India",
    location: "New Delhi, IN",
    description: "Taught AI, coding, Scratch and prompt engineering to students from Grade 1 to 8 as a summer intern. Certificate available on LinkedIn.",
    tags: ["Teaching", "AI", "Scratch", "Prompt Eng."],
  },
  {
    id: "04",
    date: "2026",
    role: "Freelance Web Developer",
    org: "Joyra (gifting) · Radix Aroma (essential oils) · Local clients",
    location: "New Delhi / Remote",
    description: "Designed and built websites for local businesses — a gifting store and an essential-oils brand — from brand-matched UI to launch.",
    tags: ["Freelance", "UI/UX", "Branding"],
  },
  {
    id: "05",
    date: "30 Aug – 2 Sep 2025",
    role: "Head Volunteer",
    org: "Technoxian World Cup 9.0 · AICRA · Noida Stadium Complex",
    location: "Noida, IN",
    description: "Led on-ground event operations at an international robotics and AI championship.",
    tags: ["Events", "Leadership"],
  },
  {
    id: "06",
    date: "20 May – 4 Jun 2024",
    role: "Python & AI Summer Camp",
    org: "Rancho Labs × IIT Delhi IHFC",
    location: "IIT Delhi, IN",
    description: "Completed an intensive Python and AI summer programme in collaboration with IIT Delhi's IHFC.",
    tags: ["Python", "AI"],
  },
];

