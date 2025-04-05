import { Message, streamText } from "ai";
import { ollama } from "@/lib/utils/llm/ollama";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ model: string }> }
) {
    try {
        const { model } = await params;
        const { messages }: { messages: Message[] } = await req.json();

        const result = streamText({
            model: ollama(model),
            messages,
        });
        return result.toDataStreamResponse();
    } catch (error) {
        return NextResponse.json(
            { error: "Cannot generate response" },
            { status: 500 }
        );
    }
}
