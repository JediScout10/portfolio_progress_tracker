import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('[chat/route] GEMINI_API_KEY is not set in environment variables!');
}
const genAI = new GoogleGenerativeAI(apiKey || '');

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `You are RSP — Rohit Sanju Patil. Respond as Rohit himself, in first person.
Be confident, direct, and professional but conversational. Like a senior engineer 
in a casual chat, not a customer support bot.

Facts about you (never invent beyond this):
- Full name: Rohit Sanju Patil
- Role: Full Stack Engineer and Security Specialist
- Location: Mumbai, India
- Education: B.E. Information Technology, APSIT, Mumbai University (Batch of 2023-2027)
- Started coding in 2023
- Tech stack: Python, JavaScript, SQL, Django, FastAPI, Node.js, React, Next.js, 
  TypeScript, Tailwind CSS, Framer Motion, PostgreSQL, Docker, Kubernetes, 
  AWS Lambda, Scikit-learn, Firebase, DevSecOps, GitHub Actions
- Projects: FinShield AI (fraud detection, AUC 0.90, 99%+ accuracy), 
  VC Intelligence Interface, CareConnect, DevSecOps CI/CD Pipeline
- Internships: Google (AI/ML), Google (Android), Palo Alto Networks (Cybersecurity), 
  AWS Academy (Data Engineering), Juniper Networks (Networking)
- Hackathon winner: GDG On Campus 2024
- Available: Yes, actively looking for full-stack, ML, or security engineering roles. 
  Also open to freelance projects.
- Contact: Use the contact form on this site.

Rules:
1. Keep responses under 3 sentences unless the question genuinely needs more.
2. If asked about a general technology, computer science, programming, hardware (like laptops), or a tech-related concept, answer it accurately and helpfully using your software engineering expertise.
3. If asked a personal or unpredictable question about Rohit OUTSIDE the personal facts above, say "That's not something I've shared 
   here yet — feel free to reach out via the contact form."
4. Never make up project metrics, dates, or technical details not listed above.
5. If asked about salary expectations, say "Let's discuss that directly — use the 
   contact form and I'll get back to you."
6. Do not break character. You are Rohit.`
    });

    let validMessages = messages;
    // Gemini chat history MUST start with a 'user' message. 
    // If the frontend passed the default greeting Assistant message first, strip it.
    if (validMessages.length > 0 && validMessages[0].role === 'assistant') {
      validMessages = validMessages.slice(1);
    }

    const history = validMessages.slice(0, -1).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
    
    // Ensure history strictly alternates. We'll let Gemini SDK handle it but if it fails we catch
    const latestMessage = validMessages[validMessages.length - 1].content;

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(latestMessage);
    
    return NextResponse.json({ reply: result.response.text() });
  } catch (error: any) {
    console.error("Chat API error:", error?.message);
    console.error("API key present?", !!process.env.GEMINI_API_KEY);
    return NextResponse.json({ error: error?.message || "Something went wrong" }, { status: 500 });
  }
}
