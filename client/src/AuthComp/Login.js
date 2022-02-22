import React, { useState } from 'react'

import { Form, FormControl, FormGroup, FormLabel,Button } from 'react-bootstrap'
function Login(){
    const[details,setdetails]=useState({
        email:"",
        password:""
    })
    const[val,setVal]=useState('')
    const[error,setError]=useState('')
    const onFormSubmitLocal=(e)=>{
        e.preventDefault()
        fetch(`/api/login`,{
           
            method:'POST',
            
            body:JSON.stringify(details),
            headers:{'Content-Type':'application/json',
            }
        })
        .then(resp=>resp.json())
        .then(setVal)
        .catch(err=>{console.log(err.json().errors)})

    }
    const onInputChange=(e)=>{
        const value=e.target.value
        setdetails({
            ...details,
            [e.target.name]:value
        })


    }
    if(val){
        return (<p>{val.success}</p>)
    }
    if(error){
        return(<p>{error.errors}</p>)
    }
    return(
        <>
        
        <Form  onSubmit={onFormSubmitLocal}>
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
        </>
    )

}
export default Login