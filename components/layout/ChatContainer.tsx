import { useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store/store";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import Message from "../chat/Message";
import { parseDate, parseThink } from "@/lib/utils/parsers";
import TextField from "../chat/TextField";
import Topbar from "./Topbar";

export default function ChatContainer() {
    const { model: selectedModel } = useAppSelector(
        (state: RootState) => state.llm
    );
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        status,
        stop,
        error,
        reload,
        id,
    } = useChat({ api: `/api/chats/${selectedModel}` });

    useEffect(() => {
        if (isAutoScroll && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isAutoScroll]);

    useEffect(() => {
        const scrollDiv = scrollRef.current;
        if (!scrollDiv) return;

        const handleScroll = () => {
            const isAtBottom =
                scrollDiv.scrollHeight -
                    scrollDiv.scrollTop -
                    scrollDiv.clientHeight <
                100;
            setIsAutoScroll(isAtBottom);
        };

        scrollDiv.addEventListener("scroll", handleScroll);
        return () => scrollDiv.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <Topbar selectedModel={selectedModel} chatId={id} />
            <main className="flex flex-col w-full h-screen overflow-hidden bg-background">
                <div
                    ref={scrollRef}
                    className="relative flex w-full flex-1 overflow-x-hidden overflow-y-scroll"
                >
                    <div className="relative mx-auto flex flex-col flex-1 h-full w-full max-w-3xl">
                        <div className="flex-1 flex flex-col gap-3 px-4 max-w-3xl mx-auto w-full pt-1">
                            {messages.map((message) => (
                                <div key={message.id}>
                                    {message.role === "user" ? (
                                        <Message
                                            content={message.content}
                                            date={parseDate(message.createdAt)}
                                            role="user"
                                        />
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            {parseThink(message.content)
                                                ?.think && (
                                                <Message
                                                    content={
                                                        parseThink(
                                                            message.content
                                                        ).think
                                                    }
                                                    date={parseDate(
                                                        message.createdAt
                                                    )}
                                                    role="think"
                                                    collapsible
                                                />
                                            )}
                                            {parseThink(message.content)
                                                ?.answer && (
                                                <Message
                                                    content={
                                                        parseThink(
                                                            message.content
                                                        ).answer
                                                    }
                                                    date={parseDate(
                                                        message.createdAt
                                                    )}
                                                    role="assistant"
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {error && (
                                <div className="w-full rounded p-2 bg-red-500 text-white text-center cursor-pointer">
                                    {error.message}
                                    {error.stack}
                                </div>
                            )}
                        </div>
                        <TextField
                            handleSubmit={handleSubmit}
                            input={input}
                            handleInputChange={handleInputChange}
                            status={status}
                            stop={stop}
                            reload={reload}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
