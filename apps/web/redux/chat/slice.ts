import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Channel } from "../channels";
import { Message } from "../messages/api";
import { User } from "../users";

export interface IChatState {
    messages?: Array<Message>;
    channel?: Channel;
    currentUser?: User;
    draftMessage?: string;
}

const chatSlice = createSlice({
    name: "Chat",
    initialState: {},
    reducers: {
        initiateChat: (
            state: IChatState,
            action: PayloadAction<{ channel: Channel }>
        ) => {
            state.channel = action.payload.channel;
            state.messages = [];
        },
        setChatMessages: (
            state: IChatState,
            action: PayloadAction<{ messages: Array<Message> }>
        ) => {
            state.messages = action.payload.messages;
        },
        setCurrentUser: (
            state: IChatState,
            action: PayloadAction<{ currentUser: User }>
        ) => {
            state.currentUser = action.payload.currentUser;
        },
    },
});

export const { initiateChat, setChatMessages, setCurrentUser } =
    chatSlice.actions;
export default chatSlice.reducer;
