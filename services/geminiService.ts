import { GoogleGenAI } from "@google/genai";

// Removed top-level initialization to prevent startup crashes
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getVibeCheckRecommendation = async (userVibe: string): Promise<string> => {
  try {
    // Initialize the client only when needed (Lazy Initialization)
    // This prevents the entire app from crashing if the API key is missing at startup
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.error("API Key is missing from environment variables.");
      return "System offline. The developer forgot the API key. Oops.";
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
      You are a sassy, irreverent, and high-energy local guide for Lisbon, Portugal. 
      The user is a "Bored Tourist" looking for something cool, not boring.
      
      Rules:
      1. Recommend ONE specific, actual place or activity in Lisbon based on the user's input vibe.
      2. Be brief (max 40 words).
      3. Use a "roast-y" but helpful tone. Like a cool older sibling.
      4. No generic suggestions (no "go to Belem Tower" unless there's a twisted reason).
      5. Format the place name in bold markdown (**Place Name**).
      6. Use slang like "slaps", "lit", "basic", "mid" appropriately but don't overdo it.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `My vibe right now is: ${userVibe}`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 1.2, // High temperature for more creativity/sass
      }
    });

    return response.text || "My brain is buffering. Try again, tourist.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI is on a coffee break. Try again later.";
  }
};