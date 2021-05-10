import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const HomeScreen = () => {
  
  const [products, setProducts] = useState([])

  const { keyword } = useParams()
  console.log(keyword)
  
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await (keyword === undefined
        ? axios.get("/api/products")
        : axios.get(`/api/products?keyword=${keyword}`));
      
      console.log(data)
      setProducts(data)
    }

    fetchProducts()
  }, [keyword])

  
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen