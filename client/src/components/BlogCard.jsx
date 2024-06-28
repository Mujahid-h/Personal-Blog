import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

const BlogCard = ({ blog }) => {
  const deleteHandler = async () => {
    try {
      await axios.delete(`/blog/${blog._id}`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
      <p className="text-gray-500">By {blog.author}</p>
      <div className="flex text-red-500 hover:text-blue-600 gap-3">
        <Link to={`/edit/${blog._id}`} className="text-blue-600 mr-2">
          <AiOutlineEdit />
        </Link>
        <AiOutlineDelete className="cursor-pointer" onClick={deleteHandler} />
      </div>
      <Link to={`/blog/${blog._id}`} className="text-blue-600">
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
