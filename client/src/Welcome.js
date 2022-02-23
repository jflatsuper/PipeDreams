import axios from 'axios'
import React,{useEffect} from 'react'
import {Container, Nav,Form,Col ,Navbar, NavItem,NavLink,Row,NavDropdown,Button,InputGroup,FormGroup} from 'react-bootstrap'
import { Outlet } from 'react-router'
import {Link} from 'react-router-dom'
import {BsEnvelopeFill} from 'react-icons/bs'
import {LinkContainer} from 'react-router-bootstrap'

function Welcome({auth,logout}){
    useEffect(()=>{
        console.log(auth)
      
    },[])
   
    
    return(
        <>
        
        <Row style={{textAlign:"center"}}><h1>PipeDreams{auth._id}</h1>
        </Row> 
        <Navbar variant="light" expand="sm"  style={{backgroundColor:"grey",marginTop:"0",paddingRight:"0",paddingTop:"0"}}>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav  defaultActiveKey='' fill  className='me-auto col-sm-12 text-danger nav active'>
                        <LinkContainer to='/menu'>
                            <Nav.Link>Menu</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/contact'>
                            <Nav.Link>Contact</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/order'>
                            <Nav.Link>Order Now</Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Account" id='basic-nav-dropdown'>
                            {auth?
                            <><LinkContainer to='#'>
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
        <Outlet/>
        <footer id="about" style={{backgroundColor:"black", color:"ghostwhite"}}>
           <Container className="text-center">

               <h3>Stay connected with our Newsletter</h3>
               <Form>
                    <FormGroup as={Col}>
                        <InputGroup>
                            
                            <InputGroup.Text>
                                <BsEnvelopeFill/>
                            </InputGroup.Text>
                            
                            <Form.Control  placeholder="Your email.." />
                            <Button type="submit" className="btn-secondary">Join Mailing List</Button>
                        </InputGroup>
                    </FormGroup>
                    
                </Form>
           </Container>

        </footer>
        </>
    )

}
export default Welcome