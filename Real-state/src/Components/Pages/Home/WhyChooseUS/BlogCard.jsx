import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
const BlogCard = ({ image, category, title, author, date, authorImage }) => {
  return (
    <Link to={'/Blog'} className="blog-card d-flex flex-column custom-link"> {/* Make the card a flex container */}
      <div className="card-image">
        <img src={image} alt={title} className="img-fluid" />
      </div>
      <div className="card-content d-flex flex-column flex-grow-1"> {/* Flex-grow to fill the space */}
        <span className="category">{category}</span>
        <h3 className="card-title">{title}</h3>
        <div className="card-footer mt-auto d-flex justify-content-between align-items-center"> {/* mt-auto pushes this to the bottom */}
          <div className="author-info d-flex align-items-center">
            <img src={authorImage} alt={author} className="author-img" />
            <span>{author}</span>
          </div>
          <span className="post-date">{date}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
