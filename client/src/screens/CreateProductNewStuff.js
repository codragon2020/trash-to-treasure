import React from "react";
import { Form, Image, Jumbotron, Button, Col } from "react-bootstrap";
import {} from "./style.css";
const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: "",
  contactName: "",
  contactNumber: "",
  contactEmail: ""
};

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState("");
  // const [success, setSuccess] = React.useState(false);

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === "media") {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(product);
    setProduct(INITIAL_PRODUCT);
    setMediaPreview("");
    //   setSuccess(true);
  }
  return (
    <>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Jumbotron>
            <h1>Create New Listing</h1>
          </Jumbotron>

          <Form.Row>
            <Col>
              <Form.Group controlID="name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Group controlID="price">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Product Price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Group controlId="media">
                <Form.File
                  id="media"
                  label="Add Your Image"
                  name="media"
                  accept="image/*"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Image src={mediaPreview} rounded centered size="small" />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Group controlID="contactName">
                <Form.Label>Contact Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contact Name"
                  name="contactName"
                  value={product.contactName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Group controlID="contactNumber">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contact Number"
                  name="contactNumber"
                  value={product.contactNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Group controlID="contactEmail">
                <Form.Label>Contact Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contact Email"
                  name="contactEmail"
                  value={product.contactEmail}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Group controlID="description">
                <Form.Label>Information And Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Button variant="primary" type="submit">
            Post Listing
          </Button>
        </Form>
      </Col>
    </>
  );
}
export default CreateProduct;
