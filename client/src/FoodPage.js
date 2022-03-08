import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {Container,Row,Col,Image, FormControl} from 'react-bootstrap'
import { useParams,Link } from 'react-router-dom'
import { Stack } from 'react-bootstrap'
import { BsFileMinus, BsFillDashSquareFill, BsFillPlusSquareFill } from 'react-icons/bs'
function  Foodpage({f,onAddCart,num}){
   
    const {id}=useParams()
    const [food,setSingleFood]=useState(null)    
    useEffect(()=>(async()=>{
        const t=await f(id)
        console.log(t)
        setSingleFood(t)})()
    ,[])
    
    
    

    
    
    
    
    
    if(food===null){
        return null
    }else{ return(
        <Container fluid>
            <Row xs={1} md={2} lg={2} className="g-4">
            <Col><Image width="100%" style={{height: "50vw",objectFit: "cover"}} className="mt-2" src=""/></Col>
            <Col >
                <h2 style={{textAlign:'center'}}>{food.food.name}</h2>
                <ul>
                {food.food.ingredients.map((ingredient,index)=>(
                    <li key={index}>{ingredient}</li>
                ))}

                </ul>
                <Row>
                    <BsFillPlusSquareFill onClick={(e)=>onAddCart(e,'plus',food)}/>
                    {num}
                    <BsFillDashSquareFill onClick={(e)=>onAddCart(e,'minus',food)}/>
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