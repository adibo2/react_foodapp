import "./Header.scss"
import header_photo from "./../img/food1.jpg"
import awards from "./../img/awards.png"
import awards1 from "./../img/awards1.jpg"
import award2 from "./../img/awards2.png"
import burger from "./../img/burgerr.png";
import fruit from "./../img/fruit2.jpg";
import ice from "./../img/icee.png";
import pizza from "./../img/pizza1.jpg";
import { useRef,useEffect } from "react"
import { gsap } from "gsap";
import { Link as LinkS } from 'react-scroll';

import {food_pres} from "./../data"


const Header=()=>{
    const title=useRef();
    const texte=useRef();
    const button=useRef();
    const win=useRef();
  /*   useEffect(()=>{
        const ctx=gsap.context(()=>{
            gsap.from(".header__photo-card",{stagger:0.7,scale:2,opacity:0,transformOrigin:"center center",duration:0.7})          
        })
        return ()=>ctx.revert();
    },[]) */
    useEffect(()=>{
        const ctx=gsap.context(()=>{
            gsap.timeline({defaults:{ease:"back", opacity:0,duration:0.5}})
            .from(title.current,{x:-80})
            .from(texte.current,{x:80})
            .from(button.current,{y:100})
            .from(win.current,{x:80})
            .from(".header__texte-logos img",{stagger:0.3,scale:2})         
        })
        return ()=>ctx.revert();
    },[])
    return(
        <>
            <div className="header__texte" id="header">
                <h1 className="header__texte-h1" ref={title}>DElicious food for your cravings</h1>
                <p className="header__texte-p" ref={texte}>we make fresh and healthy meals with different recipes by your choice</p>
                <LinkS  to="menu" spy={true} smooth={true} offset={80} duration={1500}>
                <button className="header__texte-btn" ref={button}>Menu</button>
               </LinkS>
                <div className="header__texte-win" ref={win}>Winner of</div>
                <div className="header__texte-logos">
                <img src={awards} className="header__texte-logos-log" alt="food awards delivery" />
                <img src={awards1} alt="food awards delivery" />
                <img src={award2} alt="food awards delivery" />
                </div>
            </div>



            {/* <div className="header__photo">
                {food_pres.map((food)=>(
                <div className="header__photo-card" key={food.id}>
                    <img src={food.img} className="header__photo-card-img"></img>
                    <p className="header__photo-card-title">{food.name}</p>
                    <p className="header__photo-card-id">{food.descr} </p>                 
                    <p className="header__photo-card-price">
                    {food.price}<span className="header__photo-card-price-m">$</span>               
                    </p>                  
                   
                </div>
                ))}

                           
            </div> */}

               
        </>

      
            
             
        


    )
}
export default Header;