import React from "react";
import css from "./Order.module.scss";
import {
  UilBill,
  UilBox,
  UilTruck,
  UilRestaurant,
} from "@iconscout/react-unicons";
import cooking from "./assets/cook.png";
import Onway from "./assets/onway.png";
import Spinner from "./assets/spinner.svg";
import Cartcontext from "./../store/Cartcontext";
import Usercontext from "../store/Usercontext";

import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";


const Order = () => {
    const [btn, setbtn] = useState(false);
    const [btn1, setbtn1] = useState(true);
    const [cook,setcook]=useState(false)
    const [way,setway]=useState(false);
    const Cartctx=useContext(Cartcontext);
    const Userctx=useContext(Usercontext);
    const [notif,Setnotif]=useState(false);
    const [deliver,setdelivered]=useState(false);

    // const notify = () => toast("Food delivered enjoy 😄");


    useEffect(() => {
        const timer = setTimeout(() => {
            setbtn(true);
            setcook(true)
        }, 4000);
        const timer2 = setTimeout(() => {
            setbtn1(false);
        }, 5000);
        const timer4 = setTimeout(() => {
            setbtn1(true);
            setway(true);

        }, 12000);
        const timer5 = setTimeout(() => {
          setdelivered(true)
          Setnotif(true);



      }, 15000);
        return () => clearTimeout(timer,timer2,timer4,timer5);
      }, []);




    const btnClasses = `${css["container__spinner"]} ${btn ? css.bump : ''}`;
    const btnClasses1 = `${css["container__spinner"]} ${btn1 ? css.bump : ''}`;

  return (
    <>
    <Link to={"/"}>
    <button className={css.btnorder}>Return</button>

    </Link>
     {/* <ToastContainer position="bottom-right"></ToastContainer>
      {notif && toast.success("Food delivered enjoy 😄",{position:"bottom-right"})} */}
    <div className={css.container} >
       
      <span className={css["container__heading"]}>Order in Process</span>

      <div className={css["container__details"]}>
        <div>
          <span>Order ID</span>
          <span>zekdskskdkzez</span>
        </div>
        <div>
          <span>Customer Name</span>
          <span>{Userctx.user.displayName}</span>
        </div>
        <div>
          <span>photo</span>
          <img src={Userctx.user.photoURL}></img>
        </div>
        <div>
          <span>Total</span>
          <span>{Cartctx.totalamount} $</span>
        </div>
      </div>
     

      <div className={css["container__statusContainer"]}>
        <div className={css["container__status"]}>
          <UilBill width={80} height={80}></UilBill>
          <span>Payement</span>
          <span className={css["container__status-btn"]}>On Delivery</span>
        </div>
        <div className={css["container__status"]}>
         
        
          <UilRestaurant width={80} height={80}></UilRestaurant>
          <span>Cooking</span>
              <div className={btnClasses}>
                <img src={Spinner} width={130} height={130}></img>
              </div>
              {cook && <span className={css["container__status-btn"]}>Cooking </span>}
        </div>

        <div className={css["container__status"]}>
          <UilTruck width={80} height={80}></UilTruck>
          <div className={btnClasses1}>
                <img src={Spinner} width={130} height={130}></img>
            </div>
          <span>On Way</span>
          {way && <span className={css["container__status-btn"]}>On the way </span>}

        </div>
        
        <div className={css["container__status"]}>
          <UilBox width={80} height={80}></UilBox>
          <span>Delivered</span>
          {deliver && <span className={css["container__status-btn"]}>On the way </span>}

        </div>
      </div>
    </div>
    </>
  );
};

export default Order;
