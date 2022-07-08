import { combineReducers } from "redux";
import { channelsApi } from "./channels";
import { messagesApi } from "./messages/api";
import { usersApi } from "./users";
import chatReducer from "./chat/slice";

const rootReducer = combineReducers({
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
