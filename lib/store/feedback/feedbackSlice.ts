import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { FeedbackItem } from "@/lib/utils/types";

interface FeedbackState {
    items: FeedbackItem[];
}

const initialState: FeedbackState = {
    items: [],
};

const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        addFeedback: {
            reducer: (state, action: PayloadAction<FeedbackItem>) => {
                state.items.push(action.payload);
            },
            prepare: (feedback: Omit<FeedbackItem, "id" | "createdAt">) => ({
                payload: {
                    ...feedback,
                    id: nanoid(),
                    createdAt: Date.now(),
                },
            }),
        },
        removeFeedback: (state, action: PayloadAction<string>) => {
            console.log(action.type)
            console.log(action.payload)
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
        clearAllFeedbacks: (state) => {
            state.items = [];
        },
    },
});

export const { addFeedback, removeFeedback, clearAllFeedbacks } =
    feedbackSlice.actions;

export default feedbackSlice.reducer;
