export const sagaActions = {
  FETCH_POSTS: "FETCH_POSTS",
};

export const fetchPosts = () => ({
  type: sagaActions.FETCH_POSTS,
});
