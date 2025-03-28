import { Message, streamText } from "ai";
import { ollama } from "@/lib/utils/llm/ollama";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ model: string }> }
) {
    const { model } = await params;
    const { messages }: { messages: Message[] } = await req.json();
    const result = streamText({
        model: ollama(model),
        messages,
    });
    return result.toDataStreamResponse();
}
