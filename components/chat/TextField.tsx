import { ChatRequestOptions } from "ai";
import Button from "../common/Button";

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
        <div className="sticky bottom-0 w-full mx-auto bg-gray-200 dark:bg-slate-900 px-2 pb-4 pt-8">
            <form role="form" onSubmit={handleSubmit} className="flex gap-2 h-[10rem]">
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
                    className="w-5/6 resize-none max-h-[10rem] p-2 bg-gray-300 text-gray-900 rounded focus:outline-none focus:ring-0"
                />
                <div className="w-1/6 flex flex-col gap-2">
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={
                            status === "submitted" || status === "streaming"
                        }
                    >
                        Send
                    </Button>
                    <Button
                        onClick={stop}
                        variant="primary"
                        disabled={
                            status !== "submitted" && status !== "streaming"
                        }
                    >
                        Stop
                    </Button>
                    <Button
                        onClick={() => reload()}
                        variant="secondary"
                        disabled={status !== "error"}
                    >
                        Retry
                    </Button>
                </div>
{/* 
                {status === "submitted" || status === "streaming" ? (
                    <button
                        onClick={stop}
                        className="w-1/6 p-2 h-fit self-end cursor-pointer rounded bg-orange-500 hover:bg-orange-700 duration-200 text-white"
                    >
                        Stop
                    </button>
                ) : status === "error" ? (
                    <button
                        onClick={() => reload()}
                        className="w-1/6 p-2 h-fit self-end cursor-pointer rounded bg-red-500 hover:bg-red-700 duration-200 text-white"
                    >
                        Retry
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="w-1/6 p-2 h-fit self-end cursor-pointer rounded bg-teal-500 hover:bg-teal-700 duration-200 text-white"
                    >
                        Send
                    </button>
                )} */}
            </form>
        </div>
    );
}
