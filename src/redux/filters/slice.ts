import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  status: 'all',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.title = action.payload.title;
      state.author = action.payload.author;
    },
    clearFilters: state => {
      state.title = '';
      state.author = '';
    },
    setStatusFilter: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setFilters, clearFilters, setStatusFilter } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
