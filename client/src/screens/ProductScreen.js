import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import axios from "axios";
import ProductAttributes from '../components/ProductAttributes.js'


const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState([]);
  // const [cart, setCart] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      
      setProduct(data);
    };

    fetchProduct();
  }, [match]);
  // const addToCart = product => {
  //   console.log("we are in add to cart");
  //   setCart([...cart, product]);
  // };
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item></ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  // onClick={() => addToCart(product)}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>
                  <h3>Contact</h3>
                </Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Name:</Col>
                <Col>{product.contact_name}</Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Email:</Col>
                <Col>{product.contact_email}</Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Phone:</Col>
                <Col>{product.contact_phone}</Col>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <ProductAttributes product={product} />

    </>
  );
};

export default ProductScreen;
