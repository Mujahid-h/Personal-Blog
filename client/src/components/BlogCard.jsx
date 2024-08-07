import React from "react";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../api/blogApi";

const BlogCard = ({ blog, onDelete }) => {
  const navigate = useNavigate();

  if (!blog) {
    return null; // Avoid rendering if blog is not defined
  }

  const {
    _id,
    title = "Untitled",
    content = "No content available",
    author = "Unknown",
  } = blog;

  const handleDelete = async () => {
    try {
      await deletePost(_id);
      onDelete(_id);
    } catch (error) {
      console.error("Failed to delete the blog", error);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {content.substring(0, 100)}...
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span
          className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
          onClick={() => navigate(`/blogs/${_id}`)}
        >
          Read More
        </span>
        <span
          className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
          onClick={() => navigate(`/update/${_id}`)}
        >
          Edit
        </span>
        <span
          className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
