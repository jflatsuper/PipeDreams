import axios from 'axios'
import {Card,Col,Navbar,Row,Nav,Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import React, { useEffect,useState } from 'react'
import './App.css'
import { Outlet, useLocation } from 'react-router'


function Orders(){
    const url=useLocation()
    console.log(url)
    
    return (
        <>
       
           
       
           {/* <Nav  activeKey={location.pathname} fill  className='mx-0 col-sm-12 text-danger nav active' > */}
        
        <Navbar expand='sm' className='pb-0' style={{width:'100%'}}>
        
        <Nav fill  activeKey={url.pathname}   style={{width:'100%'}} >
            <Row xs={2} style={{width:'100%',}} className='g-0 text-center '>
                <Col>
                    <LinkContainer to='pending'>
                        <Nav.Link  eventKey='/orders/pending' ><b>Pending</b></Nav.Link>
                    </LinkContainer>
                </Col>
                <Col>
                    <LinkContainer to='completed'>
                        <Nav.Link eventKey='/orders/completed'><b > Completed</b></Nav.Link>
                    </LinkContainer>
                </Col>
            </Row>
           
           
        
        

        </Nav>
       
        
    </Navbar>
    <Outlet/>

     
        
     
        
        </>
    )

}
export default Orders