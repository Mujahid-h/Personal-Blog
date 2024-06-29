import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/blogApi";
import { getCommentsByPostId, createComment } from "../api/commentApi";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ content: "", author: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const blogData = await getPostById(id);
        setBlog(blogData);
        const commentsData = await getCommentsByPostId(id);
        setComments(commentsData);
      } catch (error) {
        console.error("Failed to fetch post or comments", error);
        setError("Failed to load blog post and comments");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const comment = await createComment({
        ...newComment,
        postId: id,
      });
      setComments([...comments, comment]);
      setNewComment({ content: "", author: "" });
    } catch (error) {
      console.error("Failed to create comment", error);
      setError("Failed to submit comment");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">Blog post not found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <article className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {blog.title}
          </h1>
          <p className="text-gray-600 text-lg mb-6">{blog.content}</p>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-gray-600 text-sm">Author: {blog.author}</p>
            <p className="text-gray-600 text-sm">
              Published: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </article>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Comments</h2>
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white shadow rounded-lg p-4 mb-4"
          >
            <p className="text-gray-800 mb-2">{comment.content}</p>
            <p className="text-sm text-gray-600">By: {comment.author}</p>
          </div>
        ))}
      </section>

      <form
        onSubmit={handleCommentSubmit}
        className="mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h3 className="text-xl font-bold mb-4 text-gray-800">Add a Comment</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your name"
            value={newComment.author}
            onChange={(e) =>
              setNewComment({ ...newComment, author: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <textarea
            placeholder="Your comment"
            value={newComment.content}
            onChange={(e) =>
              setNewComment({ ...newComment, content: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogDetailPage;
