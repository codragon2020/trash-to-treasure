import axios from "axios";
import React from "react";
import { Form, Image, Button, Col } from "react-bootstrap";
import {} from "./style.css";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  image: "",
  description: "",
  contact_name: "",
  contact_phone: "",
  contact_email: ""
};

function CreateProduct() {
  const [products, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState("");
  // const [success, setSuccess] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === "image") {
      setProduct(prevState => ({ ...prevState, image: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }
  }
  const countInStock = 1;
  //cloudinary Setup
  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", products.image);
    data.append("upload_preset", "team-crushing-it");
    data.append("cloud_name", "binayaluitel");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/binayaluitel/image/upload",
      data
    );
    const image = response.data.url;
    return image;
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   console.log(product);
  //   setProduct(INITIAL_PRODUCT);
  //   setMediaPreview("");
  //   //   setSuccess(true);
  // }

  async function handleSubmit(event) {
    event.preventDefault();
    // setLoading(true);
    //cloudinary upload validation
    const image = await handleImageUpload();
    console.log(image);
    console.log("binaya posted image");
    const {
      name,
      price,
      description,
      contact_name,
      contact_phone,
      contact_email
    } = products;

    const payload = {
      name,
      price,
      description,
      contact_name,
      contact_phone,
      contact_email,
      image,
      countInStock
    };
    console.log(payload);

    await axios.post("/api/products", payload);
    // setLoading(false);
    setProduct(INITIAL_PRODUCT);
    setMediaPreview("");
    // setSuccess(true);
  }

  return (
    <>
      <h1>Create New Listing</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                name="name"
                value={products.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group controlId="price">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Product Price"
                name="price"
                value={products.price}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group controlId="image">
              <Form.File
                id="image"
                label="Add Your Image"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Image src={mediaPreview} rounded size="small" />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group controlId="contact_name">
              <Form.Label>Contact Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact Name"
                name="contact_name"
                value={products.contact_name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group controlId="contact_phone">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                // type="text"
                placeholder="Contact Number"
                name="contact_phone"
                value={products.contact_phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group controlId="contact_email">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact Email"
                name="contact_email"
                value={products.contact_email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Label>Information And Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Description"
                name="description"
                value={products.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Form.Row>

        <Button variant="primary" type="submit">
          Post Listing
        </Button>
      </Form>
    </>
  );
}
export default CreateProduct;
