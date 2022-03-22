import axios from 'axios'
import React,{useEffect,useState} from 'react'
import {Container, Nav,Form,Col ,Navbar, NavItem,NavLink,Row,NavDropdown,Button,InputGroup,FormGroup,Modal, ModalTitle,Badge} from 'react-bootstrap'
import { Outlet, useLocation } from 'react-router'
import {Link} from 'react-router-dom'
import {BsEnvelopeFill} from 'react-icons/bs'
import {LinkContainer} from 'react-router-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'


function Welcome({auth,logout,cart}){
    const location=useLocation()
    
    useEffect(()=>{
        console.log(auth+"this is the value")
      
    },[])
    const [email,setEmail]=useState()
    const join_newsletter=(e)=>{
        e.preventDefault()
        axios.post('/api/join_newsletter',{email:email})
        .then((res)=>console.log(res))



    }
   
    
    return(
        <>
        <Container fluid className="px-0">
         {/* <Modal show={true} centered size="md" >
                 <ModalHeader closeButton>
                    <ModalTitle style={{textAlign:'center'}} ><h5 >Successful Newletter Subscription</h5></ModalTitle></ModalHeader>
                <Modal.Body>Succes is my portion</Modal.Body>
        </Modal> */}
      
       <Container>
       <Row style={{textAlign:"center"}}><h1>PipeDreams</h1>

        </Row> 


       </Container>
        
        <Navbar variant="light" expand="sm"  style={{backgroundColor:"grey",marginTop:"0",paddingRight:"0",paddingTop:"0"}} collapseOnSelect>
       
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav  activeKey={location.pathname} fill  className='mx-0 col-sm-12 text-danger nav active' >
                        <LinkContainer to=''>
                            <Nav.Link eventkey="">Menu</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/contact'>
                            <Nav.Link eventKey='contact'>Contact</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/order/cart'>
                            <Nav.Link eventKey='order/cart'> Cart<Badge>{cart?.products?.length ||0}</Badge> </Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Account" id='basic-nav-dropdown'>
                            {auth?
                            <><LinkContainer to='/order/cart'>
                                <NavDropdown.Item>
                                    Cart
                                </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider/>
                            <LinkContainer to='/orders/pending'>
                                <NavDropdown.Item>
                                   Orders
                                </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider/>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>
                                    Profile
                                </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider/>
                            
                            
                            <NavDropdown.Item>
                                <Button onClick={logout}>Logout</Button>
                            </NavDropdown.Item>
                        
                          </>  :<LinkContainer to='/signin'>
                            <NavDropdown.Item>
                                Login
                            </NavDropdown.Item>
                        </LinkContainer>
}
                            
                            
                        </NavDropdown>
                </Nav>

            </Navbar.Collapse>

                
             
        </Navbar>
        <Container fluid style={{minHeight:'84vh',backgroundColor:'darkgrey'}} className="py-2">
            <Outlet/>

        </Container>
       
        <footer id="about" className="px-2 pt-2 pb-2" style={{backgroundColor:"black", color:"ghostwhite"}}>
           <Container className="text-center">
               <Form onSubmit={join_newsletter}>
                    <FormGroup as={Col}>
                        <InputGroup>
                            
                            <InputGroup.Text>
                                <BsEnvelopeFill/>
                            </InputGroup.Text>
                            
                            <Form.Control  placeholder="Your email.." type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                            <Button type="submit" className="btn-secondary">Join Mailing List</Button>
                        </InputGroup>
                    </FormGroup>
                    
                </Form>
                
           </Container>

        </footer>
        </Container>
        </>
    )

}
export default Welcome