import React,{useEffect, useState} from 'react'
import CartTotal from './CartTotal'
import { Card, Col,Row,  FormCheck } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
function Cart({cart,auth,changeCart}){
    const [cartnum, setCartNum]=useState([])
   
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
        
    
   
    if(!cart){
        return <p>there is nothing in your cart</p>
    }
    return (

        <>
        <Row xs={1} md={2} lg={2}>
            <Col className='col-lg-8' >
            {cartnum.map(cartitem=>(
            <Card key={cartitem._id}>
                <CardHeader>{cartitem.name}</CardHeader>
                <Card.Body><FormCheck defaultChecked onChange={(e)=>onChange(e,cartitem._id)}/>{cartitem.num}</Card.Body>
                
            </Card>
         ))} 
            </Col>
            <Col className='col-lg-4' style={{height:'100vh'}}>
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