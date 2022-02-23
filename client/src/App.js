import React,{useState,useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Welcome from './Welcome';
import {BrowserRouter, Routes,Route, useNavigate } from 'react-router-dom'
import About from './About';
import Contact from './Contact';
import Menu from './Menu';
import Login from './AuthComp/Login';
import Profile from './Profile';
import AuthRoutes from './AuthenticatedRoutes';
import OrderPage from './AuthComp/OrderPage';

function App() {
  const navigate=useNavigate()
  const [auth,setAuth]=useState(null)
  useEffect(()=>{
   axios.get('/api/getAuth')
   .then(res=>{setAuth(res.data)})
   .then(console.log(auth))

   
  

  },[])
  const logout=(e)=>{
    e.preventDefault()
    axios.post('/api/logout')
    .then(setAuth(''))
    navigate('/', {replace:true})
    

}
 const onFormSubmitLocal=(e,body)=>{
  e.preventDefault()
  axios.post(`/api/login`,body)
  .then(resp=>setAuth(resp.data))
  
  .catch(err=>{console.log(err)})
  .then(navigate('/', {replace:true}))

  

}
const facebookSignin=(e)=>{
  e.preventDefault()
  window.open("http://localhost:3033/api/facebook","_self")
  
}
  if(auth===null){
    return(
      null
    )}
    else{
    return (
      <>
      
      
        <div >
          
  
  
        <Routes>
        <Route path="signin" element={<Login
            onFormSubmitLocal={onFormSubmitLocal}
            facebookSignin={facebookSignin}/>
            }/>
          <Route path="/" element={<Welcome 
            auth={auth}
            logout={logout}/>
            }>
            <Route path="profile" element={<AuthRoutes 
            element={<Profile/>}
            auth={auth}/>}/>
            
            <Route path="about" element={<About/>}/>
            <Route path="menu" element={<Menu/>}/>
            <Route path="contact" element={<Contact/>}/>
            <Route path='order' element={<OrderPage/>}/>
            
            
  
          </Route>
          
        </Routes>
  
        </div>
        
  
      
      </>
    );
  }
  
}

export default App;
