import { Message, streamText } from "ai";
import { createOllama } from "ollama-ai-provider";

export const maxDuration = 60;

const ollama = createOllama({
  baseURL: "http://localhost:11434/api",
});

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();
  const result = streamText({
    model: ollama("deepseek-r1:1.5b"),
    messages,
  });
  return result.toDataStreamResponse();
}
