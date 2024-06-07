// selectors.js
import { createSelector } from 'reselect';

// Select the entire singlePost state
const selectSinglePostState = (state) => state.singlePost;

// Create a selector factory function that takes postId as an argument
export const makeSelectSinglePost = (postId) =>
  createSelector(
    // Select the entire singlePost state
    selectSinglePostState,
    // Select specific data based on the postId
    (singlePost) => ({
      post: singlePost.post,
      subClashes: singlePost.subClashes.filter((clash) => clash.postId === postId),
      loading: singlePost.loading,
      error: singlePost.error,
    })
  );
