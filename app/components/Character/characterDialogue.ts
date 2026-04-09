export const dialogueMap: Record<string, string> = {
  hero: "Hey! Welcome to my portfolio. Scroll down to see my work!",
  about: "This is my origin story. B.E. student building real systems.",
  skills: "Here's everything I've learned through real projects.",
  projects: "These are live. FinShield won a hackathon.",
  certs: "6 internships. Each one taught me something real.",
  contact: "Let's build something together. I reply within 24 hours."
};

export const poseMap: Record<string, string> = {
  hero: "idle",
  about: "talk",
  skills: "think",
  projects: "point",
  certs: "talk",
  contact: "wave"
};

export const poseImages: Record<string, string> = {
  idle: "/static/character_idle.png",
  walk: "/static/character_wave.png",
  talk: "/static/character_talk.png",
  point: "/static/character_point.png",
  think: "/static/character_think.png",
  wave: "/static/character_wave.png"
};
