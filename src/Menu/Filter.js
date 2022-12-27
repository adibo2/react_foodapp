import classes from "./Filter.module.scss"

import { categories } from "../data";
import { useContext, useRef, useState } from "react";
import "./../store/Cartcontext"
import { filtercontext } from "./../store/Cartcontext";


const Filter=(props)=>{
    
    //rgba(256,256,256,0.6)
   
    const handlefilter=(categorie)=>{
        console.log("categrie"+categorie.param)
        props.onAdd(categorie.param)

    }

    return(
        <div className={classes.filter}>
            <div className={classes["filter__titre"]}>
                <p>Our listes of foods</p>
                
            </div>
            <div className={classes["filter__pres"]}>
                {props.categories.map((categorie)=>(
                <div key={categorie.id}  className={`${classes["filter__pres-Card"]} 
                ${props.filter === categorie.param ? classes["Card-valid"]: ''}`}
                onClick={()=>handlefilter(categorie)}
                >

                    <div className={`${classes["filter__press-Card_content"]} 
                    ${props.filter === categorie.param ? classes.yes : ''}`}>
                       {/*  <GiHamburger className={classes["filter__press-Card-content-icon"]}></GiHamburger> */}
                       {categorie.icon}
                    </div>
                    <p className={`${classes["filter__pres-Card-p"]}
                    ${props.filter === categorie.param ? classes["valid-p"] : ''}
                    `}>{categorie.name}</p>
                </div>
                ))}
            </div>
            
           
        </div>
    )

}
export default Filter;
/*                 <div className={classes["filter__pres-Card"]}>
                    <div className={classes["filter__press-Card-content"]}>
                    </div>
                </div>  */                       