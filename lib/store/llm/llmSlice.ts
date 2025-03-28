import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface llmState {
    model: string;
    temperature: number;
}

const initialState: llmState = {
    model: "deepseek-r1:1.5b",
    temperature: 0.3,
};

export const llmSlice = createSlice({
    name: "llm",
    initialState,
    reducers: {
        setModel: (state, action: PayloadAction<string>) => {
            state.model = action.payload;
            console.log("new model set = ", state.model);
        },
        setTemperature: (state, action: PayloadAction<number>) => {
            state.temperature = action.payload;
        },
    },
});

export const { setModel, setTemperature } = llmSlice.actions;

export default llmSlice.reducer;
