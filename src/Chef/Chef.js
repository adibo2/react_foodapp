import React, { useLayoutEffect } from 'react'
import "./Chef.scss";
import test from "./../img/burger2.jpg"
import classes from "./../Menu/Filter.module.scss";
import chef1 from "./../img/chef1.jpg";
import chef2 from "./../img/chef2.png";
import chef3 from "./../img/chef3.jpg";
import chef4 from "./../img/chef4.jpg";
import chef5 from "./../img/chef4 2.jpg";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger);


const Chef = () => {


  useEffect(()=>{
    const ctx=gsap.context(()=>{
       gsap.from(".chef__img .chef__img-flex",{y:100,opacity:0,stagger:0.5,scrollTrigger:{
        trigger:".chef__img-flex",
        start:"-100% 80%",
        end:"10% 40%",
        markers:false,
     

       }})
        
    })
    return ()=>ctx.revert();

},[])

  
  return (
    <div className='chef' id="about">
      <div className='chef_flex'>
         <div className={classes["filter__titre"]}>
                <p>Meet our chefs</p>              
          </div>
        <div className='chef__img'>
          <div className='chef__img-flex'>
            <img src={chef5} className='ll' />
            <div className='info'>
            <h3>mohamed oubibi</h3>
            <h5>Chef</h5>

            </div>



          </div>
          <div className='chef__img-flex'>
            <img src={chef2} />
            <div className='info'>

            <h3>christina hamid</h3>
            <h5>Chef</h5>

            </div>


          </div>
          <div className='chef__img-flex'>
            <img src={chef3} />
            <div className='info'>
            <h3>omar lamani</h3>
            <h5>Chef</h5>


            </div>



          </div>
          <div className='chef__img-flex'>
            <img src={chef4} />
            <div className='info'>

            <h3>Adil zone</h3>
            <h5>Security and ?</h5>
            </div>

          </div>
        </div>
       
      </div>
    </div>
  )
}

export default Chef