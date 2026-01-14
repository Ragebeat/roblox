
import { GoogleGenAI, Type, Language } from "@google/genai";

export async function generateBusinessIdeas(lang: Language = 'ja') {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const promptMap = {
    ja: `以下のRobloxリサーチデータに基づき、日本市場の強み（IP、文化、教育、観光）とグローバル市場を掛け合わせた具体的なビジネス案を10個、JSON形式で提案してください。
    各案には「タイトル」「ターゲット」「マネタイズ手法」「スケール戦略」を含めてください。
    リサーチデータ：日本のDAU成長率+120%、文化テーマ『The Inn』、30%の手数料等。`,
    ru: `На основе данных исследования рынка Roblox (рост DAU в Японии +120%, успех культурных проектов вроде 'The Inn', комиссия 30%, монетизация через DevEx), предложите 10 конкретных бизнес-идей на стыке японской культуры/IP и глобального рынка.
    Ответ должен быть на русском языке в формате JSON.
    Для каждой идеи укажите: "title" (название), "target" (целевая аудитория), "monetization" (метод монетизации), "scalability" (стратегия масштабирования).`
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: promptMap[lang],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            target: { type: Type.STRING },
            monetization: { type: Type.STRING },
            scalability: { type: Type.STRING }
          },
          required: ["title", "target", "monetization", "scalability"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return [];
  }
}
