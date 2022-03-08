import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Card, CardGroup, CardImg, Image,Row,Button, Col } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import {LinkContainer} from 'react-router-bootstrap'
import ImageOverlay from '../ImageOverlay'

function OrderPage({foods}){
   
    return(
        <>
        <p> this is the order OrderPage</p>
        <Row xs={2} md={3} lg={4} className="g-4" className="mx-2">
        {
            foods.map((food,index)=>(
                <Col   key={index}>
                    <LinkContainer to={`/order/${food.food.name}/${food.food._id}`} >
                        <Card className="shadow mb-2 bg-white rounded" >
                            <Card.Img style={{height: "30vw",objectFit: "cover"}} variant="top" src=""/>
                            <Card.Body>
                                <Card.Text>
                                <span style={{maxWidth:'70%',overflowWrap:'break-word',float:'left'}}>{food.food.name}</span><span style={{float:"right"}}>{food.food.preptime}mins</span>
                                </Card.Text>
                            
                            </Card.Body>
                        </Card>
                    </LinkContainer>
                    
                </Col>
                    
                        
                        
                  

                

                
                
                
            ))
        }
        </Row>
        </>
    )

}
export default OrderPage