// export default useAlan
import { useEffect, useState, useCallback, useContext } from "react";
import Cartcontext from "../store/Cartcontext";
import alanBtn from "@alan-ai/alan-sdk-web";
import Usercontext from "../store/Usercontext";
// import { useCart } from "../context/CartContext"
// import storeItems from "../items.json"

const COMMANDS = {
  OPEN_CART: "open-cart",
  CLOSE_CART: "close-cart",
  ADD_ITEM: "add-item",

};

export default function useAlan() {
  const [alanInstance, setAlanInstance] = useState();
  const [input, setInput] = useState("");
  const [removeInput,SetremoveInput]=useState("");

  const Cartctx = useContext(Cartcontext);
  const { items } = useContext(Cartcontext);
  const [inputQuantity, setInputQuantity] = useState()
  const { meals } = useContext(Usercontext);
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);


  const { showCartItems, setShowCartItems } = useContext(Cartcontext);

  // const addItems = (product) => {
  //   setCartItems([...cartItems, product]);
  // };
  // const removeItems = (product) => {
  //   setCartItems([...cartItems, product]);
  // };
//   Cartctx.additem({
//     id:plat.id,
//     name:plat.title,
//     calories:plat.calories,
//     qty:count,
//     img:plat.imageUrl,
//     price:plat.price,
// })
  

  console.log("input " + input);
  console.log("cartt items "+ cartItems);

  console.log("meals"+meals)

  const openCart = useCallback(() => {

    if (items.length === 0) {
      alanInstance.playText("You have no items in your Cart");
    } else {
      setShowCartItems(true);
      alanInstance.playText("Opening Cart");
    }
  }, [alanInstance, setShowCartItems, items]);
  const closeCart = useCallback(() => {
    // if (items.length === 0) {
    //   alanInstance.playText("You have no items in your cart");
    // } else {
    //   alanInstance.playText("Closing cart");
    //   setShowCartItems(false);
    // }
    alanInstance.playText("Closing cart");
    setShowCartItems(false);
  }, [alanInstance, setShowCartItems, items]);


  // const addItem = useCallback(
  //   ({ detail: { name, quantity } }) => {
  //     console.log(name.toString())
  
  //      meals.filter((item)=>{
  //       if(item.title.toLowerCase() === name.toString()){
  //         alanInstance.playText(
  //           `Add ${quantity} of the ${name} item to your cart`
  //         )
  //         Cartctx.additem({...item})

  //       }
    
  //      })
   

  //   },
  //   [alanInstance, Cartctx]
  // )

  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_CART, openCart);
    window.addEventListener(COMMANDS.CLOSE_CART, closeCart);
    // window.addEventListener(COMMANDS.ADD_ITEM, addItem)


    return () => {
      window.removeEventListener(COMMANDS.OPEN_CART, openCart);
      window.removeEventListener(COMMANDS.CLOSE_CART, closeCart);
      // window.removeEventListener(COMMANDS.ADD_ITEM, addItem)

    };
  }, [openCart, closeCart]);
  // useEffect(()=>{
  //   if(alanInstance){
  //     alanInstance.playText("hello Im your voice assistant created by Adib im here to assist you to open Cart or close the cart or adding product avaible to your cart yust give me a call");
  //   }

  // },[alanInstance,addItem])

 

  useEffect(() => {
    if (alanInstance != null) return;

    setAlanInstance(
      alanBtn({
        key: "dacad494fe7b8bd32536900c46abc69b2e956eca572e1d8b807a3e2338fdd0dc/stage",
        zIndex: 10,
        onCommand: ({ command, payload }) => {
          window.dispatchEvent(new CustomEvent(command, { detail: payload }))
          if(command === 'add-item'){
            setInput(payload.name);
            setInputQuantity(payload.quantity);
            
          }
          if(command === 'removecart'){
            SetremoveInput(payload.data)
          }
        }
       
      })
    );


  }, []);
  useEffect(() => { 
      meals.filter((product) => {
        if (product.title.toLowerCase() === input) {
          // return { ...product };

          // console.log("product: " + {...product.map((product) =>product)})
          
          alanInstance.playText(
            `Add ${input} of the ${inputQuantity} item to your cart`
            )
            Cartctx.items.map((am)=>(
              am=inputQuantity
            ))
            
            Cartctx.addAI({
              id:product.id,
              name:product.title,
              calories:product.calories,
              img:product.imageUrl,
              price:product.price,
              amount:inputQuantity,
              qty:inputQuantity,
            },inputQuantity)
        }
      })[0]
      
   
  }, [input,inputQuantity]);
  useEffect(() => { 
    meals.filter((product) => {
      if (product.title.toLowerCase() === removeInput) {
        // return { ...product };

        // console.log("product: " + {...product.map((product) =>product)})
        
        // alanInstance.playText(
        //   `removed ${removeInput} from your cart`
        //   )
        
          
         Cartctx.removeAI(product.id)

      }
    })[0]
    
 
}, [removeInput]);

  return null;
}

// p.play({
//   command: 'cart',
//   data:p.item.value
// })
// p.play(`${p.item.value} added`)      
// }
// else{
// p.play(`Please Pick item`)
// }
