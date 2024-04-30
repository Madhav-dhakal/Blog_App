import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/blog.card";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  // Function to format time
  const formatTime = (timeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(timeString).toLocaleString("en-US", options);
  };

  // get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog?.user?.username}
            time={formatTime(blog.createdAt)} // Format the time
          />
        ))}
    </>
  );
};

export default Blog;
