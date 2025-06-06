import {
  createSlice,
  type PayloadAction,
  type SerializedError,
} from "@reduxjs/toolkit";
import {
  addBook,
  deleteOwnBook,
  deleteReading,
  getAllBooks,
  getBookById,
  getOwnBooks,
  getRecommendedBooks,
  startReading,
  stopReading,
} from "./operations";
import type { Book } from "../../components/BookList";

interface BookState {
  books: Book[];
  ownBooks: Book[];
  readingBook: Book | null;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  allBooks: Book[];
}

const handlePending = (state: BookState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (
  state: BookState,
  action: PayloadAction<
    unknown,
    string,
    { arg: unknown; requestId: string },
    SerializedError
  >
) => {
  state.loading = false;
  if (typeof action.payload === "string") {
    state.error = action.payload;
  } else if (action.error && action.error.message) {
    state.error = action.error.message;
  } else {
    state.error = "An unknown error occurred";
  }
};

const initialState: BookState = {
  books: [],
  ownBooks: [],
  readingBook: null,
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  allBooks: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    goToNextPage(state) {
      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
      }
    },
    goToPrevPage(state) {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getRecommendedBooks.pending, handlePending);
    builder.addCase(getRecommendedBooks.fulfilled, (state, action) => {
      state.books = action.payload.results;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.page;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getRecommendedBooks.rejected, handleRejected);
    builder.addCase(getAllBooks.pending, handlePending);
    builder.addCase(getAllBooks.fulfilled, (state, action) => {
      state.allBooks = action.payload.results;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getAllBooks.rejected, handleRejected);
    builder.addCase(addBook.pending, handlePending);
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.ownBooks.push(action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addBook.rejected, handleRejected);
    builder.addCase(getOwnBooks.pending, handlePending);
    builder.addCase(getOwnBooks.fulfilled, (state, action) => {
      state.ownBooks = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getOwnBooks.rejected, handleRejected);
    builder.addCase(deleteOwnBook.pending, handlePending);
    builder.addCase(deleteOwnBook.fulfilled, (state, action) => {
      state.ownBooks = state.ownBooks.filter(
        book => action.payload.id !== book._id
      );
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteOwnBook.rejected, handleRejected);
    builder.addCase(getBookById.pending, handlePending);
    builder.addCase(getBookById.fulfilled, (state, action) => {
      state.readingBook = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getBookById.rejected, handleRejected);
    builder.addCase(startReading.pending, handlePending);
    builder.addCase(startReading.fulfilled, (state, action) => {
      state.readingBook = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(startReading.rejected, handleRejected);
    builder.addCase(stopReading.pending, handlePending);
    builder.addCase(stopReading.fulfilled, (state, action) => {
      state.readingBook = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(stopReading.rejected, handleRejected);
    builder.addCase(deleteReading.pending, handlePending);
    builder.addCase(deleteReading.fulfilled, (state, action) => {
      state.readingBook = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteReading.rejected, handleRejected);
  },
});

export const { goToNextPage, goToPrevPage } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
