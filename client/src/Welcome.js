import React from 'react'
import {Container, Nav, Navbar, NavItem,NavLink,Row,NavDropdown} from 'react-bootstrap'
import { Outlet } from 'react-router'
import {Link,LinkContainer} from 'react-router-bootstrap'
function Welcome(){
    return(
        <>
        
        <Row style={{textAlign:"center"}}><h1>PipeDreams</h1>
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
                        <LinkContainer to='#about'>
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Account" id='basic-nav-dropdown'>
                            <LinkContainer to='#'>
                                <NavDropdown.Item>
                                    Orders
                                </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider/>
                            <LinkContainer to='#'>
                                <NavDropdown.Item>
                                    Profile
                                </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider/>
                            <LinkContainer to='#'>
                                <NavDropdown.Item>
                                    Login
                                </NavDropdown.Item>
                            </LinkContainer>
                            
                            
                            
                        </NavDropdown>
                </Nav>

            </Navbar.Collapse>

                
             
        </Navbar>
        <Outlet/>
        <footer id="about" style={{backgroundColor:"black", color:"ghostwhite"}}>
           <Container className="text-center">
               <h3>Stay connected with our Newsletter</h3>
           </Container>

        </footer>
        </>
    )

}
export default Welcome