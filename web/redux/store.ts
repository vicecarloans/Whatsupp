import { configureStore } from "@reduxjs/toolkit";
import { channelsApi } from "./channels";
import { messagesApi } from "./messages";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import rootReducer from "./rootReducer";
import { usersApi } from "./users";

const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(channelsApi.middleware)
            .concat(usersApi.middleware)
            .concat(messagesApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
