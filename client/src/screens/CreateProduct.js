import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Form,
//   Input,
//   TextArea,
//   Button,
//   Image,
//   Message,
//   Header,
//   Icon
// } from "react-bootstrap";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon
} from "semantic-ui-react";

function CreateProduct() {
  const [product, setProduct] = React.useState({
    name: "",
    price: "",
    media: "",
    description: "",
    contactName: "",
    contactNumber: "",
    contactEmail: ""
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setProduct({ [name]: value });
    console.log(product);
  }
  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="1"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            type="file"
            label="Media"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
          <Form.Field
            control={TextArea}
            name="description"
            label="Desciption"
            placeholder="Desciption"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="contactName"
            label="ContactName"
            placeholder="Contact Name"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="contactNumber"
            label="ContactNumber"
            placeholder="Contact Number"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="contactEmail"
            label="ContactEmal"
            placeholder="Contact Email"
            onChange={handleChange}
          />
          <Form.Field
            control={Button}
            color="blue"
            icon="pencil alternate"
            content="Submit"
            type="submit"
          />
        </Form.Group>
      </Form>
    </>
  );
}

export default CreateProduct;
