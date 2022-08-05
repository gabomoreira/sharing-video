import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000/api" });
const API = axios.create({
  baseURL: "https://sharing-video-mern.herokuapp.com/api",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const subChannel = (userId) => API.put(`/users/sub/${userId}`);
export const unSubChannel = (userId) => API.put(`/users/unsub/${userId}`);
export const fetchChannel = (userId) => API.get(`/users/find/${userId}`);

export const uploadVideo = (inputs) => API.post(`/videos`, inputs);
export const fetchVideosTags = (tags) => API.get(`/videos/tags?tags=${tags}`);
export const fetchVideosSearch = (query) => API.get(`/videos/search${query}`);
export const fetchVideos = (type) => API.get(`/videos/${type}`);
export const fetchVideo = (videoId) => API.get(`/videos/find/${videoId}`);
export const addViewVideo = (videoId) => API.put(`/videos/view/${videoId}`);
export const likeVideo = (videoId) => API.put(`/users/like/${videoId}`);
export const dislikeVideo = (videoId) => API.put(`/users/dislike/${videoId}`);

export const signIn = (formData) => API.post(`/auth/signin`, formData);
export const signUp = (formData) => API.post(`/auth/signup`, formData);

export const fetchComments = (videoId) => API.get(`/comments/${videoId}`);
