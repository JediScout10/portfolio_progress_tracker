// Section IDs must match the actual <section id="..."> values in page.tsx
export const SECTION_IDS = ['hero', 'stack', 'work', 'about', 'contact'];

// Dialogue shown after the character arrives at each section
export const dialogueMap: Record<string, string> = {
  hero:    "Hey! I'm Rohit. Full stack engineer and security specialist. Scroll down to explore.",
  stack:   "These are the tools I reach for. Each one battle-tested on real production systems.",
  work:    "Live projects. FinShield won a hackathon and runs on real traffic. Check them out.",
  about:   "6 internships, 3 certs, one goal — build systems that actually hold up under pressure.",
  contact: "Open for serious projects. I reply within 24 hours. Let's build something.",
};

// Correct pose per section — applied only AFTER arrival
export const poseMap: Record<string, string> = {
  hero:    'wave',
  stack:   'think',
  work:    'point',
  about:   'talk',
  contact: 'wave',
};

// Sprite file map — walk uses idle since there's no walk sprite
export const poseImages: Record<string, string> = {
  idle:  '/static/character_idle.png',
  walk:  '/static/character_idle.png',   // no walk sprite — keep idle while moving
  wave:  '/static/character_wave.png',
  talk:  '/static/character_talk.png',
  point: '/static/character_point.png',
  think: '/static/character_think.png',
};
