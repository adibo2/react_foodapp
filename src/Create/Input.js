import React from 'react'
import { useState } from 'react'
import "./Input.scss";

const Input = (props) => {
    const [value,Setvalue]=useState("");
    const handleChange=(e)=>{
        Setvalue(e.target.value)
    }
  return (
    <div className="ad-textbox">
      <input
        onChange={props.onChange}
        className={props.className}
        // className={`${value ? "has-value" : ""}`}
        id="textbox"
        type={props.type}
        
       
        value={props.value}
        required
      />
      {/* <span className="material-symbols-outlined">mail</span> */}
      <label htmlFor="textbox">{props.titre}</label>
      <div className="underline" />
    </div>
  )
}

export default Input