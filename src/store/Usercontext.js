import React from "react";

const Usercontext=React.createContext({
    user:'',
    login:(info)=>{},
    meals:[],
    fetchmeals:(meals)=>{},
    logout:()=>{}

})


export default Usercontext;