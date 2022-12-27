import React, { useContext } from 'react'
import "./Header.scss"
import header_photo from "./../img/food1.jpg"
import awards from "./../img/awards.png"
import awards1 from "./../img/awards1.jpg"
import award2 from "./../img/awards2.png"
import burger from "./../img/burgerr.png";
import ice from "./../img/icee.png";
import {MdShoppingBag} from "react-icons/md";

import pizza from "./../img/pizza1.jpg";
import fruit from "./../img/f7.png";

import { useRef,useEffect } from "react"
import { gsap } from "gsap";
import {food_pres} from "./../data"
import "./Pres.scss";
import Cartcontext from '../store/Cartcontext'
const Pres = (props) => {

    const cartctx=useContext(Cartcontext);


    useEffect(()=>{
        const ctx=gsap.context(()=>{
            gsap.from(".header__photo-card",{stagger:0.7,scale:2,opacity:0,transformOrigin:"center center",duration:0.7})          
        })
        return ()=>ctx.revert();
    },[])
    const clickhandler=(food)=>{
        cartctx.additem({
            id:food.id,
            name:food.descr,
            img:food.img,
            price:food.price,

        })

    }


  return (
    <>
    <div className="header__photo">
        <h1 className='header__photo-h1'>top Collection</h1>
        <div className="header__photo-grid">

    {food_pres.map((food)=>(
    <div className="header__photo-card" key={food.id}>
        <img src={food.img} className="header__photo-card-img" alt="food products" />
        <div className="header__photo-card-cart" onClick={()=>clickhandler(food)}>
        <MdShoppingBag size="13rem" className="header__photo-card-cart_icon"></MdShoppingBag>
        </div>

        <p className="header__photo-card-title">{food.name}</p>
        <p className="header__photo-card-id">{food.descr} </p>                 
        <p className="header__photo-card-price">
        {food.price}<span className="header__photo-card-price-m">$</span>               
        </p>                  
       
    </div>
    ))}

        </div>
      
            
</div>
    
    </>
  )
}

export default Pres