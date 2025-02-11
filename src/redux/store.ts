import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/taskSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

// 🔹 Export RootState type for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
