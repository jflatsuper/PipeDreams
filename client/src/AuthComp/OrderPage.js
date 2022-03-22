import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Card, CardGroup, CardImg, Image,Row,Button, Col,Container,Badge } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import {LinkContainer} from 'react-router-bootstrap'
import ImageOverlay from '../ImageOverlay'
import img from '../images/menu.jpeg'

function OrderPage({foods}){
    const [fFoods,setfFood]=useState([])
    const [types,setTypes]=useState([])
    const [active,setactive]=useState([])
   

    useEffect(()=>{
        setfFood(foods)
        let alltypes=new Set(foods.map(f=>f.type))
        console.log([...alltypes])
        setTypes([...alltypes])
        setactive('all')
        


    },[foods])
   
    const filter=(e)=> {
        setactive(e.target.value)
       console.log(fFoods)
       
        if(e.target.value==='all'){
            return setfFood(foods)
        }
        e.preventDefault()
        console.log(e.target.value)
        return setfFood(foods.filter(food=>food.type===e.target.value))
        
    }
   
    return(
        <>
        <Container fluid className="my-2 mb-2 px-0 py-2"  style={{height:'50vh'}} >
                <Image src={img} style={{width:'100%',height:'100%'}} fluid />

        </Container>
        <br/>
        <h4 className="text-center  my-4" id='food'>Order Now</h4>
        <Row className='my-4 text-center align-items-center d-flex justify-content-center' style={{}} xs={4} >
        <Col className='py-2 px-2' style={{width:'auto'}}>
                <Button variant='outline-dark' onClick={filter} value='all' className='rounded-pill' className={active==="all"?'active rounded-pill':'rounded-pill'}  >
                    All
                </Button>
            </Col>
            {
                types.map((type,index)=>(
                    <Col className='py-2 px-2' key={index} style={{width:'auto'}}>
                        <Button variant='outline-dark' className={active===type?'active rounded-pill':'rounded-pill'} id='type' value={type} onClick={filter} >
                           {type}
                        </Button>
                    </Col>
            
            
                ))
            }
           
           
        </Row>
        <Row xs={2} md={3} lg={4} className="g-4 " className="" >
        {
            fFoods.sort((a,b)=>{
                let fa = a.type.toLowerCase(),fb = b.type.toLowerCase();
        
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            }).map((food,index)=>(
                <Col   key={index}>
                    <LinkContainer to={`/order/${food.name}/${food._id}`} >
                        <Card className="shadow mb-2 bg-white rounded" >
                            <Card.Img style={{height: "30vw",objectFit: "cover"}} variant="top" src='{food.imgurl}' loading="lazy"/>
                            <Card.Body>
                                <Card.Text style={{}}>
                                <span style={{width:'55%',overflowY:'clip',textOverflow:'ellipsis',whiteSpace:'nowrap',float:'left'}}>{food.name}</span><span style={{float:"right"}}>{food.preptime}mins</span>
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