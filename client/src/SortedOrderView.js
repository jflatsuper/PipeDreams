import React from 'react'
import {Row,Col,Card,Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import moment from 'moment'
const SortedOrderView=({orders})=>{
    return (
        <Container style={{backgroundColor:'grey',paddingTop:'20px',minHeight:'60vh'}} fluid>
            <Row xs={1} lg={1} md={1}>
                <Col lg={12} md={12} xs={12} >
                    <Row xs={1} lg={1}>
                    { orders.map((order)=>(
                        <Col key={order._id} className="my-2">
                            <LinkContainer to={`/orders/${order.transactionref}`} >
                                <Card className="shadow my-2  rounded">
                                    <Card.Header><b><span style={{}}><span className=''>Order #{order.transactionref}</span></span> </b><span style={{float:'right'}}>{moment(818035920000).fromNow()}</span></Card.Header>
                                        
                                    <Card.Body >
                                        <Row style={{width:'100%'}}>
                                            
                                            <Col lg={11} xs={10}>
                                                <Row style={{height:'100px'}}>
                                                    
                                                    <Col xs={6}>
                                                    
                                                        <b><p><span style={{width:'100%',overflowY:'clip',textOverflow:'ellipsis',whiteSpace:'nowrap',float:'left'}}>{order.products.length} product{order.products.length>1?'s':null}</span></p></b>
                                                        {/* <p>&#8358;</p> */}
                                                        
                                                    </Col>
                                                </Row>
                                                
                                                
                                            </Col>

                                        </Row>
                                        
                                        </Card.Body>
                                    
                                </Card>
                     
                            </LinkContainer>    
                        </Col>
                        
                        
                    ))
                }

                    </Row>
                </Col>
        
            </Row>

        </Container>
        
    )

}
export default SortedOrderView