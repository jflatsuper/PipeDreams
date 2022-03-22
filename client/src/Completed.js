import React from 'react'
import SortedOrderView from './SortedOrderView'
function Completed({orders}){
    return(
        <>
        <SortedOrderView
            orders={orders}
        />
        </>
    )

}
export default Completed;