import axios from 'axios';
import React from 'react'
import {PaystackButton} from 'react-paystack'

const CartTotal=({cartnum,auth,changeCart})=>{
  let total=0;
  const checked=cartnum.filter(t=>t.check===true)
  for(const f of checked){
        total+=(f.num*f.price)


    }
    
    
    const handlePaystackSuccessAction = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        
        console.log(reference);
       
        changeCart(reference,checked)
        
      };
  
      // you can call this function anything
     const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
      }
  const publicKey = "pk_test_53410c75d2f820247612c152cf06b5191a71d486"
  const amount = total*100
  const componentProps = {
    email:auth.email,
    amount,
    metadata: {
      name:auth.email
    
    },
    publicKey,
    text: "Pay Now",
    onSuccess:(reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  }
   
   

    return <div><p>{total}</p><PaystackButton {...componentProps} />
     </div>

}
export default CartTotal


 