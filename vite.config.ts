import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

function aiChatPlugin() {
  return {
    name: 'ai-chat-plugin',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const pathname = req.url ? req.url.split('?')[0] : '';
        if (pathname === '/api/chat' && req.method === 'POST') {
          const processBody = async (bodyString: string) => {
            try {
              const data = JSON.parse(bodyString || '{}');
              const message = (data.message || '').trim();
              const device = data.device || 'Desktop';
              const role = data.role || 'general';
              const rawHistory = Array.isArray(data.history) ? data.history : [];
              const apiKey = process.env.GEMINI_API_KEY;

              if (!apiKey) {
                res.writeHead(503, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'No API key configured' }));
                return;
              }

              if (!message) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Message cannot be empty' }));
                return;
              }

              // Determine model based on task type:
              // - gemini-3.1-pro-preview for particularly complex tasks (architecture, deep coding, intricate scoping)
              // - gemini-3.5-flash for general tasks
              // - gemini-3.1-flash-lite for tasks that should happen fast
              let targetModel = 'gemini-3.5-flash';
              const isComplexTask = role === 'architect' || 
                data.taskType === 'complex' ||
                /architecture|schema|database|system design|security audit|refactor|benchmark|api spec/i.test(message);
              const isFastTask = role === 'fast' || data.taskType === 'fast';

              if (isComplexTask) {
                targetModel = 'gemini-3.1-pro-preview';
              } else if (isFastTask) {
                targetModel = 'gemini-3.1-flash-lite';
              } else {
                targetModel = 'gemini-3.5-flash';
              }

              // Specific system instructions per role
              let systemInstruction = '';
              if (role === 'architect' || isComplexTask) {
                systemInstruction = `You are RanSovie AI Senior Solutions Architect & Engineering Lead for RanSovie It Agency & Technology (A Zaidan Enterprise).
Your role: Provide deep technical guidance, software architecture design, tech stack recommendations (React, Next.js, Node.js, TypeScript, Python, PostgreSQL, AWS/GCP), API integrations, and rigorous enterprise scope breakdowns.
Client context: Browsing on ${device}.
Motto: "Strategic Design, Advanced Tech & Targeted Growth".
Rules:
- Be highly technical, structured, and authoritative. Provide architecture diagrams in text/markdown when relevant.
- Address scalability, 99.9% uptime, sub-second latency, security, and CI/CD pipelines.
- Match user language (Bengali or English).`;
              } else if (role === 'fast' || isFastTask) {
                systemInstruction = `You are RanSovie AI Fast Response Assistant for RanSovie It Agency & Technology (A Zaidan Enterprise).
Your role: Provide ultra-fast, high-speed, crisp factual answers in 2-3 sentences.
Client context: Browsing on ${device}.
Services: Web Development, UI/UX Design, Growth Marketing.
Pricing: Basic ($499/mo), Professional ($999/mo), Enterprise (Custom).
Contact: +1 501 325-7990, contact@ransovie.com, /contact.html.
Rules:
- Keep answers ultra concise and direct.
- Respond in the language used by the user (Bengali or English).`;
              } else {
                systemInstruction = `You are RanSovie AI, the official intelligent digital consultant for RanSovie It Agency & Technology, proudly powered by A Zaidan Enterprise.
Agency Motto: "Strategic Design, Advanced Tech & Targeted Growth".
The user is currently browsing on a ${device}.
Your capabilities & agency knowledge:
- Full-Stack Web Development: MERN, Next.js, TypeScript, Node.js, Python, Tailwind, E-Commerce, Custom CRM/ERP, AWS/Cloud (0.4s fast load, 99.9% uptime).
- Bespoke Graphic Design & UI/UX: Figma interactive prototypes, tokenized design systems, corporate brand identity.
- Digital Marketing & SEO: Google Ads, Meta Ads (Avg 4.8x ROAS), Technical SEO (+240% organic traffic boost), Conversion Rate Optimization.
- Transparent Pricing Packages: Basic ($499/mo), Professional ($999/mo), Enterprise Bespoke with milestone billing (40%/30%/30%).
- Post-Launch: 30-day complimentary code warranty.
- Contact: contact@ransovie.com, phone +1 501 325-7990, quote booking at /contact.html.
Rules:
- Maintain full conversation context across multi-turn interactions.
- Respond in the language used by the user (Bengali, English, or Banglish).
- Keep responses friendly, well-structured, formatted with bold text and clean bullet points.
- Include actionable next steps (like inviting them to /contact.html or to view /pricing.html).`;
              }

              // Multi-turn conversation history assembly
              const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

              for (const item of rawHistory) {
                const text = (item.text || '').trim();
                if (!text) continue;
                const turnRole = (item.role === 'model' || item.role === 'bot' || item.role === 'assistant') ? 'model' : 'user';

                if (formattedContents.length === 0) {
                  if (turnRole === 'user') {
                    formattedContents.push({ role: 'user', parts: [{ text }] });
                  }
                } else {
                  const last = formattedContents[formattedContents.length - 1];
                  if (last.role === turnRole) {
                    last.parts[0].text += '\n' + text;
                  } else {
                    formattedContents.push({ role: turnRole, parts: [{ text }] });
                  }
                }
              }

              // Append current user message
              if (formattedContents.length > 0 && formattedContents[formattedContents.length - 1].role === 'user') {
                formattedContents[formattedContents.length - 1].parts[0].text += '\n' + message;
              } else {
                formattedContents.push({ role: 'user', parts: [{ text: message }] });
              }

              const { GoogleGenAI } = await import('@google/genai');
              const ai = new GoogleGenAI({
                apiKey,
                httpOptions: {
                  headers: {
                    'User-Agent': 'aistudio-build',
                  }
                }
              });

              let response;
              let actualModel = targetModel;

              try {
                response = await ai.models.generateContent({
                  model: targetModel,
                  contents: formattedContents,
                  config: {
                    systemInstruction,
                  }
                });
              } catch (primaryErr: any) {
                if (targetModel !== 'gemini-3.5-flash') {
                  console.warn(`Falling back from ${targetModel} to gemini-3.5-flash:`, primaryErr?.message);
                  actualModel = 'gemini-3.5-flash';
                  response = await ai.models.generateContent({
                    model: 'gemini-3.5-flash',
                    contents: formattedContents,
                    config: {
                      systemInstruction,
                    }
                  });
                } else {
                  throw primaryErr;
                }
              }

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ 
                reply: response.text,
                model: actualModel,
                role: role
              }));
            } catch (err: any) {
              console.error('Chat API error:', err);
              const statusCode = err?.status === 'UNAVAILABLE' || err?.message?.includes('503') ? 503 : 500;
              res.writeHead(statusCode, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message || 'Failed to process AI chat' }));
            }
          };

          if (req.body) {
            processBody(typeof req.body === 'string' ? req.body : JSON.stringify(req.body));
          } else {
            let body = '';
            req.on('data', (chunk: any) => { body += chunk; });
            req.on('end', () => processBody(body));
            req.on('error', (e: any) => {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: e.message }));
            });
          }
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), aiChatPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          services: path.resolve(__dirname, 'services.html'),
          webDevelopment: path.resolve(__dirname, 'web-development.html'),
          graphicDesign: path.resolve(__dirname, 'graphic-design.html'),
          digitalMarketing: path.resolve(__dirname, 'digital-marketing.html'),
          portfolio: path.resolve(__dirname, 'portfolio.html'),
          about: path.resolve(__dirname, 'about.html'),
          blog: path.resolve(__dirname, 'blog.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          pricing: path.resolve(__dirname, 'pricing.html'),
        }
      }
    }
  };
});
