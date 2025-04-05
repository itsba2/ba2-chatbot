import { useCallback } from "react";
import { FeedbackProps } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import {
    addFeedback,
    clearAllFeedbacks,
    removeFeedback,
} from "../store/feedback/feedbackSlice";
import { FeedbackLevelEnum } from "../utils/enums";

export default function useFeedback() {
    const dispatch = useAppDispatch();
    const feedbackItems = useAppSelector(
        (state: RootState) => state.feedback.items
    );

    const showFeedback = useCallback(
        ({ message, level, timeout = 5 }: FeedbackProps) => {
            const action = addFeedback({ message, level, timeout });
            dispatch(action);

            if (timeout > 0) {
                setTimeout(() => {
                    dispatch(removeFeedback(action.payload.id));
                }, timeout * 1000);
            }
            return action.payload.id;
        },
        [dispatch]
    );

    const closeFeedback = useCallback(
        (id: string) => {
            const action = removeFeedback(id);
            dispatch(action);
        },
        [dispatch]
    );

    const clearFeedbackStack = useCallback(() => {
        const action = clearAllFeedbacks();
        dispatch(action);
    }, [dispatch]);

    return {
        feedbackItems,
        showFeedback,
        closeFeedback,
        clearFeedbackStack,
        showSuccess: (message: string, timeout?: number) =>
            showFeedback({
                message,
                level: FeedbackLevelEnum.SUCCESS,
                timeout,
            }),
        showError: (message: string, timeout?: number) =>
            showFeedback({ message, level: FeedbackLevelEnum.ERROR, timeout }),
        showWarning: (message: string, timeout?: number) =>
            showFeedback({
                message,
                level: FeedbackLevelEnum.WARNING,
                timeout,
            }),
        showInfo: (message: string, timeout?: number) =>
            showFeedback({ message, level: FeedbackLevelEnum.INFO, timeout }),
    };
}
