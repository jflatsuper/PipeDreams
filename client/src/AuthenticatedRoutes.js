import React from 'react'
import {Navigate} from 'react-router-dom'
function AuthRoutes({auth,element}){
   
   return auth? element:<Navigate 
   to="/signin"
   replace
   
   />




}
export default AuthRoutes