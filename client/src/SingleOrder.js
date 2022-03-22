import React ,{useEffect,useState} from 'react'
import {Card,Row,Col,Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
function SingleOrder({orders}){
    const [single,setSingle]=useState({})
    const navigate=useNavigate()
    
    const {id}=useParams()
    useEffect(()=>{
        (async()=>{
            const t=await orders.find(t=>t.transactionref===id)

            setSingle(t)

        })()
        
    },[orders])
    if(!single){

        return <Navigate to="/orders" replace/>

    }
    return (
        <>
        {console.log(single)}
        <br/>
        <p className='text-center'>Status: {single?.completed?<span className='text-success'>Completed</span>:<span className='text-danger'>Pending</span>}</p>
     
        {single?.products?.map(product=>(
            <Card key={product._id} className="shadow my-2  rounded">
                
                <Card.Body >
                    <Row style={{width:'100%'}}>
                        <Col lg={11} xs={10}>
                            <Row style={{height:'100px'}}>
                                <Col style={{height:'100%'}} lg={2}  xs={6}>
                                    <Image src={'product.imgurl'} thumbnail style={{height:'90%',width:'100%',objectFit:'cover'}}/>

                                </Col>
                                <Col xs={6} >  
                                <p> <Link to={`/order/${product.name}/${product._id}`}> <span style={{width:'100%',overflowY:'clip',textOverflow:'ellipsis',whiteSpace:'nowrap',float:'left'}}>{product.name}</span></Link></p> 
                                    <p>
                                    <span style={{width:'100%',overflowY:'clip',textOverflow:'ellipsis',whiteSpace:'nowrap',float:'left'}}>Quantity: {product.num} </span>
                        
                                    </p>
                                    
                                    <p>
                                        Total:  &#8358;{product.price}
                                            
                                    </p>
                                
                                </Col>
                            </Row>
                            
                            
                        </Col>

                    </Row>
                
                </Card.Body>
            
            </Card>
        ))}
        
        </>
    )
}
export default SingleOrder