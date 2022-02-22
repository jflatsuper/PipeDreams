import React, { useEffect, useState } from 'react'
function Contact(){
    const[vart,setVart]=useState('')
    useEffect(()=>{
        fetch('/api/new')
        .then(resp=>resp.json())
        .then(setVart)


    },[])
    return (
        <>
            <p> Contact page is not ready</p>
            {vart}
        </>
    )

}
export default Contact