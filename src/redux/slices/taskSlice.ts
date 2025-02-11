import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/tasks";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  description: string;
}

interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

export const fetchTasks = createAsyncThunk<Task[], void>(
  "tasks/fetchTasks",
  async () => {
    const response = await axios.get<Task[]>(API_URL);
    return response.data;
  }
);

export const addTask = createAsyncThunk<Task, Omit<Task, "id">>(
  "tasks/addTask",
  async (task) => {
    const response = await axios.post<Task>(API_URL, task);
    return response.data;
  }
);

export const updateTask = createAsyncThunk<Task, { id: number; completed: boolean }>(
  "tasks/updateTask",
  async ({ id, completed }) => {
    const response = await axios.patch<Task>(`${API_URL}/${id}`, { completed });
    return response.data;
  }
);

export const deleteTask = createAsyncThunk<number, number>(
  "tasks/deleteTask",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const initialState: TaskState = {
  tasks: [],
  status: "idle",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
