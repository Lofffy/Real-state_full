import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../Shared/Footer';
import Header from '../../Shared/Header';

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/djsehv3ir/image/upload`;
const CLOUDINARY_UPLOAD_PRESET = "ge24dtyn";

const OfferPropertyPage = () => {
  const [agentData, setAgentData] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    price: '',
    propertyType: 'Apartment',
    propertyStatus: 'For Sale',
    description: '',
    propertyId: '',
    locationEmbedLink: '',
    details: {
      bedrooms: '',
      bathrooms: '',
      propertySize: '',
      garage: '',
      garageSize: '',
      yearBuilt: '',
    },
    additionalDetails: {
      deposit: '',
      poolSize: '',
      amenities: '',
      additionalRooms: [],
      equipment: [],
    },
    features: {
      airConditioning: false,
      lawn: false,
      swimmingPool: false,
      barbeque: false,
      dryer: false,
      gym: false,
      laundry: false,
      microwave: false,
      outdoorShower: false,
      refrigerator: false,
      sauna: false,
      tvCable: false,
      washer: false,
      wifi: false,
      windowCoverings: false,
    },
    agent: {
      name: '',
      phone: '',
      email: '',
    },
  });

  const [images, setImages] = useState([]);
  const [newRoom, setNewRoom] = useState('');
  const [newEquipment, setNewEquipment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgentProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setAgentData(data.data);
          setFormData((prevData) => ({
            ...prevData,
            agent: {
              name: data.data.firstName + ' ' + data.data.lastName,
              phone: data.data.phone,
              email: data.data.email,
            },
          }));
        } else {
          toast.error(data.message || 'Failed to fetch agent data');
        }
      } catch (error) {
        toast.error('Error fetching agent data');
      }
    };

    fetchAgentProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        [name]: value,
      },
    }));
  };

  const handleAdditionalDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      additionalDetails: {
        ...prevData.additionalDetails,
        [name]: value,
      },
    }));
  };

  const handleFeatureChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      features: {
        ...prevData.features,
        [name]: checked,
      },
    }));
  };

  const addAdditionalRoom = () => {
    if (newRoom.trim() === '') {
      toast.error('Room name cannot be empty');
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      additionalDetails: {
        ...prevData.additionalDetails,
        additionalRooms: [...prevData.additionalDetails.additionalRooms, newRoom],
      },
    }));
    setNewRoom('');
  };

  const addEquipment = () => {
    if (newEquipment.trim() === '') {
      toast.error('Equipment name cannot be empty');
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      additionalDetails: {
        ...prevData.additionalDetails,
        equipment: [...prevData.additionalDetails.equipment, newEquipment],
      },
    }));
    setNewEquipment('');
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
  
    if (files.length + images.length > 5) {
      toast.error('You can only upload up to 5 images.');
      return;
    }
  
    const uploadedImageUrls = [];
  
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
      try {
        const response = await fetch(CLOUDINARY_UPLOAD_URL, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.secure_url) {
          uploadedImageUrls.push(data.secure_url);
          toast.success('Image uploaded successfully!');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image');
      }
    }
  
    setImages((prevImages) => [...prevImages, ...uploadedImageUrls]);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.propertyId) {
      toast.error('Please enter a Property ID.');
      return;
    }

    const propertyData = {
      ...formData,
      images,
    };

    try {
      const response = await fetch('http://localhost:3001/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(propertyData),
      });

      if (response.ok) {
        toast.success('Property created successfully!');
        navigate('/profile');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to create property');
      }
    } catch (error) {
      console.error('Error creating property:', error);
      toast.error('An error occurred while creating the property');
    }
  };

  return (
    <>
    <Header/>
    <Container className="my-5">
      <ToastContainer position="top-center" />
      <h1>Offer a Property</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="propertyId">
          <Form.Label>Property ID</Form.Label>
          <Form.Control
            type="text"
            name="propertyId"
            value={formData.propertyId}
            onChange={handleInputChange}
            placeholder="Enter unique property ID"
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="propertyType">
              <Form.Label>Property Type</Form.Label>
              <Form.Control
                as="select"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
              >
                <option>Apartment</option>
                <option>Condo</option>
                <option>House</option>
                <option>Townhouse</option>
                <option>Bungalow</option>
                <option>Land</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="propertyStatus">
              <Form.Label>Property Status</Form.Label>
              <Form.Control
                as="select"
                name="propertyStatus"
                value={formData.propertyStatus}
                onChange={handleInputChange}
              >
                <option>For Sale</option>
                <option>For Rent</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <h5>Property Details</h5>
        <Row>
          <Col>
            <Form.Group controlId="bedrooms">
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control
                type="number"
                name="bedrooms"
                value={formData.details.bedrooms}
                onChange={handleDetailsChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="bathrooms">
              <Form.Label>Bathrooms</Form.Label>
              <Form.Control
                type="number"
                name="bathrooms"
                value={formData.details.bathrooms}
                onChange={handleDetailsChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="propertySize">
              <Form.Label>Property Size (sq ft)</Form.Label>
              <Form.Control
                type="number"
                name="propertySize"
                value={formData.details.propertySize}
                onChange={handleDetailsChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="garage">
              <Form.Label>Garage</Form.Label>
              <Form.Control
                type="number"
                name="garage"
                value={formData.details.garage}
                onChange={handleDetailsChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="garageSize">
              <Form.Label>Garage Size (sq ft)</Form.Label>
              <Form.Control
                type="number"
                name="garageSize"
                value={formData.details.garageSize}
                onChange={handleDetailsChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="yearBuilt">
              <Form.Label>Year Built</Form.Label>
              <Form.Control
                type="date"
                name="yearBuilt"
                value={formData.details.yearBuilt}
                onChange={handleDetailsChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <h5>Features</h5>
        {Object.keys(formData.features).map((feature) => (
          <Form.Check
            key={feature}
            type="checkbox"
            label={feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, ' $1')}
            name={feature}
            checked={formData.features[feature]}
            onChange={handleFeatureChange}
          />
        ))}

        <h5>Additional Details</h5>
        <Form.Group controlId="deposit">
          <Form.Label>Deposit</Form.Label>
          <Form.Control
            type="number"
            name="deposit"
            value={formData.additionalDetails.deposit}
            onChange={handleAdditionalDetailsChange}
          />
        </Form.Group>
        <Form.Group controlId="poolSize" className="mt-3">
          <Form.Label>Pool Size (sq ft)</Form.Label>
          <Form.Control
            type="number"
            name="poolSize"
            value={formData.additionalDetails.poolSize}
            onChange={handleAdditionalDetailsChange}
          />
        </Form.Group>
        <Form.Group controlId="amenities" className="mt-3">
          <Form.Label>Amenities</Form.Label>
          <Form.Control
            type="text"
            name="amenities"
            value={formData.additionalDetails.amenities}
            onChange={handleAdditionalDetailsChange}
            placeholder="E.g., Clubhouse, Gym"
          />
        </Form.Group>
        <Form.Group controlId="additionalRooms" className="mt-3">
          <Form.Label>Additional Rooms</Form.Label>
          <Row>
            <Col xs={9}>
              <Form.Control
                type="text"
                value={newRoom}
                onChange={(e) => setNewRoom(e.target.value)}
                placeholder="Add a room"
              />
            </Col>
            <Col xs={3}>
              <Button onClick={addAdditionalRoom}>Add</Button>
            </Col>
          </Row>
          <ul>
            {formData.additionalDetails.additionalRooms.map((room, index) => (
              <li key={index}>{room}</li>
            ))}
          </ul>
        </Form.Group>
        <Form.Group controlId="equipment" className="mt-3">
          <Form.Label>Equipment</Form.Label>
          <Row>
            <Col xs={9}>
              <Form.Control
                type="text"
                value={newEquipment}
                onChange={(e) => setNewEquipment(e.target.value)}
                placeholder="Add equipment"
              />
            </Col>
            <Col xs={3}>
              <Button onClick={addEquipment}>Add</Button>
            </Col>
          </Row>
          <ul>
            {formData.additionalDetails.equipment.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Form.Group>

        <Form.Group className="mb-3" controlId="locationEmbedLink">
          <Form.Label>Location Embed Link</Form.Label>
          <Form.Control
            type="text"
            name="locationEmbedLink"
            value={formData.locationEmbedLink}
            onChange={handleInputChange}
            placeholder="Paste the Google Maps embed link here"
          />
          <Form.Text className="text-muted">
            To add a location, get an embed link from Google Maps.
          </Form.Text>
        </Form.Group>

        {formData.locationEmbedLink && (
          <div className="map-embed mb-3">
            <iframe
              src={formData.locationEmbedLink}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Property Location"
            ></iframe>
          </div>
        )}

        <Form.Group controlId="images" className="mb-3">
          <Form.Label>Property Images (Up to 5)</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleImageUpload}
            accept="image/*"
          />
          <Form.Text className="text-muted">
            You can upload up to 5 images.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Property
        </Button>
      </Form>
    </Container>
    <Footer/>
    </>
  );
};

export default OfferPropertyPage;
