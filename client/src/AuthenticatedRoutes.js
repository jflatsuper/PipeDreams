import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'
function AuthRoutes({auth,element}){
   const location=useLocation()
   
   
   return auth? element:<Navigate 
   to="/signin"
   replace
   state={location}
   
   
   />




}
export default AuthRoutes