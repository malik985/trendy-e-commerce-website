import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button,Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { store} from '../store.js'
import { getError } from '../utils.js'
function SignupScreen() {
    const navigate = useNavigate()
    const  {search} = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/'
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const { state , dispatch: ctxDispatch} = useContext(store)
    const {userInfo} = state;
    const sumbitHandler = async (e) =>{
        e.preventDefault()
        if (password !== confirm){
            toast.error('password do not match')
            return;
        }
        try {
            const { data } = await axios.post('api/users/signup',{
                name,
                email,
                password,
                
            })
            ctxDispatch({type: 'USER_SIGNIN', payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/')
        } catch (err) {
           toast.error(getError(err))
        }
    }
    useEffect(()=>{
        if (userInfo) {
            navigate(redirect);
        }
    },[navigate,redirect,userInfo])
  return (
    <div className='small'>
        <Helmet>
            <title>Sign Up</title>
        </Helmet>
        <h1 className='my-3'>Sign Up</h1>
        <Form onSubmit={sumbitHandler}>
        <Form.Group className='mb-3' controlId='name'>
           <Form.Label>Name</Form.Label>
           <Form.Control type='name' required onChange={(e)=> setName(e.target.value)}/>
            </Form.Group> 
           <Form.Group className='mb-3' controlId='email'>
           <Form.Label>Email</Form.Label>
           <Form.Control type='email' required onChange={(e)=> setEmail(e.target.value)}/>
            </Form.Group> 
            <Form.Group className='mb-3' controlId='password'>
           <Form.Label>Password</Form.Label>
           <Form.Control type='password' required onChange={(e)=> setPassword(e.target.value)}/>
            </Form.Group> 
            <Form.Group className='mb-3' controlId='password'>
           <Form.Label>Confirm Password</Form.Label>
           <Form.Control type='password' required onChange={(e)=> setConfirm(e.target.value)}/>
            </Form.Group> 
            <div className='mb-3'>
                <Button type='sumbit'>Sign Up</Button>
            </div>
            <div className='mb-3'>
                Already have an account ? {' '}
                <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
            </div>
        </Form>

    </div>
  )
}

export default SignupScreen