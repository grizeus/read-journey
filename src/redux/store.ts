import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";
import { filtersReducer } from "./filters/slice";
import { booksReducer } from "./books/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "refreshToken"],
};

const filtersPersistConfig = {
  key: "filters",
  storage,
  whitelist: ["title", "author"],
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);
const filtersPersistedReducer = persistReducer(filtersPersistConfig, filtersReducer);

const reducers = combineReducers({
    auth: authPersistedReducer,
    books: booksReducer,
  filters: filtersPersistedReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;