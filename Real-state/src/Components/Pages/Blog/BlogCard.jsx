// BlogCard.js
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import BlogImage from '../../../assets/Blog1.png';
import './blog.css';

const BlogCard = ({ blog, onReadMore }) => {
  const [authorName, setAuthorName] = useState("Unknown Author");

  useEffect(() => {
    const getAuthorName = async () => {
      if (blog.author) {
        try {
            console.log(blog.author);
            
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

  return (
    <Card className="cardContainer shadow-lg">
      <div className="image-wrapper">
        <img src={blog.image || BlogImage} alt="Blog Image" />
      </div>
      <div className={`badgee badge ${blog.category}`}>{blog.category}</div>
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <p className="cardDate">
          <FontAwesomeIcon icon={faCalendarAlt} /> {new Date(blog.date).toLocaleDateString()}
        </p>
        <p className="cardAuthor">
          <FontAwesomeIcon icon={faUser} /> {authorName}
        </p>
        <p className="card-text">{blog.content.slice(0, 100)}...</p>
        <button className="readMore" onClick={() => onReadMore(blog._id)}>Read More →</button>
      </div>
    </Card>
  );
};

export default BlogCard;
