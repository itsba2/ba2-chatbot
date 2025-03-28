import { createOllama } from "ollama-ai-provider";

export const maxDuration = 60;

export const ollama = createOllama({
    baseURL: `http://${process.env.OLLAMA_HOST}:${process.env.OLLAMA_PORT}/${process.env.OLLAMA_ENDPOINT}`,
});
