import classes from "./About.scss"
import burger from "./../img/burger.jpg"
import pizza from "./../img/pizza.jpg"
import glaces from "./../img/glace.jpg";
import fruit from "./../img/fruitt.png"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link as LinkS } from 'react-scroll';
import { Link } from "react-router-dom";


import { useContext, useEffect } from "react";
import { app } from "../firebase.config";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Fireworks } from '@fireworks-js/react'
import Usercontext from "../store/Usercontext";
gsap.registerPlugin(ScrollTrigger);


const About=()=>{

    const userctx=useContext(Usercontext);
    const {user}=userctx;
    const auth = getAuth(app);
    const provider=new GoogleAuthProvider();
    const chek=async ()=>{
        if(!user){
            const {user:{providerData}}=await signInWithPopup(auth,provider);
            /*             const response=await signInWithPopup(auth,provider);
             */            console.log(providerData); 
            
                        userctx.login(providerData[0])
                        localStorage.setItem("user",JSON.stringify(providerData[0]))

        }                    
       

    }

    useEffect(()=>{
        const ctx=gsap.context(()=>{
            gsap.from(".About__image",{y:200,opacity:0,duration:0.8,ease:"power3.out",
            scrollTrigger:
            {trigger:".About__image",markers:false,start:"-75% 70%",transformOrigin:"center center",end:"85% 30%",
            toggleActions:"play reverse play reverse"}})

            gsap.from(".About__text",{y:200,opacity:0,duration:0.8,transformOrigin:"center center",ease:"power3.out",
            scrollTrigger:
            {trigger:".About__text",markers:false,start:"-75% 70%",end:"85% 30%",
            toggleActions:"play reverse play reverse"
        }})
            
            
        })
        return ()=>ctx.revert();

    },[])
    return(
        <>
        <div className="About__image" id="about">
            <div className="About__image-composition">
            <img src={burger} className="About__image-composition-1 About__image-composition-photo" alt="Meal_presentation"/>
            <img src={pizza} className="About__image-composition-2 About__image-composition-photo" alt="Meal_presentation"/>
            <img src={glaces} className="About__image-composition-3 About__image-composition-photo" alt="Meal_presentation"/>
            <img src={fruit} className="About__image-composition-4 About__image-composition-photo" alt="Meal_presentation"/>                              
            </div>   
        </div>
        <div className="About__text">
            <h2 className="About__text-h2">Why us ?</h2>
            <h6 className="About__text-h6">&ldquo;Food delivery has now become an integral part of the urban lifestyle.&ldquo;</h6>
            <p className="About__text-p">get a quick and easy meal and fruits or vegetables.By chosing our avaible list of fresh fruits and tasty meals 
               or adding a new meal of your choice with a picture of your choice
                .Finally you can get your food delivered to your door with free shipping
            </p>
            <div className="About__text-link">
            <LinkS className="About__text-link-button" to="menu" spy={true} smooth={true} offset={80} duration={1500}>
                    Menu
            </LinkS>
{/*             <a href="#" className="About__text-link-button">Menu</a>
 */}            
            <Link onClick={()=>chek()} className="About__text-link-button" to="/Createmeal"  offset={180} duration={1500}>
            Add Meal
         
            </Link>

            </div>
        </div> 


        
        </>
    )

}
export default About;