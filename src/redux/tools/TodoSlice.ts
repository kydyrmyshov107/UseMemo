import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;

interface TodoList {
  _id: number;
  name: string;
  img: string;
}

interface Todo {
  data: TodoList[];
  loading: boolean;
  error: string | null;
}

const initialState: Todo = {
  data: [],
  loading: false,
  error: null,
};

interface Data {
  name: string;
  img: string;
}

export const postRequest = createAsyncThunk(
  "post/Request",
  async (newData: Data) => {
    try {
      const response = await axios.post(url, newData);
      return response.data;
    } catch (error) {
      console.error(error, "is not working");
      console.log("is not work");
    }
  }
);

export const deleteRequest = createAsyncThunk(
  "delete/Request",
  async (id: number) => {
    const response = (await axios.delete(`${url}/${id}`)).data;
    return response;
  }
);

export const getRequest = createAsyncThunk("get/Request", async () => {
  try {
    const response = (await axios.get(url)).data;
    return response;
  } catch (error) {
    console.error(error);
  }
});

export const patchRequest = createAsyncThunk(
  "put/Request",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ id, name, img }: any) => {
    const updateData = {
      name,
      img,
    };

    try {
      const response = (await axios.patch(`${url}/${id}`, updateData)).data;
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

const TodoListSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRequest.pending, (state) => {
        state.loading = false;
      })
      .addCase(postRequest.fulfilled, (state, action) => {
        state.loading = false;

        state.data = action.payload;
        console.log(state.data, action.payload);
      })
      .addCase(postRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(patchRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchRequest.fulfilled, (state, action) => {
        state.data = action.payload;

        state.loading = false;
      })
      .addCase(patchRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const TodoListRender = TodoListSlice.reducer;
