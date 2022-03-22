import React,{useState,useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Welcome from './Welcome';
import {BrowserRouter, Routes,Route, useNavigate, useLocation, useParams } from 'react-router-dom'
import About from './About';
import Contact from './Contact';
import Menu from './Menu';
import Login from './AuthComp/Login';
import Profile from './Profile';
import AuthRoutes from './AuthenticatedRoutes';
import OrderPage from './AuthComp/OrderPage';
import Foodpage from './FoodPage';
import Cart from './Cart';
import Orders from './Orders';
import SingleOrder from './SingleOrder'
import NotFound from './NotFound';
import Address from './Address'
import Pending from './Pending';
import Completed from './Completed';

function App() {
  const navigate=useNavigate()
  const {state}=useLocation()
  const [num,setNum]=useState(0)
  
  const [auth,setAuth]=useState(null)
  const [cart,setCart]=useState({})
  const [foods,setFood]=useState([])
  const [val,setVal]=useState({})
  const [orders,setOrders]=useState([])
  

  useEffect(()=>{
    // let [value1, value2] = await Promise.all(axios.get('/api/getAuth').data, axios.post('/api/getfood').data);
   axios.get('/api/getAuth')
   .then(res=>setAuth(res.data))
  
   .then( axios.post('/api/getfood')
   .then(async res=>{
              await setFood(res.data)
              // setLoading(false)
              console.log(res.data)}
              
          )
    
    )
   
    


   
  

  },[])
  useEffect(()=>{
   
    (setAllOrders)()
        
  },[auth])
  const  setAllOrders=async()=>{
    axios.get('/api/getOrders')
    .then(async resp=>{
        await setOrders(resp.data)
        console.log(resp)})
  }

 
  const onAddCart=async(e,action,foodid)=>{ 
    e.persist()
    const f=await axios.post('/api/updateCart',{_id:foodid,action:action})
    
    setCart(f.data)
    return false
}

  useEffect(()=>{
    axios.get('/api/getCart')
    .then(async res=>{
      await setCart(res.data)
      console.log(res)
    })

  },[])
  const logout=(e)=>{
    e.preventDefault()
    axios.post('/api/logout')
    .then(setAuth(''))
    navigate('/', {replace:true})
    

  }
 const changeCart=async(reference,checked)=>{
  
      axios.post('/api/saveOrder',{reference:reference.reference,transid:reference.trans,checked:checked}).then(resp=>{
        console.log(resp)
        setOrders([...orders,resp.data])
      })
      let newcart=cart.products
      for(let i of checked){
      newcart=newcart.filter(cartitem=>cartitem._id!==i._id)
      console.log(newcart)
}
  await setCart({...cart,products:newcart})
  
 } 
 const onFormSubmitLocal=(e,body)=>{
  e.preventDefault()
  // console.log(location)
  axios.post(`/api/login`,body)
  .then(async (resp)=>{
    await setAuth(resp.data)
    navigate(state||'/', {replace:true})
    })
  .then(console.log(auth)) 
  .catch(err=>{console.log(err)})

 

  

  }
  
  const food=async(id)=>{
      const f=await foods.find((t)=>t._id===id)
      await console.log(f)
      return f
    
    
    
  }
  const facebookSignin=(e)=>{
    e.preventDefault()
    window.open("http://localhost:3033/api/facebook","_self")
    
  }

  if(auth===null||!foods.length){
    return(
      null
    )
  }else{
    return (
      <>
        <div >
        <Routes>
          
        <Route path="signin" element={<Login

            onFormSubmitLocal={onFormSubmitLocal}
            facebookSignin={facebookSignin}
            />
            }/>
          <Route path="/" element={<Welcome 
            auth={auth}
            cart={cart}
            logout={logout}/>
            }>
              <Route path="*" element={<NotFound/>}/>
            <Route path="profile" element={<AuthRoutes 
            element={<Profile/>}
            auth={auth}/>}/>
            
            <Route path="about" element={<About/>}/>
            <Route path="address" element={<Address/>}/>
            {/* <Route path="menu" element={<Menu/>}/> */}
            <Route path="contact" element={<Contact/>}/>
            <Route path='' element={
              <OrderPage
                foods={foods}
                

              />}
            />
            <Route path='order/cart'  element={<AuthRoutes 
            element={<Cart 
            cart={cart}
            changeCart={changeCart}
            onAddCart={onAddCart}
            
            auth={auth}/>}
            auth={auth}/>}
            
            />
            <Route path='orders' element ={
              <AuthRoutes
                element={
                  <Orders
                  />}
                auth={auth}
              />
            }>
              <Route path='pending' element={
                <Pending
                  orders={orders.filter(order=>order.completed===false)}
                    />
              }/>

              <Route path='completed' element={
                <Completed
                  orders={orders.filter(order=>order.completed===true)}
                />
              }/>
            </Route>
             <Route path='orders/:id' element ={
              <AuthRoutes
                element={
                <SingleOrder 
                  orders={orders}
                />}
                auth={auth}
              />
            }/>

            <Route path='order/:name/:id' element={
              <Foodpage
                f={food}
                num={num}
                onAddCart={onAddCart}

              />}/>
            
            
            
  
          </Route>
          
          
        </Routes>
  
        </div>
        
  
      
      </>
    );
  }
  
}

export default App;
