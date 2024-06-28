import Comment from "../models/commentModel.js";
import Blog from "../models/blogModel.js";

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { content, author, postId } = req.body;
    const newComment = new Comment({ content, author, postId });
    const comment = await newComment.save();

    // Add the comment to the blog post
    const blogPost = await Blog.findById(postId);
    blogPost.comments.push(comment._id);
    await blogPost.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments for a blog post
export const getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
