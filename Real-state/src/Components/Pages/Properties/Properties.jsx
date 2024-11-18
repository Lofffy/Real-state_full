import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Header from '../../Shared/Header';
import Footer from '../../Shared/Footer';
import CardDisplay from "./PropertiesCard/PropertiesCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Properties.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    status: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    garages: '',
    minSize: '',
    maxSize: '',
  });

  const fetchProperties = async () => {
    // Create query string with non-empty filter values
    const queryString = new URLSearchParams(
      Object.entries(filters).filter(([, value]) => value !== '')
    ).toString();

    try {
      const response = await fetch(`http://localhost:3001/api/properties${queryString ? `?${queryString}` : ''}`);
      const data = await response.json();
      if (data.success) {
        setProperties(data.data);
      } else {
        toast.error("Failed to fetch properties.");
      }
    } catch (error) {
      toast.error("Error fetching properties.");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      keyword: '',
      location: '',
      status: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      garages: '',
      minSize: '',
      maxSize: '',
    });
    toast.success("Filters cleared.");
  };

  return (
    <div>
      <ToastContainer position="top-center" />
      <Header />
      <Container className="px-4 py-6 mt-4">
        <p className="small text-muted">
          <a href="/" className="text-decoration-none">Home</a> /{" "}
          <a href="#" className="mainclr text-decoration-none">Properties</a>
        </p>
        <h1 className="h2 fw-semibold mt-2">Get all Properties</h1>
      </Container>
      
      <Container className="d-flex justify-content-center align-items-start px-4 py-5 ">
        <Col lg={4} className="me-4 my-2">
          <div className="bg-white shadow rounded-lg p-4 mb-3">
            <h3 className="h5 fw-semibold mb-4">Filter Properties</h3>
            
            <Form.Select className="mb-4" id="keyword" onChange={handleFilterChange}>
              <option value="">Keyword</option>
              <option>Luxury</option>
              <option>Renovated</option>
            </Form.Select>
            <Form.Select className="mb-4" id="location" onChange={handleFilterChange}>
              <option value="">Location</option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
            </Form.Select>
            <Form.Select className="mb-4" id="status" onChange={handleFilterChange}>
              <option value="">Status</option>
              <option>For Sale</option>
              <option>For Rent</option>
            </Form.Select>
            <Form.Select className="mb-4" id="propertyType" onChange={handleFilterChange}>
              <option value="">Property Type</option>
              <option>Apartment</option>
              <option>Bungalow</option>
              <option>House</option>
            </Form.Select>

            <Form.Group className="row g-2 mb-4">
              <Col><Form.Control type="number" placeholder="Min Price" id="minPrice" onChange={handleFilterChange} /></Col>
              <Col><Form.Control type="number" placeholder="Max Price" id="maxPrice" onChange={handleFilterChange} /></Col>
            </Form.Group>

            <Form.Select className="mb-4" id="bedrooms" onChange={handleFilterChange}>
              <option value="">Bedrooms</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </Form.Select>
            <Form.Select className="mb-4" id="bathrooms" onChange={handleFilterChange}>
              <option value="">Bathrooms</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </Form.Select>
            <Form.Select className="mb-4" id="garages" onChange={handleFilterChange}>
              <option value="">Garages</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </Form.Select>
            <Form.Group className="row g-2 mb-4">
              <Col><Form.Control type="number" placeholder="Min Area" id="minSize" onChange={handleFilterChange} /></Col>
              <Col><Form.Control type="number" placeholder="Max Area" id="maxSize" onChange={handleFilterChange} /></Col>
            </Form.Group>
            <Button className="btn btn-primary bg-danger text-white w-100 btnbg" onClick={clearFilters}>Clear Filters</Button>
          </div>
        </Col>

        <Col lg={7}>
          <div className="d-flex justify-content-between align-items-center mb-4 shadow rounded-lg p-2">
            <p className="small text-muted m-0">{properties.length} Search results</p>
          </div>
          <CardDisplay properties={properties} />
        </Col>
      </Container>
      
      <Footer />
    </div>
  );
}

export default Properties;
