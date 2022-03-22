import React from 'react'
import SortedOrderView from './SortedOrderView'
function Pending({orders}){
    return(
        <>
            <SortedOrderView
                orders={orders}
            />
        </>
    )
}
export default Pending;