import type { RootState } from "../store";

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUserName = (state: RootState) => state.auth.name;
export const selectUserEmail = (state: RootState) => state.auth.email;
export const selectIsLoading = (state: RootState) => state.auth.loading;
