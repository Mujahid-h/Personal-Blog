import Blog from "../models/blogModel.js";

// Create a new blog post
export const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new Blog({ title, content, author });
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blog posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Blog.find().populate("comments");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id).populate("comments");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog post by ID
export const updatePost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const post = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog post by ID
export const deletePost = async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
