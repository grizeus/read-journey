import {
  createSlice,
  type PayloadAction,
  type SerializedError,
} from "@reduxjs/toolkit";
import {
  register,
  logIn,
  logOut,
  clearError,
  getCurrentUser,
  refreshToken,
} from "./operations";

interface AuthState {
  name: string | null;
  email: string | null;
  token: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  loading: boolean;
  error: string | null;
}

const handlePending = (state: AuthState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (
  state: AuthState,
  action: PayloadAction<
    unknown,
    string,
    {
      arg: unknown;
      requestId: string;
      requestStatus: "rejected";
      aborted: boolean;
      condition: boolean;
    } & ({ rejectedWithValue: true } | ({ rejectedWithValue: false } & {})),
    SerializedError
  >
) => {
  state.loading = false;
  state.error =
    action.error?.message ||
    (typeof action.payload === "string"
      ? action.payload
      : "An unknown error occurred");
};

const initialState: AuthState = {
  name: null,
  email: null,
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, handleRejected)
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, handleRejected)
      .addCase(clearError, state => {
        state.error = null;
      })
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.name = null;
        state.email = null;
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : ((action.payload as { message?: string })?.message ?? null);
      })
      .addCase(getCurrentUser.pending, state => {
        const tokenExists = state.token !== null;
        if (tokenExists) {
          state.isRefreshing = true;
          state.loading = true;
          state.error = null;
        }
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : ((action.payload as { message?: string })?.message ?? null);
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.loading = false;
      })
      .addCase(refreshToken.pending, state => {
        state.isRefreshing = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isRefreshing = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isRefreshing = false;
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : ((action.payload as { message?: string })?.message ?? null);
      });
  },
});

export const authReducer = authSlice.reducer;
