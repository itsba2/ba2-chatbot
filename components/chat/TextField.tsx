import { ChatRequestOptions } from "ai";
import Button from "../common/Button";
import { TbPlayerStop, TbReload, TbSend } from "react-icons/tb";

interface TextFieldProps {
    handleSubmit: (
        e?: {
            preventDefault?: () => void;
        },
        chatRequestOptions?: ChatRequestOptions
    ) => void;
    handleInputChange: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => void;
    input: string;
    status: "submitted" | "streaming" | "error" | "ready";
    stop: () => void;
    reload: () => void;
}

export default function TextField({
    handleSubmit,
    input,
    handleInputChange,
    status,
    stop,
    reload,
}: TextFieldProps) {
    return (
        <div className="sticky bottom-0 w-full mx-auto px-2 pb-4 pt-8">
            <form
                role="form"
                onSubmit={handleSubmit}
                className="flex gap-2 h-[10rem]"
            >
                <textarea
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                    value={input}
                    placeholder="Talk to me"
                    onChange={handleInputChange}
                    className="w-5/6 resize-none max-h-[10rem] p-4 bg-paper border border-gray-500 rounded focus:outline-none focus:ring-0 overflow-auto"
                />
                <div className="w-1/6 flex flex-col gap-2">
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={
                            status === "submitted" || status === "streaming"
                        }
                    >
                        <TbSend className="icon" />
                    </Button>
                    <Button
                        onClick={stop}
                        variant="secondary"
                        disabled={
                            status !== "submitted" && status !== "streaming"
                        }
                    >
                        <TbPlayerStop className="icon" />
                    </Button>
                    <Button
                        onClick={() => reload()}
                        variant="secondary"
                        disabled={status !== "error"}
                    >
                        <TbReload className="icon" />
                    </Button>
                </div>
            </form>
        </div>
    );
}

// {/* Input area */}
// <div className="bg-white border-t p-4">
// <form onSubmit={handleSendMessage} className="flex space-x-2">
//     <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type your message..."
//         className="flex-1 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//     />
//     <button
//         type="submit"
//         className="bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         disabled={!input.trim()}
//     >
//         <Send size={20} />
//     </button>
// </form>
// </div>
