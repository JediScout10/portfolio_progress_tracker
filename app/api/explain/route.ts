import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { project } = await req.json();
    if (project !== 'finshield') {
      return NextResponse.json({ error: "Unknown project" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(`Rewrite this project description for a non-technical HR recruiter. Focus on business value, real-world impact, and outcomes. No jargon. Max 3 sentences.
  
Project: FinShield AI — A production-grade fraud detection system using a Random Forest ML model trained on a 10-feature engineered dataset. Exposes a FastAPI REST backend, integrates Firebase Auth and Firestore, and provides real-time risk scoring with explainable risk factors. AUC Score: 0.90. Accuracy: 99%+.`);

    return NextResponse.json({ explanation: result.response.text() });
  } catch (error) {
    console.error("Explain API error", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
