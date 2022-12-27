
import  "./Navbar.scss"
import {AiOutlineShoppingCart} from "react-icons/ai";
import {GiFoodTruck} from "react-icons/gi"
import { useContext, useEffect, useRef, useState } from "react";
import { app } from "../firebase.config";
import { gsap } from "gsap";
import Cartcontext from "../store/Cartcontext";
import {FiLogOut} from "react-icons/fi";
import {MdAdd} from "react-icons/md"
import avatar from "./../img/avatar.jpg";
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import Usercontext from "../store/Usercontext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { Link as LinkS } from 'react-scroll';



const Navbar=(props)=>{
    const logo=useRef();
    const bar=useRef();
    const Cartctx=useContext(Cartcontext);    
    const Userctx=useContext(Usercontext);
    const {items}=Cartctx;
    // const {user}=Userctx;
    const [menu,Setmenu]=useState(false);


    const [highlight, Sethighlight] = useState(false);
    const btnClasses = ` ${highlight ? "bump" : ''}`;
    useEffect(()=>{
        if (items.length === 0) {
            return;
        }
        Sethighlight(true);
        const timer = setTimeout(() => {
            Sethighlight(false);
        }, 300);
      
        return () => {
            clearTimeout(timer);
        };


    },[items])

    const auth = getAuth(app);
    const provider=new GoogleAuthProvider();



    const login= async () => {
        try{
            if(!Userctx.user){
                console.log("sdps"); 
                const {
                    user: { refreshToken, providerData },
                  } = await signInWithPopup(auth, provider);
               /*   const response=await signInWithPopup(auth,provider);
                 console.log(response.user.photoURL) */
               
    
                Userctx.login(providerData[0])
                console.log("data"+Userctx.user)
                localStorage.setItem("user",JSON.stringify(providerData[0]))
    
            }
            else{
                Setmenu(!menu)
            }   
        }catch (error) {
            console.log(error);
          }
       
    }
    const logout=()=>{
        Setmenu(false)
        localStorage.clear();
        Userctx.logout();
    }
   

    useEffect(()=>{
        const ctx=gsap.context(()=>{
            gsap.timeline()
            .from(".Navbar__logo",{y:-100,ease:"back",opacity:0})
            .from(".Navbar__items li",{y:-150,stagger:0.3,ease:"back"})
        })
        return ()=>ctx.revert();
    },[])

    return(
        <>
        <div className="Navbar">
            <div className="Navbar-fix">

            <a href="/" className="Navbar__logo" ref={logo}>
                <GiFoodTruck size="5rem"></GiFoodTruck>
            </a>
            <ul className="Navbar__items" ref={bar}>
                <li className="Navbar__item">
                <LinkS to="header" smooth={true} spy={true} offset={-150} duration={1500}>
                    Home
                </LinkS>
                    
                </li>
                <li className="Navbar__item" >
                    <LinkS to="about" smooth={true} spy={true} offset={-150} duration={1500}>
                    About
                    </LinkS>
                    
                </li>
                <li className="Navbar__item">
                <LinkS to="menu" smooth={true} spy={true} offset={80} duration={1500}>
                    Menu
                </LinkS>
                    
                </li>
                <li className={"Navbar__item"+btnClasses} onClick={props.onClick}>
                    <AiOutlineShoppingCart targetY="7rem"></AiOutlineShoppingCart>
                    {items && items.length>0 && (
                    <div className="Navbar__item-amount">
                    <p className="Navbar__item-amount-number">{items.length}</p>
                    </div>

                    )}
                </li>
                <li className="Navbar__item Navbar__item-drop"  style={{position:"relative"}}>
                    <motion.div whileTap={{scale:0.6}} onClick={login}>
                    <img  src={Userctx.user ? Userctx.user.photoURL : avatar} className="Navbar__item-login" alt="userauth" />

                    </motion.div>
                    {menu && <div className="Navbar__item-drop-login">
                        <Link to={"/Createmeal"}>
                        <p>NewMeal <MdAdd /></p>
                        </Link>
                        
                        <p onClick={logout}>Logout <FiLogOut /></p>
                    </div>}
                    

                </li>
            </ul>
            </div>
        </div>

        {/* Mobile$$$$$$$$$$$$$$$$$$$ */}

        <div className="Navbar__mobile">
        <div className="Navbar__mobile-fix">
            <div className="Navbar__mobile-cart"  onClick={props.onClick}>
                <AiOutlineShoppingCart size="4rem" targetY="7rem"></AiOutlineShoppingCart>
                {items.length>0 && (
                    <div className="Navbar__mobile-amount">
                    <p className="Navbar__mobile-amount-number">{items.length}</p>
                    </div>

                    )}
            </div>
            <a href="/" className="Navbar__logo" ref={logo}>
                <GiFoodTruck size="5rem"></GiFoodTruck>
            </a>
            <div style={{position:"relative"}}>
            <motion.div whileTap={{scale:0.6}} onClick={login} rel="noreferrer">
                    <img referrerPolicy="origin" src={Userctx.user ? Userctx.user.photoURL : avatar} className="Navbar__item-login" alt="userprofile" />
            </motion.div>
            {menu && <div className="Navbar__item-drop-login">  
                       <Link to={"/Createmeal"}>
                        <p>NewMeal <MdAdd /></p>
                        </Link>                
                        <ul className="Navbar__mobile-items">
                        <li className="Navbar__item" onClick={() => Setmenu(false)}>Home</li>
                        <li className="Navbar__item" >About</li>
                        <li className="Navbar__item">Menu</li>             
                        <p onClick={logout}>Logout <FiLogOut /></p>

                        </ul>

                    </div>}
                    
            </div>



        </div>
            
        </div>
        </>
    )

}
export default  Navbar;