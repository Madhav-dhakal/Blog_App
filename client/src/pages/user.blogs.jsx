import axios from "axios";
import React, { useState, useEffect } from "react";
import BlogCard from "../components/blog.card";

const UserBlogs = () => {
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

  // Get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/user-blog/${id}`
      );
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={formatTime(blog.createdAt)} // Format the time
          />
        ))
      ) : (
        <>
          <h1 className="text-center">You haven't created any blogs.</h1>
          <br />
          <h1 className="text-center">Create a new blog to show !!</h1>
        </>
      )}
    </>
  );
};

export default UserBlogs;
