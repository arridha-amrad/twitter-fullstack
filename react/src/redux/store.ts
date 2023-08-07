import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { myApi } from "./api";
import tokenReducer from "./auth";
import tweetReducer from "./tweet";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: tokenReducer,
    tweets: tweetReducer,
    [myApi.reducerPath]: myApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(myApi.middleware);
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

setupListeners(store.dispatch);

export default store;
