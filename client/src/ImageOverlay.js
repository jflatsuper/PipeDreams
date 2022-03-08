import React from 'react'
import './App.css'
import {Button} from 'react-bootstrap'
import {BsFillCartPlusFill,BsFillCartCheckFill} from 'react-icons/bs'
export default function ImageOverlay({width,src,caption,alt,height,small,medium,large}){
    return (
        <div className="hover hover-1 text-white rounded " style={{backgroundColor:'black'}}>
             <img
                    className="d-block mx-auto"
                    style={{display:'block',margin:'auto',maxWidth:'100%'}}
                   
                    height={height}
                    src={src}
                    alt={alt}/>
            <div className="hover-overlay">          
            </div>
            <div className="hover-1-content px-5 py-4">    
                <p className="hover-1-description font-weight-light mb-0">Price:  N{caption}</p>
                <p className="hover-1-description font-weight-light mb-0">Available in S,M,L</p>
                <Button className="hover-1-description font-weight-light mb-0" ><BsFillCartCheckFill/></Button>
            </div>
        
        </div>
    )

}