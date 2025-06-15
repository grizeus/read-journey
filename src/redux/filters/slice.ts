import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OptionValue } from "../../types";

interface FilterState {
  title: string;
  author: string;
  status: OptionValue;
}

const initialState: FilterState = {
  title: "",
  author: "",
  status: "All books",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.title = action.payload.title;
      state.author = action.payload.author;
    },
    clearFilters: state => {
      state.title = "";
      state.author = "";
    },
    setStatusFilter: (state, action: PayloadAction<OptionValue>) => {
      state.status = action.payload;
    },
  },
});

export const { setFilters, setStatusFilter } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
