import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/utils/db";

export async function GET(req: NextRequest) {
    const clientId = req.nextUrl.searchParams.get("clientId");

    if (!clientId) {
        return NextResponse.json(
            { error: "Client ID is required" },
            { status: 400 }
        );
    }

    try {
        const chats = await db.chat.findMany({
            where: { clientId },
            orderBy: { updatedAt: "desc" },
            include: {
                messages: {
                    orderBy: { createdAt: "asc" },
                },
            },
        });

        return NextResponse.json({ chats });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch chats" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { title, modelId, clientId } = await req.json();

        if (!title || !modelId || !clientId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const chat = await db.chat.create({
            data: {
                title,
                modelId,
                clientId,
            },
        });

        return NextResponse.json({ chat });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create chat" },
            { status: 500 }
        );
    }
}
