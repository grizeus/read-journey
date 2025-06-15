import type { RootState } from "../store";

export const selectBooks = (state: RootState) => state.books.books;
export const selectCurrentPage = (state: RootState) => state.books.currentPage;
export const selectTotalPages = (state: RootState) => state.books.totalPages;
export const selectOwnBooks = (state: RootState) => state.books.ownBooks;
export const selectReadingBook = (state: RootState) => state.books.readingBook;
export const selectAllBooks = (state: RootState) => state.books.allBooks;
