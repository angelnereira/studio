import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { anthropic } from 'genkitx-anthropic';
import { openAI } from 'genkitx-openai';

export const ai = genkit({
  plugins: [
    googleAI(),
    anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }),
    openAI({ apiKey: process.env.OPENAI_API_KEY }),
  ],
  model: 'googleai/gemini-2.5-flash', // Default model
});
