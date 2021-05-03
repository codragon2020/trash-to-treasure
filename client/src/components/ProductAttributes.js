import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

function ProductAttributes({ description, _id }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleDelete(product) {
    // 
    try {
        console.log("handleDelete1 called")
        await axios.delete(`/product/${product._id}`);
        console.log("handleDelete called")
        Router.push("/");
    } catch (err) {
        console.log(err)
    }
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
