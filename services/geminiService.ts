
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Customizations } from "../types";

export async function generateArtPrompts(
  idea: string, 
  style: string, 
  customs: Customizations
): Promise<{ espanglish: string; chinese: string }[]> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    Eres un ingeniero experto en prompts para IA de arte universal (Midjourney, Stable Diffusion, DALL-E).
    
    TU MISIÓN: Generar 4 variaciones de prompts de alta calidad. Cada variación debe tener DOS versiones:
    1. Versión ESPANGLISH: Una mezcla fluida de español e inglés técnico (ej: "Portrait de una chica anime, (Studio Ghibli style:1.3), soft lighting, high resolution").
    2. Versión CHINO: Una versión profesional 100% en CHINO con etiquetas pesadas (ej: "(吉卜力风格:1.3), 少女肖像, 柔和光线, 高分辨率").
    
    ESTILOS SOPORTADOS: Debes ser capaz de generar prompts para Anime, Fotografía Realista, Óleo, Acuarela, Render 3D, y más.
    
    LÓGICA DE SELECCIÓN:
    Si algún parámetro tiene el valor "✨ AI Choose | AI 决定", DEBES usar tu criterio artístico experto para seleccionar el valor más apropiado que complemente la "Idea Vision" del usuario. 

    REGLAS DE FORMATO:
    - Usa etiquetas con pesos entre paréntesis. Formato: (Tag:Weight).
    - Pesos entre 1.1 y 1.6.
    - Integra los parámetros seleccionados por el usuario para refinar el resultado.

    Debes devolver un ARRAY de OBJETOS con las propiedades "espanglish" y "chinese".
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Idea: "${idea}". Estilo Base: "${style}". Custom Params: ${JSON.stringify(customs)}. Genera 4 pares de prompts.`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.9,
        topP: 0.95,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              espanglish: { type: Type.STRING },
              chinese: { type: Type.STRING }
            },
            required: ["espanglish", "chinese"]
          }
        }
      },
    });

    const text = response.text;
    if (!text) return [];
    const result = JSON.parse(text.trim());
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Error generating prompts. The creative engine failed.");
  }
}
