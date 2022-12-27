import classes from "./item.module.scss";
import banane from "./../img/ba.png"
import {MdShoppingBag} from "react-icons/md";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { gsap } from "gsap";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { filtercontext } from "../store/Cartcontext";
const Item=(props)=>{

  const menu=useRef();
  const filterCtx=useContext(filtercontext);
  useLayoutEffect(()=>{
    gsap.fromTo(menu.current,{y:60,opacity:0},{opacity:1,y:0,ease:"back",duration:0.7})

  },[filterCtx.filter])

    return(
        
            <div className={classes["item__card"]} ref={menu}>
                
                 <img src={props.img} className={classes["item__card-img"]} />
                 <div className={classes["item__card-bg"]} onClick={props.onClick}>
                 <MdShoppingBag size="13rem" className={classes["item__card-bg-icon"]}></MdShoppingBag>
                 </div>
               <div className={classes["item__card-info"]}>
                 <h5 className={classes["item__card-title"]}>{props.name}</h5>
                 <Stack spacing={1}>
                 <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                 </Stack>
                 <p className={classes["item__card-cal"]}>{props.calories} </p>
                 <p className={classes["item__card-price"]}>{props.price}$</p>
               </div>
            </div>
        
    )

}
export default Item;