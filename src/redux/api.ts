export const api = {
  async fetchPosts() {
    const response = await fetch("https://dummyjson.com/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.posts;
  },
};
