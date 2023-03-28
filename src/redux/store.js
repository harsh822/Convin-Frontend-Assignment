import { configureStore } from "@reduxjs/toolkit";
import bucketsReducer from "./BucketSlice";
import historyReducer from "./HistorySlice";

export const store = configureStore({
  reducer: {
    buckets: bucketsReducer,
    history: historyReducer,
  },
});
