import { Dispatch, SetStateAction } from "react";
import Button from "../common/Button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store/store";
import { setSidebarOpen } from "@/lib/store/layout/layoutSlice";
import {
    TbLayoutSidebarLeftCollapse,
    TbMessageCirclePlus,
} from "react-icons/tb";

// interface SidebarProps {
//     sidebarOpen: boolean;
//     setSidebarOpen: Dispatch<SetStateAction<boolean>>;
// }

const chatHistory = [
    { id: 1, title: "My chat", timestamp: "2 hours ago" },
    { id: 2, title: "Your chat", timestamp: "Yesterday" },
    { id: 3, title: "Her chat", timestamp: "3 days ago" },
];

export default function Sidebar() {
    const { sidebarOpen } = useAppSelector((state: RootState) => state.layout);
    const dispatch = useAppDispatch();

    const sidebarStyles = `fixed lg:static bg-surface inset-y-0 left-0 w-1/2 min-w-64 max-w-96 lg:w-64 shadow-lg z-[100] transform transition-all duration-500 ease-in-out ${
       sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full lg:translate-x-0 lg:opacity-100 opacity-0'
    }`;

    if (sidebarOpen) {
        return (
            <>
                <div
                    className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden transition-opacity duration-300 pointer-events-auto"
                    onClick={() => dispatch(setSidebarOpen(false))}
                />
                <div className={sidebarStyles}>
                    <div className="flex items-center gap-2 px-4 py-2">
                        <Button
                            variant="secondary"
                            onClick={() => dispatch(setSidebarOpen(false))}
                        >
                            <TbLayoutSidebarLeftCollapse className="icon" />
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => console.log("new chat clicked")}
                        >
                            <TbMessageCirclePlus className="icon" />
                        </Button>
                    </div>

                    <div className="p-4">
                        <div className="space-y-2 mt-2">
                            {chatHistory.map((chat) => (
                                <div
                                    key={chat.id}
                                    className="p-2  text-gray-950 rounded-md cursor-pointer flex items-start"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {chat.title}
                                        </p>
                                        <p className="text-xs">
                                            {chat.timestamp}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
