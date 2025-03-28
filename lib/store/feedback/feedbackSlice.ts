import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeedbackState {
    message: string;
    level: "error" | "warning" | "info" | "success";
}

const initialState: FeedbackState = {
    message: "Something went wrong.",
    level: "error",
};

const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        setFeedback: (state, action: PayloadAction<FeedbackState>) => {
            state.level = action.payload.level;
            state.message = action.payload.message;
        },
    },
});

export const { setFeedback } = feedbackSlice.actions;

export default feedbackSlice.reducer;
