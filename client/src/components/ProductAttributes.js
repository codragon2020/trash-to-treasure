import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

function ProductAttributes({ description, _id }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleDelete() {
    const url = "http://localhost:3001/api/product";
    const payload = { params: { _id } };
    await axios.delete(url, payload);
    Router.push("/");
  }

  return (
    <>
      <Button
        variant="danger"
        onClick={handleShow}
      >
        Hello
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this product?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductAttributes;
