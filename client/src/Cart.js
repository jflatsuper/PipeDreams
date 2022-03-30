import React,{useEffect, useState} from 'react'
import CartTotal from './CartTotal'
import { Card, Col,Row,  FormCheck, Image,Container,Spinner } from 'react-bootstrap'
import {BsFillDashSquareFill,BsFillPlusSquareFill,BsAlarmFill} from 'react-icons/bs'
import LoadingOverlay from 'react-loading-overlay'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import cartempty from './images/emptycart.png'
import { Link } from 'react-router-dom'
function Cart({cart,auth,changeCart,onAddCart}){
    const [cartnum, setCartNum]=useState([])
    const [loading,setloading]=useState(false)
    const [obj,setobj]=useState()
   
    const onChange=async (e,id)=>{
        
        const currval=e.target.checked?true:false
        const currindex=cartnum.findIndex(cartitem=>cartitem._id===id)
        console.log(currindex)
        const curritem=cartnum[currindex]
        const updateditem={
            ...curritem,
            check:currval
        }
        console.log(updateditem)
       await  setCartNum([
           
            ...cartnum.slice(0,currindex),
            updateditem,
            ...cartnum.slice(currindex+1,cartnum.length)

        ])
        console.log(cartnum)

    }
    useEffect(()=>
        (async()=>{
            const x=await cart.products.map((cartitem)=>({...cartitem,check:true}))
            await setCartNum(x)
         
            

        })(),[cart])
        const cartfunctions= async (e,action,id)=>{
            
            setloading(id)
           
            
            const t=await onAddCart(e,action,id)
            setloading()
           
            

        }
        
    
   
    if(cartnum.length===0){
        return (
            <Container style={{minHeight:'80vh',backgroundColor:'white'}} className="d-flex align-items-center justify-content-center ">
                <Row  >
                    <Row>
                        <Image src={cartempty} height="100px" className="mx-auto d-block" style={{width:'200px',color:'blue'}}/>

                    </Row>
                    
                    <Row className="text-center">
                        <p><b>Your Cart is empty.</b><Link to ="/#food">Start Ordering Now</Link></p>
                        
                    </Row>
                    

                </Row>
            
                
                
            </Container>
        )
    }
    return (
        <>
        <Row xs={1} lg={2}>
            <Col lg={8} md={8} xs={12}>
                {cartnum.map(cartitem=>(
                <Row key={cartitem._id} xs={1}>
                    <Col>
                        <Card  className="shadow my-2  rounded">

                            <Card.Body >
                                <Row style={{width:'100%'}} lg={2} xs={2}>
                                    <Col style={{height:'100px'}} className="d-flex align-items-center" lg={1} xs={2} >
                                        <FormCheck
                                        defaultChecked={cartitem.check}
                                        value={cartitem.check}
                                        id={cartitem._id}
                                        onChange={(e)=>onChange(e,cartitem._id)} />
                                    </Col>
                                    <Col xs={10} lg={10} >
                                        <Row style={{height:'100px'}}>
                                            <Col style={{height:'100%'}} lg={2}  xs={6}>
                                                <Image src={'{cartitem.imgurl}'} thumbnail style={{height:'90%',width:'100%',objectFit:'cover'}}/>

                                            </Col>
                                            <Col lg={10} xs={6}>
                                                <Row xs={1} lg={1}>
                                                    <Col xs={12}>
                                                        <b><p><span style={{width:'100%',overflowY:'clip',textOverflow:'ellipsis',whiteSpace:'nowrap',float:'left'}}>{cartitem.name}</span><span >&#8358;{cartitem.price}</span></p></b>
                                                        
                                                            {loading===cartitem._id?<Spinner animation='border' size='sm'/>:
                                                                <span id={`${cartitem._id}`}>
                                                                    <BsFillPlusSquareFill onClick={(e)=>cartfunctions(e,'plus',cartitem._id)} />
                                                                        <span className="mx-2"> {cartitem.num}</span>
                                                                    <BsFillDashSquareFill  name={cartitem._id} onClick={(e)=>cartfunctions(e,'minus',cartitem._id)}/>
                                                                </span>   }

                                                            
                                                                <span style={{float:'right'}}>{cartitem.preptime} mins |<BsAlarmFill/></span>
                                                                {/* onClick={(e)=>remove(e,cartitem.id)}style={{color:'yellowgreen'}} */}
                                                        
                                                    </Col>
                                                    
                                                        
                                                    
                                                </Row>
                                            
                                            
                                                
                                            </Col>
                                            
                                        </Row>
                                        
                                        
                                    </Col>

                                </Row>
                        
                            </Card.Body>

                        </Card>
                    </Col>
                    

                </Row>
            
                )) }
            </Col>
            <Col lg={4} md={4} xs={12}>
                <CartTotal
                    cartnum={cartnum}
                    changeCart={changeCart}
                    auth={auth}
                  
                    />
            </Col>
        </Row>
        
           

       
        </>
    )

}
export default Cart