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

export type FeedbackLevel = "error" | "warning" | "info" | "success";

export interface FeedbackItem {
    id: string;
    message: string;
    level: FeedbackLevel;
    timeout: number;
    createdAt: number;
}

export interface FeedbackProps {
    message: string;
    level: FeedbackLevel;
    timeout?: number; 
}