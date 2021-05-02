import React from "react";
import { Header, Button, Modal } from "semantic-ui-react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom"

function ProductAttributes({ description, _id }) {
  const [modal, setModal] = React.useState(false);

    async function handleDelete() {
      const url = "http://localhost:3001/api/product";
      const payload = { params: { _id } };
      await axios.delete(url, payload);
    //   Router.push("/");
    }

  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Delete Product"
        onClick={() => setModal(true)}
      />
      <Modal open={modal}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this product?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setModal(false)} content="Cancel" />
          <Button
            negative
            icon="trash"
            labelPosition="right"
            content="Delete"
            onClick={handleDelete}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ProductAttributes;
