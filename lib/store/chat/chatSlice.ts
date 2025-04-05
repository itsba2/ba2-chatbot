import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: string;
}

interface Chat {
    id: string;
    title: string;
    modelId: string;
    clientId: string;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
}

interface ChatState {
    chats: Chat[];
    currentChatId: string | null;
    clientId: string;
    isLoading: boolean;
    error: string | null;
}

const generateClientId = () => {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
};

const getClientId = () => {
    if (typeof window !== "undefined") {
        let clientId = localStorage.getItem("clientId");
        if (!clientId) {
            clientId = generateClientId();
            localStorage.setItem("clientId", clientId);
        }
        return clientId;
    }
    return generateClientId();
};

const initialState: ChatState = {
    chats: [],
    currentChatId: null,
    clientId: getClientId(),
    isLoading: false,
    error: null,
};

export const fetchChats = createAsyncThunk(
    "chat/fetchChats",
    async (_, { getState }) => {
        const { chat } = getState() as { chat: ChatState };
        const response = await fetch(`/api/chats?clientId=${chat.clientId}`);
        if (!response.ok) throw new Error("Failed to fetch chats");
        const data = await response.json();
        return data.chats;
    }
);

export const createChat = createAsyncThunk(
    "chat/createChat",
    async (
        { title, modelId }: { title: string; modelId: string },
        { getState }
    ) => {
        const { chat } = getState() as { chat: ChatState };
        const response = await fetch("/api/chats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, modelId, clientId: chat.clientId }),
        });

        if (!response.ok) throw new Error("Failed to create chat");
        const data = await response.json();
        return data.chat;
    }
);

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async ({
        content,
        chatId,
        role,
    }: {
        content: string;
        chatId: string;
        role: "user" | "assistant";
    }) => {
        const response = await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content, chatId, role }),
        });

        if (!response.ok) throw new Error("Failed to send message");
        const data = await response.json();
        return data.message;
    }
);

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setCurrentChat: (state, action: PayloadAction<string>) => {
            state.currentChatId = action.payload;
        },
        clearCurrentChat: (state) => {
            state.currentChatId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chats = action.payload;
            })
            .addCase(fetchChats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch chats";
            })
            .addCase(createChat.fulfilled, (state, action) => {
                state.chats.unshift(action.payload);
                state.currentChatId = action.payload.id;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                const chatIndex = state.chats.findIndex(
                    (chat) => chat.id === action.payload.chatId
                );
                if (chatIndex !== -1) {
                    state.chats[chatIndex].messages.push(action.payload);
                }
            });
    },
});

export const { setCurrentChat, clearCurrentChat } = chatSlice.actions;
export default chatSlice.reducer;
