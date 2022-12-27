
import React, { useReducer } from 'react'
import { fetchuser } from '../utils/fetchLocalestorage'
import Usercontext from './Usercontext'
const userinfo =fetchuser()
const initiale={
/*     user:null
 */    
    user:userinfo,
    meals:[],

    
}

const Reduceruser=(state,action)=>{
    if(action.type==="SET_USER"){
        return({
            ...state,
            user:action.payload
        })
    }
    if(action.type==="SET_MEALS"){
        return({
            ...state,
            meals:action.payload

        })
    }
    if(action.type==="logout"){
        return({
            ...state,
            user:null
        })

    }

    return initiale
}

const UserProvider = (props) => {

    const [stateuser,dispatch]=useReducer(Reduceruser,initiale)
    const addlogin=(info)=>{
        dispatch({type:"SET_USER",payload:info})
    }
    const fetchmeals=(meal)=>{
        dispatch({type:"SET_MEALS",payload:meal})
        console.log("nsndsd,sdn,")
    }
    const addlogout=()=>{
        dispatch({type:"logout"})
    }

    const utilisateur={
        user:stateuser.user,
        meals:stateuser.meals,
        login:addlogin,
        logout:addlogout,
        fetchmeals:fetchmeals
        
    }
  return (
    <Usercontext.Provider value={utilisateur}>
        {props.children}
    </Usercontext.Provider>
    
  )
}

export default UserProvider