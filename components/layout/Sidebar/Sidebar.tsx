import Button from "../../common/Button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store/store";
import { setSidebarOpen } from "@/lib/store/layout/layoutSlice";
import {
    TbLayoutSidebarLeftCollapse,
    TbMessageCirclePlus,
} from "react-icons/tb";
import SidebarChatHistory from "./SidebarChatHistory";
import useFeedback from "@/lib/hooks/useFeedback";

export default function Sidebar() {
    const { sidebarOpen } = useAppSelector((state: RootState) => state.layout);
    const dispatch = useAppDispatch();

    const {showSuccess, showError} = useFeedback()

    const sidebarStyles = `fixed flex flex-col gap-2 lg:static bg-surface inset-y-0 left-0 w-1/2 min-w-64 max-w-96 lg:w-64 shadow-lg z-[100] transform transition-all duration-500 ease-in-out ${
        sidebarOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full lg:translate-x-0 lg:opacity-100 opacity-0"
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
                    <SidebarChatHistory />
                </div>
            </>
        );
    }
}
