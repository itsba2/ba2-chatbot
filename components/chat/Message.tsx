import { MessageProps } from "@/utils/types";
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
        assistant: "bg-gray-100 text-left mr-auto",
        think: "bg-blue-100 text-left mr-auto",
    };
    const styles = `flex flex-col w-full whitespace-pre-wrap p-4 text-gray-900 rounded md:max-w-5/6 ${roles[role]} ${className}`;
    return (
        <div className={styles}>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-semibold">{role}</span>
                    <span className="text-gray-500 text-xs">{date}</span>
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
