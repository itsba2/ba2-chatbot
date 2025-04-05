import useFeedback from "@/lib/hooks/useFeedback";
import FeedbackSnackbar from "./FeedbackSnackbar";

export default function FeedbackContainer() {
    const { feedbackItems, closeFeedback } = useFeedback();

    console.log("feedback items length =", feedbackItems.length)

    if (feedbackItems.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 z-[1000] p-4 flex flex-col gap-2 w-full lg:max-w-md">
            {feedbackItems.map((feedback) => (
                <FeedbackSnackbar
                    key={`feedback-${feedback.id}`}
                    feedback={feedback}
                    onClose={() => closeFeedback(feedback.id)}
                />
            ))}
        </div>
    );
}
