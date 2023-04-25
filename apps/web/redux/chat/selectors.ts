import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { IChatState } from "./slice";

export const selectChatState = (state: RootState): IChatState => state.chat;

export const selectCurrentUser = createDraftSafeSelector(
    selectChatState,
    (state) => state.currentUser
);

export const selectChannel = createDraftSafeSelector(
    selectChatState,
    (state) => state.channel
);
