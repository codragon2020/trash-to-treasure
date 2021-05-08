import axios from "axios";
import React from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon,
} from "semantic-ui-react";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  image: "",
  description: "",
  contact_name: "",
  contact_phone: "",
  contact_email: "",
};

function CreateProduct() {
  const [products, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === "image") {
      setProduct((prevState) => ({ ...prevState, image: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct((prevState) => ({ ...prevState, [name]: value }));
    }
  }

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

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
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
      contact_email,
    } = products;

    const payload = {
      name,
      price,
      description,
      contact_name,
      contact_phone,
      contact_email,
      image
    };
    console.log(payload);


    const response = await axios.post("/api/products", payload);
    setLoading(false);
    setProduct(INITIAL_PRODUCT);
    setSuccess(true);
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form loading={loading} success={success} onSubmit={handleSubmit}>
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            value={products.name}
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
            value={products.price}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="image"
            type="file"
            label="Media"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control={Input}
          name="contact_name"
          label="Contact_name"
          placeholder="Contact Name"
          value={products.contact_name}
          onChange={handleChange}
        />
        <Form.Field
          control={Input}
          name="contact_phone"
          label="ContactNumber"
          placeholder="Contact Number"
          value={products.contact_phone}
          onChange={handleChange}
        />
        <Form.Field
          control={Input}
          name="contact_email"
          label="ContactEmal"
          placeholder="Contact Email"
          value={products.contact_email}
          onChange={handleChange}
        />
        <Form.Field
          control={TextArea}
          name="description"
          label="Desciption"
          placeholder="Desciption"
          value={products.description}
          onChange={handleChange}
        />

        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </>
  );
}

export default CreateProduct;
