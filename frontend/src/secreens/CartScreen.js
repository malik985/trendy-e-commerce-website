import axios from 'axios'
import React, { useContext } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link,useNavigate } from 'react-router-dom'
import MessageBox from '../componenets/MessageBox.js'
import { store } from '../store'


function CartScreen() {
    const navigate = useNavigate()
    const { state, dispatch: ctxDispatch} = useContext(store)
    const {
        cart : {cartItems}
    }= state
    const updateCartHandler = async ( item, quantity ) =>{
        const {data} = await axios.get(`/api/products/${item._id}`)
        if (data.countInStock < quantity) {
            window.alert('sorry. product is out of stock')
            return
          }
          ctxDispatch({type:'CART_ADD_ITEM', payload: {...item,quantity}})
    }
    const removeItemHandler = (item) => {
        ctxDispatch({type:'CART_REMOVE_ITEM', payload: item})

    }
    const checkoutHandler =() => {
        navigate('/signin?redirect=/shipping')
    }
  return (
    <div className='home'>
        <Helmet>
            <title>Shopping Cart</title>
        </Helmet>
        <h1>Shopping Cart</h1>
        <Row className='mt-3'>
            <Col md={8}>
                {cartItems.length === 0 ? (
                    <MessageBox >
                       cart is empty .  <Link to ="/">Go shopping</Link>
                    </MessageBox>
                ):
                (
                   <ListGroup>
                    {cartItems.map((item) => 
                    (
                     <ListGroup.Item key={item._id}>
                        <Row className='align-items-centre'>
                            <Col md={4}>
                                <img src={item.image}
                                alt={item.name}
                                className='imageProduct'>
                                </img>{' '}
                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                            </Col>
                            <Col md={3}>
                                <Button variant ="light" 
                                onClick={()=> updateCartHandler(item,item.quantity-1)}
                                disabled={item.quantity === 1}>
                                    <i className='fas fa-minus-circle'></i>

                                </Button>
                                <span>{item.quantity}</span>{' '}
                                <Button variant ="light" 
                                onClick={()=> updateCartHandler(item,item.quantity+1)}
                                disabled={item.quantity === item.countInStock}>
                                    <i className='fas fa-plus-circle'></i>

                                </Button>
                            </Col>
                            <Col md={3}>${item.price}</Col>
                            <Col md={2}>
                                <Button variant='light'
                               onClick={()=> removeItemHandler(item)}
                                                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </Col>
                        </Row>
                     </ListGroup.Item>   
                    ))}
                   </ListGroup> 
                )
            }
            </Col>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                           <h3>
                            subtotal ({cartItems.reduce((a,c)=> a+ c.quantity,0)}{' '}items) : $
                            {cartItems.reduce((a,c)=> a+c.price*c.quantity,0)} 
                            </h3> 
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className='d-grid'>
                                    <Button type="button"
                                    variant='primary'
                                    onClick={checkoutHandler}
                                    disabled={cartItems.length === 0}>
                                        proceed to checkout
                                    </Button>

                                    </div>                            </ListGroup.Item>


                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    </div>
  )
}

export default CartScreen