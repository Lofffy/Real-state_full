// BlogDetails.js
import React, { useEffect, useState } from 'react';
import BlogImage from '../../../assets/Blog1.png';

const BlogDetails = ({ blog, onBack }) => {
  const [authorName, setAuthorName] = useState("Unknown Author");

  useEffect(() => {
    const getAuthorName = async () => {
      if (blog.author) {
        try {
          const response = await fetch(`http://localhost:3001/api/users/profile/${blog.author}`);
          const data = await response.json();
          if (data.success) {
            setAuthorName(`${data.data.firstName} ${data.data.lastName}`);
          } else {
            console.error("Error fetching user:", data.message);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    getAuthorName();
  }, [blog.author]);

  if (!blog) return <h1>No blog details available</h1>;

  return (
    <div className="blogDetails">
      <h3>{blog.title}</h3>
      <p className="cardDate">
        <i className="fas fa-calendar-alt"></i> {new Date(blog.date).toLocaleDateString()}
      </p>
      <p className="cardAuthor"><i className="fas fa-user"></i> {authorName}</p>
      <img id="blogImage" src={blog.image || BlogImage} alt={blog.title} />
      <p className="paragraphh">{blog.content}</p>
      <button className="btn btn-primary" onClick={onBack}>Back to Blog</button>
    </div>
  );
};

export default BlogDetails;
