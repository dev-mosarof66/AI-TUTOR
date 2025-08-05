/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const POST = async (req: NextRequest) => {
    try {
        const { prompt } = await req.json();

        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json(
                { message: "Prompt is required and must be a string." },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(
            `Generate a detailed course outline  for the following course prompt: "${prompt}".
Return a JSON response with the following format:
{
  "title": "Course Title", - don't change the title , keep it as it is and just extract it from the prompt
  "modules": [
    {
      "title": "Module 1: Title",
      "topics": ["Topic 1", "Topic 2", "..."]
    },
    ...
  ]
}`
        );

        const content = await result.response.text();

        const jsonMatch = content.match(/\{[\s\S]*\}/); // Greedy match for first JSON block
        if (!jsonMatch) {
            return NextResponse.json(
                { message: "Could not parse JSON from AI response." },
                { status: 500 }
            );
        }

        const parsed = JSON.parse(jsonMatch[0]);

        return NextResponse.json({
            id: Date.now().toString(),
            title: parsed.title,
            modules: parsed.modules,
        });
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { message: "Failed to generate course outline." },
            { status: 500 }
        );
    }
};
