// Blog.js (Main Component)
import React, { useState, useEffect } from 'react';
import Header from '../../Shared/Header';
import Footer from '../../Shared/Footer';
import BlogCard from './BlogCard';
import BlogDetails from './BlogDetalis';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './blog.css';

const BLOGS_PER_PAGE = 6; // Adjust the number of blogs per page as needed

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/blogs');
        const data = await response.json();
        if (data.success) {
          setBlogs(data.data);
        } else {
          console.error("Failed to fetch blogs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleReadMore = (blogId) => {
    const blog = blogs.find((b) => b._id === blogId);
    setSelectedBlog(blog);
  };

  const handleBackToBlog = () => {
    setSelectedBlog(null);
  };

  // Pagination Logic
  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = blogs.slice((currentPage - 1) * BLOGS_PER_PAGE, currentPage * BLOGS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scrolls to the top of the page
  };

  return (
    <>
      <Header />
      <section id="mainBlog">
        <Container className="my-5">
          <div className="home">
            <p>Home / <span>Our Blog</span></p>
            <h1>Blog</h1>
          </div>

          {!selectedBlog ? (
            <div id="blogList">
              <Row>
                {paginatedBlogs.map(blog => (
                  <Col md={4} className="mb-4" key={blog._id}>
                    <BlogCard
                      blog={blog}
                      onReadMore={() => handleReadMore(blog._id)}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          ) : (
            <BlogDetails
              blog={selectedBlog}
              onBack={handleBackToBlog}
            />
          )}

          {blogs.length > BLOGS_PER_PAGE && (
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Blog;
