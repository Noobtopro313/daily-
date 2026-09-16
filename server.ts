import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;

// Lazy initialization of Gemini SDK
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body parsing with larger limit for AI image uploads
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ limit: '15mb', extended: true }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Google Maps API Key endpoint
  app.get('/api/maps-key', (req, res) => {
    const key = process.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDgIiZS5XSSrjj99UEEM5cpxOTZDWPHMyY';
    res.json({ apiKey: key });
  });

  // AI Shopping Assistant multi-turn chat endpoint
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const {
        message,
        history,
        catalogSummary,
        currentProduct,
        whatsappNumber,
        whatsappChannelUrl,
        whatsappCatalogUrl,
        customCatalogFeed,
        model = 'gemini-3.5-flash',
        role = 'shopping-guide',
      } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      const ai = getGeminiClient();

      const channelNotice = whatsappChannelUrl ? `\nWhatsApp Channel: ${whatsappChannelUrl}` : '';
      const catalogNotice = whatsappCatalogUrl ? `\nWhatsApp Catalog: ${whatsappCatalogUrl}` : '';
      const numberNotice = whatsappNumber ? `\nWhatsApp Direct Order Number: +${whatsappNumber}` : '';

      if (!ai) {
        const waLink = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi,%20I%20want%20to%20order` : '';
        res.json({
          reply: `Salam! Main aapka AI Shopping Assistant hoon. Hamari products hamari store aur WhatsApp Catalog se directly available hain. Aap specs, prices ya WhatsApp direct order ke mutaliq pooch sakte hain!${channelNotice}${catalogNotice}`,
          recommendedProductIds: [],
          whatsappActionUrl: waLink,
        });
        return;
      }

      // Dynamic role personas
      let roleInstruction = '';
      if (role === 'tech-engineer') {
        roleInstruction = `You are Nexora Senior Audio & Hardware Engineer. Analyze hardware, sound frequency curves, ANC attenuation (dB), battery mWh, chipset latency (ms), and build materials with deep technical accuracy.`;
      } else if (role === 'deal-hunter') {
        roleInstruction = `You are Nexora Deal Hunter. Highlight current discounts, flash deals, combo savings, warranty perks, and direct WhatsApp discount codes.`;
      } else {
        roleInstruction = `You are Nexora AI, the official friendly shopping assistant for the online store. Help customers choose the ideal gadgets for work, gym, gaming, or daily commute.`;
      }

      const systemPrompt = `${roleInstruction}
Your primary job is to recommend products sourced from the STORE'S CATALOG, WHATSAPP CHANNEL, AND WHATSAPP CATALOG.

CRITICAL INSTRUCTIONS:
1. Language: Answer in Roman Urdu or Urdu if user asks in Roman Urdu/Urdu. If in English, answer in friendly concise English.
2. Primary Source: Prioritize products from the store catalog and the WhatsApp channel / catalog provided below.
3. WhatsApp Ordering: Whenever appropriate or when a user wants to buy/inquire, inform them they can order directly via WhatsApp (${whatsappNumber || 'our official WhatsApp number'}).
4. WhatsApp Channel: If the user asks about new stock, daily deals, or latest updates, recommend joining the store's WhatsApp Channel (${whatsappChannelUrl || 'available via WhatsApp'}).
5. WhatsApp Catalog: If user asks for full catalog or WhatsApp menu, mention the WhatsApp Catalog link (${whatsappCatalogUrl || 'catalog on WhatsApp'}).

WHATSAPP DETAILS:
${numberNotice}
${channelNotice}
${catalogNotice}

ADDITIONAL WHATSAPP CHANNEL / CATALOG FEED:
${customCatalogFeed || 'No custom feed provided yet. Use the main store catalog.'}

STORE CATALOG:
${catalogSummary || 'Various premium electronics, ANC headphones, smartwatches, mechanical keyboards, magnetic wireless chargers.'}

${currentProduct ? `CUSTOMER IS CURRENTLY VIEWING: ${JSON.stringify(currentProduct)}` : ''}

Keep answers conversational, 2-4 sentences max unless technical details are requested. Mention specific product names and prices.`;

      // Select model:
      // gemini-3.1-pro-preview for complex tasks, gemini-3.5-flash for general, gemini-3.1-flash-lite for fast
      const validModels = ['gemini-3.5-flash', 'gemini-3.1-pro-preview', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
      const chosenModel = validModels.includes(model) ? model : 'gemini-3.5-flash';

      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        history.slice(-8).forEach((h: { role: string; content?: string; text?: string }) => {
          const text = h.content || h.text;
          if (text) {
            contents.push({
              role: h.role === 'user' ? 'user' : 'model',
              parts: [{ text }],
            });
          }
        });
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: chosenModel,
        contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      const reply = response.text || 'I am here to help you find the best tech gadgets at Nexora Tech!';

      res.json({
        reply,
        modelUsed: chosenModel,
      });
    } catch (error: any) {
      console.error('[AI Chat Error]:', error);
      res.status(500).json({
        error: 'Failed to generate AI response',
        details: error?.message || 'Unknown error',
      });
    }
  });

  // AI Create & Edit Image endpoint using gemini-3.1-flash-image-preview
  app.post('/api/ai/image', async (req, res) => {
    try {
      const { prompt, inputImage, mode = 'create' } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      const ai = getGeminiClient();
      if (!ai) {
        res.status(503).json({
          error: 'Gemini API key is not configured. Add GEMINI_API_KEY to secrets.',
        });
        return;
      }

      const imageModels = ['gemini-3.1-flash-image-preview', 'gemini-3.1-flash-image', 'gemini-3.1-flash-lite-image'];
      let imageResultBase64: string | null = null;
      let usedModel = '';
      let textResponse = '';

      for (const targetModel of imageModels) {
        try {
          if (mode === 'edit' && inputImage) {
            const cleanBase64 = inputImage.replace(/^data:image\/[a-z]+;base64,/, '');
            const mimeMatch = inputImage.match(/^data:(image\/[a-z]+);base64,/);
            const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

            const response = await ai.models.generateContent({
              model: targetModel,
              contents: {
                parts: [
                  {
                    inlineData: {
                      data: cleanBase64,
                      mimeType,
                    },
                  },
                  {
                    text: `Edit this product image: ${prompt}`,
                  },
                ],
              },
            });

            if (response.candidates?.[0]?.content?.parts) {
              for (const part of response.candidates[0].content.parts) {
                if (part.inlineData?.data) {
                  imageResultBase64 = `data:image/png;base64,${part.inlineData.data}`;
                  usedModel = targetModel;
                  break;
                } else if (part.text) {
                  textResponse += part.text + ' ';
                }
              }
            }
          } else {
            const response = await ai.models.generateContent({
              model: targetModel,
              contents: {
                parts: [
                  {
                    text: `Create a clean, commercial, photorealistic high-resolution product showcase image for tech e-commerce store: ${prompt}`,
                  },
                ],
              },
              config: {
                imageConfig: {
                  aspectRatio: '1:1',
                },
              },
            });

            if (response.candidates?.[0]?.content?.parts) {
              for (const part of response.candidates[0].content.parts) {
                if (part.inlineData?.data) {
                  imageResultBase64 = `data:image/png;base64,${part.inlineData.data}`;
                  usedModel = targetModel;
                  break;
                } else if (part.text) {
                  textResponse += part.text + ' ';
                }
              }
            }
          }

          if (imageResultBase64) {
            break;
          }
        } catch (modelErr: any) {
          console.warn(`[AI Image] Model ${targetModel} attempt:`, modelErr?.message || modelErr);
        }
      }

      if (imageResultBase64) {
        res.json({
          imageUrl: imageResultBase64,
          modelUsed: usedModel,
          caption: textResponse.trim(),
        });
      } else {
        res.status(500).json({
          error: 'Could not generate image with available models',
          details: textResponse || 'The model did not return image bytes.',
        });
      }
    } catch (error: any) {
      console.error('[AI Image Error]:', error);
      res.status(500).json({
        error: 'Failed to generate/edit image',
        details: error?.message || 'Internal error',
      });
    }
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nexora Tech Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
