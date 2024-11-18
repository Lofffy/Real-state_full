import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./profile.css";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/djsehv3ir/image/upload`;
const CLOUDINARY_UPLOAD_PRESET = "ge24dtyn";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUser(data.data);
          setFormData({
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            email: data.data.email,
            phone: data.data.phone,
          });
        } else {
          toast.error(data.message || "Failed to fetch user data");
        }
      } catch (error) {
        toast.error("Error fetching user data");
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    else if (/\d/.test(formData.firstName))
      newErrors.firstName = "First name cannot contain numbers";

    if (!formData.lastName) newErrors.lastName = "Last name is required";
    else if (/\d/.test(formData.lastName))
      newErrors.lastName = "Last name cannot contain numbers";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.data);
        setIsEditing(false);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile");
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setBlogData({ title: "", category: "", content: "", image: "" });
    setErrors({});
  };

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      console.log("Cloudinary upload response:", data); // Debugging statement

      if (data.secure_url) {
        toast.success("Image uploaded successfully!");
        return data.secure_url; // Return Cloudinary URL
      } else {
        throw new Error("Cloudinary response missing secure_url");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed");
      return "";
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await handleImageUpload(file); // Upload and get URL
      if (imageUrl) {
        setBlogData({ ...blogData, image: imageUrl }); // Set the image URL in blogData
      } else {
        console.error("Image URL is empty after upload.");
      }
    } else {
      console.error("No file selected.");
    }
  };

  const validateBlogForm = () => {
    const newErrors = {};

    if (!blogData.title) newErrors.title = "Title is required";
    if (!blogData.category) newErrors.category = "Category is required";
    if (!blogData.content) newErrors.content = "Content is required";
    else if (blogData.content.split(" ").length < 50)
      newErrors.content = "Content must be at least 50 words";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateBlog = async () => {
    if (!validateBlogForm()) {
      toast.error("Please correct the errors in the blog form");
      return;
    }

    const dataToSend = {
      title: blogData.title,
      category: blogData.category,
      content: blogData.content,
      author: user ? user._id : "",
      image: blogData.image, // Send only the image URL
    };

    console.log("Data to send:", dataToSend); // Debugging statement

    try {
      const response = await fetch("http://localhost:3001/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        toast.success("Blog created successfully!");
        handleCloseModal();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("An error occurred while creating the blog");
    }
  };
  const handleOfferProperty = () => {
    navigate("/offer-property"); // Redirect to the property offering page
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <Container className="profile-page" style={{ padding: "2rem 0" }}>
        <ToastContainer position="top-center" />
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow" style={{ borderColor: "#ff5a5f" }}>
              <Card.Header
                className="bg-danger text-white text-center"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="fas fa-user-circle"></i> My Profile
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        {isEditing ? (
                          <>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              isInvalid={!!errors.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.firstName}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <p className="profile-text">{user.firstName}</p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        {isEditing ? (
                          <>
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              isInvalid={!!errors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.lastName}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <p className="profile-text">{user.lastName}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        {isEditing ? (
                          <>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <p className="profile-text">{user.email}</p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        {isEditing ? (
                          <>
                            <Form.Control
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              isInvalid={!!errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.phone}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <p className="profile-text">{user.phone}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group controlId="role">
                        <Form.Label>Role</Form.Label>
                        <p className="profile-text">{user.role}</p>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center mt-4">
                    {isEditing ? (
                      <>
                        <Button
                          variant="success"
                          onClick={handleSave}
                          className="me-3"
                        >
                          Save
                        </Button>
                        <Button variant="secondary" onClick={handleEditToggle}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button variant="primary" onClick={handleEditToggle}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
            <Button
              variant="primary"
              onClick={handleShowModal}
              className="m-3"
            >
              Create Blog
            </Button>
            {user.role === "agent" && (
              <Button
                variant="primary"
                className="m-3"
                onClick={handleOfferProperty}
              >
                Offer Property
              </Button>
            )}
          </Col>
        </Row>
      </Container>

      {/* Blog Creation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleBlogChange}
                placeholder="Enter blog title"
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="category" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={blogData.category}
                onChange={handleBlogChange}
                placeholder="Enter blog category"
                isInvalid={!!errors.category}
              />
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="content" className="mt-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                rows={5}
                value={blogData.content}
                onChange={handleBlogChange}
                placeholder="Write your blog content here"
                isInvalid={!!errors.content}
              />
              <Form.Control.Feedback type="invalid">
                {errors.content}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="image" className="mt-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateBlog}>
            Create Blog
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default ProfilePage;
