import type { RootState } from "../store";

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectUserName = (state: RootState) => state.auth.name;
export const selectIsLoading = (state: RootState) => state.auth.loading;
