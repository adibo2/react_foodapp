import classes from "./Cart.module.scss";
import {AiOutlineArrowLeft} from "react-icons/ai";
import {MdOutlineKeyboardBackspace} from "react-icons/md";
import {FiRefreshCcw} from "react-icons/fi";
import fruit from "./../img/fruitt.png";
import {BiMinus} from "react-icons/bi";
import { BiPlus } from "react-icons/bi";

import { motion } from "framer-motion"
import { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Cartcontext from "../store/Cartcontext";
import empty from "./../img/emptcart.webp"
import Usercontext from "../store/Usercontext";
import { Fireworks } from '@fireworks-js/react'
import { Link } from "react-router-dom";
import { WavyLink } from "react-wavy-transitions";


const Cart=(props)=>{
    let items = [];
    const container=useRef();
    const Cartctx=useContext(Cartcontext);
    const foodctx=useContext(Usercontext);
    const {showCartItems, setShowCartItems}=useContext(Cartcontext)



    useEffect(()=>{
        const ctx=gsap.context(()=>{
            gsap.from(container.current,{opacity:0,x:100,ease:"back"})          
        })
        return ()=>ctx.revert();
    },[container])

    //Remove Cart item
    const onRemove=(id)=>{
        Cartctx.removeitem(id);

    }
    const onAddCart=(item)=>{
        // localStorage.setItem("cartItems", JSON.stringify([Cartctx.items]));
        Cartctx.additem(item);
    }
    const clickcart=()=>{
        Cartctx.clear();
        console.log(localStorage.getItem('total'));
        Cartctx.totalamount=0;
        // localStorage.setItem("total", JSON.stringify([]));
        
        localStorage.setItem("cartItems",JSON.stringify([]))


    }

    useEffect(() => {
        items = Cartctx.items;
      }, [Cartctx.items.amount,items]);

    return(
        <>
        <div className={classes.cart} ref={container}>
            
            <div className={classes["cart__header"]}>
                <MdOutlineKeyboardBackspace size="2.4rem" className={classes["cart__header-icon"]} onClick={props.onClick}></MdOutlineKeyboardBackspace>
                <p className={classes["cart__header-title"]}>Cart</p>
                <motion.p whileTap={{scale:0.75}} className={classes["cart__header-clear"]} onClick={clickcart}>
                    Clear <FiRefreshCcw /> {" "}</motion.p>

            </div>
            {Cartctx.items.length>0 ? (
                <div className={classes["cart__bottom"]}>
                
                <div className={classes["cart__bottom-content"]}>
                   {/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ cart ********************************/}
                   {Cartctx.items.map((item)=>(

                   <div className={classes["cart__bottom-content-item"]} key={item.id} id={item.id}>         
                     <img src={item.img} className={classes["cart__bottom-content-img"]} />
                    {/* name */}
                     <div className={classes["cart__bottom-content-id"]}>
                        <p className={classes["cart__bottom-content-id-name"]}>{item.name}</p>
                        <p className={classes["cart__bottom-content-id-price"]}>{item.price}$</p>
                     </div>

                    {/* ADD DEELETE */}
                     <div className={classes["cart__bottom-content-control"]}>
                        <motion.div whileTap={{scale:0.75}} onClick={()=>onRemove(item.id)}>
                            <BiMinus style={{color:"rgb(249 250 251)"}}></BiMinus>
                        </motion.div>
                        <p className={classes["cart__bottom-content-control-number"]}>{item.amount}</p>

                        <motion.div whileTap={{scale:0.75}} onClick={()=>onAddCart(item)}>
                            <BiPlus style={{color:"rgb(249 250 251)"}}></BiPlus>
                        </motion.div>
                    </div>

                   </div>
                   ))}
                   
                </div>
                   {/* cart total */}
                <div className={classes["cart__bottom-total"]}>
                    <div className={classes["cart__bottom-total-1"]}>
                        <p className={classes["cart__bottom-total-text"]}>Sub total</p>
                        <p className={classes["cart__bottom-total-text"]}>{Cartctx.totalamount}$</p>
                    </div>
                    <div className={classes["cart__bottom-total-1"]}>
                        <p className={classes["cart__bottom-total-text"]}>Delivery</p>
                        <p className={classes["cart__bottom-total-text"]}> 0$</p>
                    </div>
                    <div className={classes["cart__bottom-total-border"]}></div>
                    <div className={classes["cart__bottom-total-1"]}>
                        <p className={classes["cart__bottom-total-bold"]}>Total</p>
                        <p className={classes["cart__bottom-total-bold"]}>{Cartctx.totalamount}$</p>
                    </div>
                    <Link to={"/Order"}>
                    <motion.button whileTap={{scale:0.75}} type="button" 
                    className={classes["cart__bottom-total-button"]}
      
                    >
                        CHECK OUT

                    </motion.button>

                    </Link>
                      
                </div>
            </div>

            ):
            <div className={classes["cart__empty"]}>
                <img src={empty} className={classes["cart__empty-img"]}  alt="empty cart"/>
                <p className={classes["cart__empty-p"]}>add Meals to your cart</p>

            </div>
            }
            

        </div>
        </>
    )
}
export default Cart;