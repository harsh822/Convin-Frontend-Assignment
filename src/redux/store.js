import { configureStore } from "@reduxjs/toolkit";
import bucketsReducer from "./BucketSlice";

export const store = configureStore({
  reducer: {
    buckets: bucketsReducer,
  },
});
