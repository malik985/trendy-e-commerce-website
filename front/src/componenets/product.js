import React, { useContext } from 'react'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Link } from 'react-router-dom'
import Rating from './Rating';
import axios from 'axios';
import { store } from '../store';




export default function Product(props) {
    const {product}= props;
    const { state, dispatch: ctxDispatch} = useContext(store)
    const {
        cart : {cartItems}
    }= state
    const addToCartHandler = async ( item ) =>{
      const existItem =cartItems.find((x) => x._id === product._id)
      const quantity = existItem ? existItem.quantity +1 : 1;
      const {data} = await axios.get(`/api/products/${item._id}`)
      if (data.countInStock < quantity) {
          window.alert('sorry. product is out of stock')
          return
        }
        ctxDispatch({type:'CART_ADD_ITEM', payload: {...item,quantity}})
  }
  return (
    <Card>
            <Link to={`/product/${product.slug}`}>
            <img src={product.image} className="card-img-top" alt={product.name} />
            </Link>
            <Card.Body>
            
              <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>

            </Link>
            <Rating rating={product.rating} numReviews={product.numReviews}/>
            
            <Card.Text><strong>${product.price}</strong></Card.Text>
            {product.countInStock === 0 ? ( <Button variant='light' disabled>out of stock</Button>
            ) : (<Button variant='warning' onClick={()=>addToCartHandler(product)}>add to cart</Button>
           )}
            </Card.Body>
          </Card>
  )
}
