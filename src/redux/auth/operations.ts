import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import instance, { setToken, clearToken } from "../../api/instance";
import toast from "react-hot-toast";
import axios from "axios";
import type { RootState } from "../store";

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, thunkAPI) => {
    try {
      const res = await instance.post("/users/signup", credentials);
      setToken(res.data.token);
      toast.success("User was successfully registered!");
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 409) {
          const message = error.response.data.message;
          toast.error(message);
          return thunkAPI.rejectWithValue(message);
        }
        toast.error(error.response?.data.message);
        return thunkAPI.rejectWithValue(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.error("Registration error. Please try again later.");
        return thunkAPI.rejectWithValue(error.message);
      }
      toast.error("Registration error. Please try again later.");
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please, try again."
      );
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const res = await instance.post("/users/signin", credentials);
      setToken(res.data.token);
      toast.success("User was successfully logged in!");
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          toast.error("Incorrect email or password");
          return thunkAPI.rejectWithValue("Incorrect email or password");
        }
        toast.error(error.response?.data.message);
        return thunkAPI.rejectWithValue(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.error("Log in error. Please try again later.");
        return thunkAPI.rejectWithValue(error.message);
      }
      toast.error("Log in error. Please try again later.");
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please, try again."
      );
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await instance.post("/users/signout");
    toast.success("User was logged out.");
    clearToken();
  } catch (error) {
    localStorage.clear();
    toast.success("User was logged out.");
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data.message);
    } else if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Something went wrong. Please, try again.");
  }
});

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const persistedToken = state.auth.refreshToken;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("No refresh token");
    }
    setToken(persistedToken);
    try {
      const res = await instance.get("/users/current/refresh");
      const newToken = res.data.token;
      setToken(newToken);
      return res.data;
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

export const getCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Token is not available");
    }
    setToken(persistedToken);
    try {
      const res = await instance.get("/users/current");
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          const refreshResult = await thunkAPI.dispatch(refreshToken());
          if (refreshResult.meta.requestStatus === "fulfilled") {
            const newToken = refreshResult.payload.token;
            setToken(newToken);
            const retryRes = await instance.get("/users/current");
            return retryRes.data;
          }
        }
      } else if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please, try again."
      );
    }
  }
);

export const clearError = createAction("auth/clearError");
