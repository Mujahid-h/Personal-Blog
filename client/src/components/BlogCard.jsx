import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
      <p className="text-gray-500">By {blog.author}</p>
      <Link to={`/edit/${blog._id}`} className="text-blue-600 mr-2">
        Edit
      </Link>
      <Link to={`/blog/${blog._id}`} className="text-blue-600">
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
