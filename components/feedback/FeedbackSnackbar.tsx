import { FeedbackItem } from "@/lib/utils/types";
import { getBackgroundColor, getIcon } from "./helpers";
import { X } from "lucide-react";

interface FeedbackSnackbarProps {
    feedback: FeedbackItem;
    onClose: () => void;
}

export default function FeedbackSnackbar({
    feedback,
    onClose,
}: FeedbackSnackbarProps) {
    const { message, level } = feedback;

    return (
        <div
            className={`flex items-center justify-between rounded shadow-lg px-4 py-3 text-white ${getBackgroundColor(level)}`}
        >
            <div className="flex items-center">
                <span className="mr-2">{getIcon(level)}</span>
                <span>{message}</span>
            </div>
            <button
                onClick={onClose}
                className="ml-4 text-white hover:text-gray-200 focus:outline-none"
                aria-label="Close feedback"
            >
                <X size={20} />
            </button>
        </div>
    );
}
