"use client";
import ChatContainer from "@/components/layout/ChatContainer";
import Sidebar from "@/components/layout/Sidebar";

export default function Chat() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <ChatContainer />
        </div>
    );
}
