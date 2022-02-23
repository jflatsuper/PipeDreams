import React, { useState } from 'react'

import { Form, FormControl, FormGroup, FormLabel,Button, InputGroup } from 'react-bootstrap'
import {BsFacebook, BsGoogle } from 'react-icons/bs'
function Login({onFormSubmitLocal,facebookSignin}){
    const[details,setdetails]=useState({
        email:"",
        password:""
    })
    
    const[error,setError]=useState('')
   
    const onInputChange=(e)=>{
        const value=e.target.value
        setdetails({
            ...details,
            [e.target.name]:value
        })


    }
   
    return(
        <>
        
        <Form  onSubmit={(e)=>onFormSubmitLocal(e,details)}>
            <FormGroup>
               
                <FormLabel htmlFor="email">
                    Email Address
                </FormLabel>
                <FormControl type="email" name="email" value={details.email} onChange={onInputChange}/>
            </FormGroup>
            <FormGroup>
                <FormLabel htmlFor="password">
                    Password
                </FormLabel>
                <FormControl type="password" name="password" value={details.password} onChange={onInputChange}/>
            </FormGroup>
            <Button type="submit">
                Login

            </Button>
        
        </Form>
        <Form className="col-sm-3" onSubmit={(e)=>facebookSignin(e)}>
            <FormGroup>
                <InputGroup>
                    <InputGroup.Text><BsFacebook color="blue"/></InputGroup.Text>
                    <Button  type="submit" className="btn-secondary">Sign in with Facebook</Button>
                </InputGroup>
            </FormGroup>
            
        </Form>
        <Form className="col-sm-3" >
            <FormGroup>
                <InputGroup>
                    <InputGroup.Text><BsGoogle color="red"/></InputGroup.Text>
                    <Button >Sign in with Google</Button>
                </InputGroup>
            </FormGroup>
            
        </Form>
        </>
    )

}
export default Login