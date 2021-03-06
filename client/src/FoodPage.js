import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {Container,Row,Col,Image, FormControl, Button,Spinner} from 'react-bootstrap'
import { useParams,Link } from 'react-router-dom'
import { Stack } from 'react-bootstrap'
import { BsCartPlus, BsCartPlusFill, BsFileMinus, BsFillDashSquareFill, BsFillPlusSquareFill } from 'react-icons/bs'
function  Foodpage({f,onAddCart,num}){
   
    const {id}=useParams()
    const [food,setSingleFood]=useState(null) 
    const [loading,setLoading]=useState(false)   
    useEffect(()=>(async()=>{
        const t=await f(id)
        console.log(t)
        setSingleFood(t)})()
    ,[])
    const addtoCart=async (e)=>{
        e.preventDefault()
        setLoading(true)
        const response=await onAddCart(e,'plus',food._id)
        setLoading(response)

    }
    
    
    

    
    
    
    
    
    if(food===null){
        return null
    }else{ return(
        <Container fluid>
            <Row xs={1} md={2} lg={2} className="g-4">
            <Col><Image width="100%" style={{height: "50vw",objectFit: "cover"}} className="mt-2" src="{food.imgurl}" loading="lazy"/></Col>
            <Col >
                <h2 style={{textAlign:'center'}}>{food.name}</h2>
                <ul>
                {food.ingredients.map((ingredient,index)=>(
                    <li key={index}>{ingredient}</li>
                ))}

                </ul>
                <Row>
                {loading?<Button className='bg-dark'  >
                            <Spinner animation="border" size="sm" className='text-center' />
                        </Button>:
                        <Button className='bg-dark'  onClick={addtoCart}>
                            <BsCartPlus style={{color:'grey'}}/>
                        </Button>
                }
                    {/* {num}
                    <BsFillDashSquareFill onClick={(e)=>onAddCart(e,'minus',food._id)}/> */}
                </Row>
                <Link to='/order/cart'>View cart</Link>

            </Col>
            </Row>
            <Row>
                <div>Related Products</div>
                <Col></Col>
                
            </Row>
        </Container>
    )

}}
export default Foodpage