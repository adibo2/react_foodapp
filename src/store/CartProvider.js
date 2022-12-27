import { useEffect, useReducer,useState } from "react"
import Cartcontext from "./Cartcontext"
const defaultstate={
    items:JSON.parse(localStorage.getItem('Cart')) || [],
    totalamount:JSON.parse(localStorage.getItem('total')) || 0
}


const Reducer=(state,action)=>{

    if(action.type==='ADD'){
        const updatetotalamount=state.totalamount + parseInt(action.payload.price + 1.5);
        let updateitems;
        if(state.items.find((item)=>item.id===action.payload.id)){
            updateitems=state.items.map((item)=>(
                
                item.id===action.payload.id ? {...item,amount:item.amount+1} : item
            ))             
        }
        else{
            action.payload.amount=1;

            
            updateitems=state.items.concat(action.payload);

        }

        return({
            items:updateitems,
            totalamount:updatetotalamount
        })
        
    }
    if(action.type==='REMOVE'){
        const existingCartindex=state.items.findIndex((item)=>item.id===action.payload);
        const existingCartitem=state.items[existingCartindex];

        console.log("existing"+existingCartitem)
        console.log(existingCartitem)
        const updatetotalamount=state.totalamount-parseInt(existingCartitem.price - 1.5);
        let updateitems;
        if(existingCartitem.amount === 1){

            updateitems=state.items.filter((item)=>item.id !==action.payload)
        }
        else{
            let updateitem={...existingCartitem,amount:existingCartitem.amount - 1};
            updateitems=[...state.items];
            updateitems[existingCartindex]=updateitem;
            
        }
        return({
            items:updateitems,
            totalamount:updatetotalamount,
        })

    }
    if(action.type === 'REMOVEAI'){
        const existingCartindex=state.items.findIndex((item)=>item.id===action.payload);
        const existingCartitem=state.items[existingCartindex];
        const updatetotalamount=state.totalamount-existingCartitem.price;

        let updateitems=state.items.filter((item)=>item.id !==action.payload);
        return({
            items:updateitems,
            totalamount:updatetotalamount,
        })
        
    }
    if(action.type === 'ADDAI'){
        const updatetotalamount=state.totalamount + parseInt(action.payload.price + 1.5);
        let updateitems;
        if(state.items.find((item)=>item.id===action.payload.id)){
            updateitems=state.items.map((item)=>(
                
                item.id===action.payload.id ? {...item,amount:item.amount+1} : item
            ))             
        }
        else{
            action.payload.amount=action.dd;            
            updateitems=state.items.concat(action.payload);

        }

        return({
            items:updateitems,
            totalamount:updatetotalamount
        })
        
    }
    
    
    if(action.type==='CLEAR'){
        return({
            // ...state,
            items:[],
            totalamount:0


        })
    }
    return defaultstate;

}

// const CartfromLocalStorage =JSON.parse(localStorage.getItem('cart') || '[]')
const CartProvider=(props)=>{


    const [Cartstate,dispatch]=useReducer(Reducer,defaultstate);
    const [showCartItems, setShowCartItems] = useState(false);




    

    const additemcart=(item)=>{
        dispatch({type:'ADD',payload:item})
        // setItems((prevExpenses) => {
        //     return [item, ...prevExpenses];
        //   });

    }
 
    const removeitemcart=(id)=>{
        dispatch({type:'REMOVE',payload:id})
    }
    const removeAlanAI=(id)=>{
        dispatch({type:'REMOVEAI',payload:id})
    }
    const addAlanAI=(item,quantity)=>{
        dispatch({type:'ADDAI',payload:item,dd:quantity})
    }
    const clear=()=>{
        dispatch({type:'CLEAR'})
    }
    // const clearPrice=()=>{
    //     dispatch({type:'PRICE'})
    // }

    const Cart={
        items:Cartstate.items,
        totalamount:Cartstate.totalamount,
        additem:additemcart,
        removeitem:removeitemcart,
        clear:clear,
        removeAI:removeAlanAI,
        addAI:addAlanAI,
        showCartItems,
        setShowCartItems


    } 
    useEffect(()=>{
        localStorage.setItem('Cart',JSON.stringify(Cartstate.items))
        localStorage.setItem('total',JSON.stringify(Cartstate.totalamount))

    },[Cartstate])
    return(
        <Cartcontext.Provider value={Cart}>
            {props.children}

        </Cartcontext.Provider>
    )
    
}
export default CartProvider;

// onClick={() => setShowCartItems(prev => !prev)}