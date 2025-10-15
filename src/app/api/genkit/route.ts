import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {startFlowsServer} from '@genkit-ai/next/server';

genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const {GET, POST} = startFlowsServer();
