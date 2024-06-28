// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// Get all blog posts
export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blog`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Get a single blog post by ID
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

// Create a new blog post
export const createPost = async (post) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/blog`, post);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Update a blog post by ID
export const updatePost = async (id, post) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/blog/${id}`, post);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// Delete a blog post by ID
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
