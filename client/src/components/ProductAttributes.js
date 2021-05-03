import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ProductAttributes({ product }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  async function handleDelete(product) {
    try {
        await axios.delete(`/api/products/${product._id}`);
        history.push("/");
    } catch (err) {
        console.log("fail!!!!!", err)
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
          <Button onClick={() => handleDelete(product)}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductAttributes;
