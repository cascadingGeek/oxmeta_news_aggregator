'use server';

import { GoogleGenAI } from "@google/genai";
import { NewsItem } from "@/types";

export const generateMarketBriefingAction = async (newsItems: NewsItem[]): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key missing. Please configure Gemini API to receive AI-powered briefings.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const headlines = newsItems.map(item => `- ${item.title} (${item.sentiment})`).join('\n');
    const prompt = `
      You are an elite crypto market analyst for a terminal used by institutional traders.
      Analyze the following headlines and provide a concise, high-level "Alpha Insight" (max 2 sentences).
      Focus on the cross-section of AI Agents, Virtuals, and Macro trends.
      Use professional, trading-focused terminology.
      
      Headlines:
      ${headlines}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Analysis currently unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate briefing at this time due to connection issues.";
  }
};