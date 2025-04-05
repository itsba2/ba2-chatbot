"use client";
import FeedbackContainer from "@/components/feedback/FeedbackContainer";
import ChatContainer from "@/components/layout/ChatContainer";
import Sidebar from "@/components/layout/Sidebar/Sidebar";

export default function Chat() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <ChatContainer />
            <FeedbackContainer />
        </div>
    );
}
