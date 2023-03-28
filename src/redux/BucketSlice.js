import { createSlice } from "@reduxjs/toolkit";
export const bucketSlice = createSlice({
  name: "buckets",
  initialState: { value: [] },
  reducers: {
    addBucket: (state, action) => {
      state.value.push(action.payload);
    },
    addCard: (state, action) => {
      console.log("actoin", action);
      state.value.map((bucket) => {
        console.log("loop Bucket", bucket.id);
        if (bucket.id === action.payload.id) {
          bucket.cards.push(action.payload.card);
        }
      });
      console.log("After Adding card", state.value);
    },

    deleteBucketCard: (state, action) => {
      console.log("Inside deleteteeeee", state, action);
      state.value.forEach((bucket, i) => {
        console.log("BUCKETTT", bucket);
        if (bucket.id == action.payload.bucketId) {
          state.value[i].cards = state.value[i].cards.filter(
            (card) => card.id != action.payload.cardId
          );
          console.log("state.value[i]", state.value[i]);
        }
      });
    },

    updateBucketCard: (state, action) => {
      state.value.map((bucket) => {
        if (bucket.id == action.payload.updateBucketId) {
          bucket.cards.map((card) => {
            if (card.id == action.payload.updateCardId) {
              card.videoName =
                action.payload.values.videoName !== undefined
                  ? action.payload.values.videoName
                  : card.videoName;
              card.videoLink =
                action.payload.values.videoLink !== undefined
                  ? action.payload.values.videoLink
                  : card.videoLink;
            }
          });
        }
      });
    },
  },
});

export const { addBucket, addCard, deleteBucketCard, updateBucketCard } =
  bucketSlice.actions;
export default bucketSlice.reducer;
