export interface MessageProps {
    content: string;
    date: string;
    role: "assistant" | "user" | "think";
    collapsible?: boolean;
    className?: string;
}

export interface MessageWithThink {
    think: string;
    answer: string;
}
