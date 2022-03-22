import React,{useEffect, useRef, useState} from 'react'
import { FormControl,FormGroup, FormLabel,Container} from 'react-bootstrap'





const ApiKey="AIzaSyBvIFlZDcRFPCCaElSmy2tOcIx-kKVcPt4";
const mapApiJs='https://maps.googleapis.com/maps/api/js';
function loadAsyncScript(src){
    return new Promise(resolve=>{
        const script=document.createElement('script')
        Object.assign(script,{
            type:'text/javascript',
            async:true,
            src
        })
        script.addEventListener('load',()=>resolve(script))
        document.head.appendChild(script)
    })

}
function Address(){
    const [val,setVal]=useState(null)
    const searchInput=useRef()
    const initMapScript=()=>{
        if(window.google){
            return Promise.resolve()
        }
        const src=`${mapApiJs}?key=AIzaSyBvIFlZDcRFPCCaElSmy2tOcIx-kKVcPt4&libraries=places&v=weekly`
        return loadAsyncScript(src)
        
        
    }
    const initAutocomplete=()=>{
        if(!searchInput.current)return ;
        const autocomplete=new window.google.maps.places.Autocomplete(searchInput.current)
        autocomplete.setFields(['address_component','geometry'])
    }
        
    

    useEffect(()=>{
        initMapScript().then(()=>initAutocomplete())
    },[])
    // This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js">


    return (
        <>
        <Container>
            <FormGroup className="col-sm-6">
                <FormLabel htmlFor="address" >Your address</FormLabel>
                <FormControl name="adddress" ref={searchInput}/>

            </FormGroup>
            <p>Address:{val}</p>

        </Container>
        
        
        </>
    )

}
export default Address
