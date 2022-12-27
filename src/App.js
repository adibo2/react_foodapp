import './App.scss';
import Header from './Header/Header';
import Menu from './Menu/Menu';
import Footer from './footer/Footer';
import About from './About/About';
import Navbar from './Navbar/Navbar';
import CartProvider from './store/CartProvider';
import { useContext, useEffect, useState } from 'react';
import Cart from './Cart/Cart';
import UserProvider from './store/UserProvider';
import { Route,Routes } from 'react-router-dom';
import { Create } from './Create/Create';
import { getitems } from './utils/Firebasefunc';
import Usercontext from './store/Usercontext';
import Pres from './Header/Pres';
import Preloader from './Loader/Preloader';
import Chef from './Chef/Chef';
import burgr from "./img/c1.png"
import Order from './Order/Order';
import useAlan from './hooks/useAlan';
import Cartcontext from './store/Cartcontext';
import alanBtn from '@alan-ai/alan-sdk-web';

function App() {
  const home = [
    {
      id: 'e1',
      img: burgr,
    },
    {
      id: 'e2',
      img: burgr,
    },
    {
      id: 'e3',
      img: burgr,
    },
    {
      id: 'e4',
      img: burgr,
    },
    {
      id: 'e5',
      img: burgr,
    },
    {
      id: 'e6',
      img: burgr,
    }
  ]
  const [show,Setshow]=useState(false);
  const [loader,Setloader]=useState(true);
  const clickhandler=()=>{
    setShowCartItems(prev => !prev)

  }
  // useAlan();
  const datactx=useContext(Usercontext);
  const {showCartItems, setShowCartItems}=useContext(Cartcontext)
  const closehandler=()=>{
  
    setShowCartItems(prev => !prev)
  }
  const fechdata=async ()=>{
    await getitems().then((data)=>{
      datactx.fetchmeals(data);
      console.log(data)
    })
  }
  useEffect(()=>{
    setTimeout(()=>{
      Setloader(false)
    },2000)
  },[])
  useEffect(()=>{
    fechdata();
  },[])
  useAlan();

  return (

    
    loader ?  (<Preloader />):(

    <>
    <Routes>
      <Route path='/' element={ 

    <div className="container">
     
      <Navbar onClick={clickhandler}></Navbar>
      <Header></Header>
      <Pres></Pres>
      <About></About>
      <Chef maisons={home}></Chef>
      <Menu></Menu>
      <Footer></Footer>
      
      {showCartItems && <Cart onClick={closehandler}></Cart>}

      
    </div> 

      }
      >
      </Route>
    </Routes>

    <Routes>
      <Route path="/Createmeal" element={
        <>
        <Navbar></Navbar>
        <Create></Create>      
        </>
      } />
    </Routes>

    <Routes>
      <Route path="/Order" element={
        <>
        <div className='cont'>
        <Order></Order>

        </div>


        </>
      }
      />
    </Routes>

    </>
    ) 
    
    
    // {/* <Routes>
    //   <Route path='/' element={ 

    // <div className="container">
     
    //   <Navbar onClick={clickhandler}></Navbar>
    //   <Header></Header>
    //   <Pres></Pres>
    //   <About></About>
    //   <Menu></Menu>
    //   <Footer></Footer>
    //   {show && <Cart onClick={closehandler}></Cart>}

      
    // </div> 

    //   }>
    //   </Route>
    // </Routes>

    // <Routes>
    //   <Route path="/Createmeal" element={
    //     <>
    //     <Navbar></Navbar>
    //     <Create></Create>      
    //     </>
    //   } />
    // </Routes> */}
    
  );
}

export default App;
