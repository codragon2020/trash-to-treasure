import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import {} from "./style.css";
const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded cardz">
      <Link to={`/product/${product._id}`}>
        <Card.Img className="picz" src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div"></Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
