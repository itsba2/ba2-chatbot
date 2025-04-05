const chatHistory = [
    { id: 1, title: "My looooooooooooooooooong chat", timestamp: "2 hours ago" },
    { id: 2, title: "Your chat", timestamp: "Yesterday" },
    { id: 3, title: "Her chat", timestamp: "3 days ago" },
];

export default function SidebarChatHistory() {
    return (
        <div className="flex flex-col gap-2 p-2">
            {chatHistory.map((chat) => (
                <div
                    key={chat.id}
                    className="flex flex-col p-2 rounded-md cursor-pointer bg-paper hover:bg-paper-action duration-150"
                >
                    <p className="truncate">{chat.title}</p>
                    <p className="text-hint text-xs">{chat.timestamp}</p>
                </div>
            ))}
        </div>
    );
}
