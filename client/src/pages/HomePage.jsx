import React, { useState, useEffect } from "react";
import { getPosts } from "../services/api";
import BlogCard from "../components/BlogCard";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      {posts.map((post) => (
        <BlogCard key={post._id} blog={post} />
      ))}
    </div>
  );
};

export default HomePage;
