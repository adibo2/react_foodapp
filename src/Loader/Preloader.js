import React from 'react'
import { useEffect } from 'react'
import "./preloader.scss"
import {gsap} from 'gsap'
const Preloader = props => {
    useEffect(()=>{
        gsap.to('.preloader circle',{strokeDashoffset:392.68,repeat:-1,ease: "back(2)",stagger:1.5})


    },[])
  return (
    <div id="preloader-container">
    <p>Loading...</p>
    <svg class="preloader" x="0" y="0" width="250" height="250" viewBox="0 0 250 250" overflow="visible">
      <g>
        <circle cx="125" cy="125" r="125" stroke="white" strokeWidth="18"  strokeDasharray="80 312.69"></circle>
        <circle cx="125" cy="125" r="125" stroke="gray" strokeWidth="12" strokeDasharray="80 312.69"></circle>
        <circle cx="125" cy="125" r="125" stroke="white" strokeWidth="8" strokeDasharray="50 342.69"></circle>
      </g>
  
    </svg>
  </div>
  )
}

Preloader.propTypes = {}

export default Preloader