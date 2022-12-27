
import React, { useContext, useState } from 'react'
import classes from "./Create.module.scss"
import "./../UI/button.scss"
import { motion } from "framer-motion"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { categories } from '../data';
import Loader from './Loader';
import {MdCloudUpload} from "react-icons/md"
import {MdDeleteForever} from "react-icons/md"
import burger from "./../img/burger.jpg";
import {MdOutlineFoodBank} from "react-icons/md"
import { Link } from 'react-router-dom';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { getitems, saveitem } from '../utils/Firebasefunc';
import Usercontext from '../store/Usercontext';
import { gsap } from "gsap";
import { useEffect,useRef } from 'react';
import {BiDollarCircle} from 'react-icons/bi'
import Input from './Input';





export const Create = () => {
  const [title,Settitle]=useState("");
  const [calories,Setcalories]=useState("");
  const [price,Setprice]=useState();
  const [category,Setgategory]=useState("Select Categorie");
  const [image,Setimage]=useState(null);
  const [fields,Setfields]=useState(false);
  const [alert,Setalert]=useState("danger")
  const [msg,Setmsg]=useState(null)
  const [loading,Setloading]=useState(false)
  //context
  const datactx=useContext(Usercontext);
  const create=useRef();

  useEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.from(create.current,{y:70,ease:"back",opacity:0,duration:1})
  })
  return ()=>ctx.revert();
  },[])

  const uploadimage=(e)=>{
    Setloading(true)
    const imagefile=e.target.files[0];
    console.log(imagefile);
    const storageref=ref(storage,`images/${Date.now()}-${imagefile.name}`)
    const upload=uploadBytesResumable(storageref,imagefile);
     upload.on(
      'state changed',(snapshot)=>{
        var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        console.log(percent + "% done");

      },(error)=>{
        console.log(error)
        Setfields(true);
        Setmsg("error while uploading")
        Setalert("danger")
        setTimeout(()=>{
          Setfields(false);
          Setloading(false);
        },4000)
      },()=>{
        getDownloadURL(upload.snapshot.ref).then(downoald=>{
          Setimage(downoald)
          Setfields(true)
          Setloading(false)
          Setalert('succes')
          Setmsg("Image uploades successfully")
          setTimeout(()=>{
            Setfields(false);
          
          },4000)

        })
      })

    
  }
  const deleteimage=()=>{
    Setloading(true)
    const deleteref=ref(storage,image)
    deleteObject(deleteref).then(()=>{
      Setimage(null)
      Setloading(false)
      Setfields(true)
      Setalert('succes')
      Setmsg("Image deleted successfully")
      setTimeout(()=>{
        Setfields(false);
      
      },4000)
    })

  }
  const save=()=>{
    try{
      if((!title || !image || !price || !category || !title)){
        Setfields(true)
        Setmsg("Fields required")
        Setalert("danger")
        setTimeout(()=>{
          Setfields(false);
        },4000)

      }
      else{
        const data={
          id:`${Date.now()}`,
          title:title,
          imageUrl:image,
          calories:calories,
          price:parseInt(price),
          category:category,
          amount:1        
        }
        saveitem(data)
        Setfields(true)
        Setloading(false)
        Setalert('succes')
        clearData()
        Setmsg("Data uploades successfully")
        setTimeout(()=>{
          Setfields(false);
        
        },4000)
      }

    }catch(error){
      console.log(error)
      Setfields(true);
      Setmsg("error while uploading")
      Setalert("danger")
      setTimeout(()=>{
        Setfields(false);
        Setloading(false);
      },4000)

    }
    fechdata();
    
  }

  const clearData=()=>{
    Settitle("")
    Setprice()
    Setimage(null)
    Setcalories("");
    Setprice("")
   
  }

  const fechdata=async ()=>{
    await getitems().then((data)=>{
      datactx.fetchmeals(data);
      console.log(data)
    })
  }

  return (
    <div className={classes.create} id="create">
      
     <div className={classes["create__bg"]} ref={create}>
        {fields && 
        <motion.p 
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
        className={`${classes["create__text"]} ${alert==="danger" ? classes["textinvalid"] : classes["textvalid"] }`}>
          {msg}
          </motion.p>
        }
        <div className={classes["create__bg-icon"]}>
          {/* <DriveFolderUploadOutlinedIcon style={{fontSize:"2rem",lineHeight: "2.2rem",color:"rgb(55,65,81);" }}></DriveFolderUploadOutlinedIcon> */}
         {/*  <input className={classes["create__bg-input"]} 
          type="text" value={title} 
          placeholder="Give us your meal idea" 
          onChange={(e)=>Settitle(e.target.value)}
          required /> */}
          <Input type="text" value={title} onChange={(e)=>Settitle(e.target.value)}
           titre="Meal" className={`${title ? "has-value" : ""}`}
           ></Input>
        </div>
        <div style={{width:"100%"}}>
          <select onChange={(e)=>Setgategory(e.target.value)} className={classes["create__bg-select"]}>
            <option className={classes["create__bg-option"]}>{category}</option>
            {categories.map((categorie)=>(
              <option key={categorie.id} value={categorie.param}>{categorie.name}</option>

            ))}
          </select>
       </div>



       {/* //**********imagess  ***************/ }
       <div className={classes["create__bg-img"]}>
        {loading ? <Loader></Loader> : <>
          {!image ? (
            <label className={classes["create__bg-img-label"]} >
              <div className={classes["create__bg-img-label_div"]}>
              <MdCloudUpload className={classes["create__bg-img-label-icon"]} ></MdCloudUpload>
              <p className={classes["create__bg-img-label_p"]}>click here to upload your desire</p>
              </div>
              <input type="file" id="imageFile" accept="image/*" onChange={uploadimage} style={{width:0,height:0}} />
            </label>
          ): (
            <>
            <div className={classes["create__bg-img-exist"]}>
              <img src={image} className={classes["create__bg-img-exist_pic"]} />
              <button type='button' className={classes["create__bg-img-exist_btn"]} onClick={deleteimage}>
                <MdDeleteForever style={{color:"#f7f7f7"}}></MdDeleteForever>

              </button>


            </div>
            </>
          )}
        </>}
       </div>
       {/*$$$$$$$$$$ galories $$$$$$$*/}
       <div className={classes["create__bg-info"]}>
        <div className={classes["create__bg-info_calories"]}> 
          <MdOutlineFoodBank className={classes["create__bg-info_calories-icon"]}></MdOutlineFoodBank>
          <input type="text"
          value={calories}
          onChange={(e)=>Setcalories(e.target.value)}
          placeholder='Calories' required 
          className={classes["create__bg-info_calories-input"]} />

        </div>
        <div className={classes["create__bg-info_calories"]}> 
          <BiDollarCircle className={classes["create__bg-info_calories-icon"]}></BiDollarCircle>
          <input type="text" placeholder='Price' 
          required 
          value={price}
          onChange={(e)=>Setprice(e.target.value)}
          className={classes["create__bg-info_calories-input"]}
           />

        </div>
       </div>

       {/* button */}
       <div className={classes["create__bg-btn"]}>

          <Link className="btn btn-white" onClick={save}> save details</Link>


       </div>



      </div>
    </div>
  )
}
