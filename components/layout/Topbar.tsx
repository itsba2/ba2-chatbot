import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store/store";
import { setSidebarOpen } from "@/lib/store/layout/layoutSlice";
import { setModel } from "@/lib/store/llm/llmSlice";
import Button from "../common/Button";
import Select from "../common/Select";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

const models = [
    { value: "deepseek-r1:1.5b", label: "DeepSeek-R1 (1.5B)" },
    { value: "llama3.2:1b", label: " LLaMa 3.2 (1B)" },
];

export default function Topbar({
    selectedModel,
    chatId,
}: {
    selectedModel: string;
    chatId: string;
}) {
    const { sidebarOpen } = useAppSelector((state: RootState) => state.layout);
    const dispatch = useAppDispatch();
    return (
        <header className="z-10 h-16 bg-surface">
            <div className="flex items-center justify-between px-4 py-2 h-full">
                <div>
                    {!sidebarOpen && (
                        <Button
                            variant="secondary"
                            onClick={() => dispatch(setSidebarOpen(true))}
                        >
                            <TbLayoutSidebarLeftExpand className="icon" />
                        </Button>
                    )}
                </div>
                Chat
                <div className="flex items-center">
                    <Select
                        options={models}
                        value={selectedModel}
                        onChange={(e) => dispatch(setModel(e.target.value))}
                        className="flex-end w-48"
                    />
                </div>
            </div>
        </header>
    );
}
