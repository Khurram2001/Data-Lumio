import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import analysisReducer from "../dashboard/analysis/analysisSlice";
import persistReducer from "redux-persist/es/persistReducer";
import userSlice from "../dashboard/userSlice";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const userPersisted = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    user: userPersisted,
    analysis: analysisReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
