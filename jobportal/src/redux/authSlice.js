import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, signupApi } from "../api/authApi";
import { getProfileApi, updateProfileApi } from "../api/profileApi"; // FIXED

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginApi(data);
      return res.data; // { token, userId, name, email, userType }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

// FETCH PROFILE
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProfileApi();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// UPDATE PROFILE
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateProfileApi(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// SIGNUP
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await signupApi(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Signup failed" });
    }
  }
);

// AUTH SLICE
const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    userType: localStorage.getItem("userType") || null, // ⭐ NEW FOR ADMIN ACCESS
    loggedIn: !!localStorage.getItem("token"),
    loading: false,
    error: "",
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userType = null;
      state.loggedIn = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        const userData = {
          id: action.payload.userId,
          name: action.payload.name,
          email: action.payload.email,
          userType: action.payload.userType, // ⭐ STORE ADMIN / USER
        };

        state.user = userData;
        state.token = action.payload.token;
        state.userType = action.payload.userType;
        state.loggedIn = true;

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("userType", action.payload.userType);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload.message || "Login failed";
      })

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Signup failed";
      })

      // FETCH PROFILE
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userType = action.payload.userType;

        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("userType", action.payload.userType);
      })

      // UPDATE PROFILE
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;

        // If admin changed userType manually
        if (action.payload.userType) {
          state.userType = action.payload.userType;
          localStorage.setItem("userType", action.payload.userType);
        }

        localStorage.setItem("user", JSON.stringify(action.payload));
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
