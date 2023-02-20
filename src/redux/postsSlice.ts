import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Post, PostStateInterface } from "../interfaces";

const initialState: PostStateInterface = {
  posts: [],
  error: null,
};

export const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostsError: (state: PostStateInterface, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    getPostsSuccess: (
      state: PostStateInterface,
      action: PayloadAction<Post[]>
    ) => {
      state.posts = action.payload;
    },
  },
});
export const { getPostsSuccess, getPostsError } = PostSlice.actions;
export default PostSlice.reducer;
