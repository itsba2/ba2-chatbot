import { MessageProps } from "@/lib/utils/types";
import { useState } from "react";

export default function Message({
    content,
    date,
    role,
    collapsible = false,
    className,
}: MessageProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const roles = {
        user: "bg-green-100 text-left ml-auto",
        assistant: "bg-amber-100 text-left mr-auto",
        think: "bg-blue-100 text-left mr-auto",
    };
    const styles = `flex flex-col w-full gap-2 whitespace-pre-wrap p-4 rounded md:max-w-5/6 ${roles[role]} ${className}`;
    return (
        <div className={styles}>
            <div className="flex justify-between items-center">
                <div className="flex items-baseline gap-2">
                    <span className="text-hint font-semibold">{role}</span>
                    <span className="text-disabled text-sm">{date}</span>
                </div>
                {collapsible && (
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        aria-label={
                            isCollapsed ? "Expand message" : "Collapse message"
                        }
                        className="text-gray-500 hover:text-gray-700 text-xs px-1.5 py-0.5 rounded border border-gray-300 cursor-pointer"
                    >
                        {isCollapsed ? "Expand" : "Collapse"}
                    </button>
                )}
            </div>
            {!isCollapsed && content}
        </div>
    );
}
