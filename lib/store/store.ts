import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "@/lib/store/feedback/feedbackSlice";
import llmReducer from "@/lib/store/llm/llmSlice";
import layoutReducer from "@/lib/store/layout/layoutSlice";

export const makeStore = () =>
    configureStore({
        reducer: {
            feedback: feedbackReducer,
            layout: layoutReducer,
            llm: llmReducer,
        },
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
