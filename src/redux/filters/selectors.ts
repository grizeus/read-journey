import type { RootState } from "../store";

export const selectTitleFilter = (state: RootState) => state.filters.title;
export const selectAuthorFilter = (state: RootState) => state.filters.author;
export const selectStatus = (state: RootState) => state.filters.status;
