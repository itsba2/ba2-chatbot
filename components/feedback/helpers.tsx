import { FeedbackLevel } from "@/lib/utils/types";
import { CircleX, CircleCheckBig, CircleAlert, Info } from "lucide-react";

function getBackgroundColor(level: FeedbackLevel) {
    switch (level) {
        case "error":
            return "bg-red-500";
        case "info":
            return "bg-blue-500";
        case "success":
            return "bg-green-500";
        case "warning":
            return "bg-yellow-500";
        default:
            return "bg-gray-500";
    }
}

function getIcon(level: FeedbackLevel) {
    switch (level) {
        case "error":
            return <CircleX />;
        case "info":
            return <Info />;
        case "success":
            return <CircleCheckBig />;
        case "warning":
            return <CircleAlert />;
        default:
            return null;
    }
}

export { getBackgroundColor, getIcon };
