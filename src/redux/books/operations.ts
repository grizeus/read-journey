import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api/instance";
import axios from "axios";

interface GetRecommendedBooksParams {
  limit?: number;
  page?: number;
  author?: string;
  title?: string;
}

export const getRecommendedBooks = createAsyncThunk(
  "books/recommended",
  async (
    { limit, page = 1, author, title }: GetRecommendedBooksParams,
    thunkAPI
  ) => {
    const queryParams: Record<string, string> = {};
    if (limit) queryParams.limit = limit.toString();
    if (page) queryParams.page = page.toString();
    if (author) queryParams.author = author;
    if (title) queryParams.title = title;

    const queryString = new URLSearchParams(queryParams).toString();

    try {
      const { data } = await instance.get(`/books/recommend?${queryString}`);
      if (page > data.totalPages) page = 1;
      return { ...data, page };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message);
      } else if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please, try again."
      );
    }
  }
);

export const getAllBooks = createAsyncThunk(
  "books/allBooks",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get(`/books/recommend`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message);
      } else if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please, try again."
      );
    }
  }
);

export const addBookById = createAsyncThunk(
  "books/addBookById",
  async (id, thunkAPI) => {
    try {
      const { data } = await instance.post(`/books/add/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message);
      } else if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please, try again."
      );
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await instance.post(`/books/add`, credentials);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message);
      } else if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please, try again."
      );
    }
  }
);

export const getOwnBooks = createAsyncThunk(
  "books/getOwnBooks",
  async (credentials: string, thunkAPI) => {
    try {
      const url =
        credentials && credentials !== "all"
          ? `/books/own?status=${credentials}`
          : "/books/own";
      const { data } = await instance.get(url);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message);
      } else if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please, try again."
      );
    }
  }
);

export const deleteOwnBook = createAsyncThunk(
  "books/deleteOwnBook",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await instance.delete(`/books/remove/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message);
      } else if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please, try again."
      );
    }
  }
);

export const getBookById = createAsyncThunk(
  "books/getBookById",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await instance.get(`/books/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message);
      } else if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please, try again."
      );
    }
  }
);

export const startReading = createAsyncThunk(
  "books/startReading",
  // TODO: check type
  async (credentials: { bookId: string; startDate: string }, thunkAPI) => {
    try {
      const { data } = await instance.post("/books/reading/start", credentials);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error?.response?.status;
        const message =
          error?.response?.data?.message ||
          "Something went wrong. Please, try again.";

        if (status === 409) {
          if (message.includes("already read")) {
            return thunkAPI.rejectWithValue(
              "This book is already read. To reread it, please delete it from your library and add it again."
            );
          }
        }
        return thunkAPI.rejectWithValue(error.response?.data.message);
      } else if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please, try again."
      );
    }
  }
);

export const stopReading = createAsyncThunk(
  "books/stopReading",
  async (credentials: { bookId: string; endDate: string }, thunkAPI) => {
    try {
      const { data } = await instance.post(
        "/books/reading/finish",
        credentials
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message);
      } else if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please, try again."
      );
    }
  }
);

export const deleteReading = createAsyncThunk(
  "books/deleteReading",
  async (credentials: { bookId: string }, thunkAPI) => {
    const queryString = new URLSearchParams(credentials).toString();
    try {
      const { data } = await instance.delete(`/books/reading?${queryString}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message);
      } else if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please, try again."
      );
    }
  }
);
