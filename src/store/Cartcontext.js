import React from "react";

const Cartcontext=React.createContext({
    items:[],
    totalamount:0,
    additem:(item)=>{},
    removeitem:(id)=>{},
    clear:()=>{}

})

export const filtercontext=React.createContext({
    filter:''
})

export default Cartcontext;