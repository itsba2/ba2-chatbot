import { MessageWithThink } from "./types";

export function parseDate(date: Date | undefined): string {
    if (!date) {
        date = new Date();
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * @description Receives a message content as string.
 * Parses the message content to separate the content between <think> tags and the real answer coming afterwards.
 * Returns an object of type `MessageWithThink`.
 * @param {string} content
 * @returns {MessageWithThink}
 */
export function parseThink(content: string): MessageWithThink {
    const thinkRegex = /<think>([\s\S]*?)<\/think>/;
    const match = content.match(thinkRegex);

    if (match) {
        const think = match[1].trim();
        const answer = content.replace(match[0], "").trim();
        return { think, answer };
    }

    const unclosedThinkRegex = /<think>([\s\S]*)/;
    const unclosedMatch = content.match(unclosedThinkRegex);

    if (unclosedMatch) {
        return {
            think: unclosedMatch[1].trim(),
            answer: "",
        };
    }

    return {
        think: "",
        answer: content.trim(),
    };
}
