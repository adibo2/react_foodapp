import burger from "./img/burgerr.png";
// import fruit from "./img/fruit5.png";
import ice from "./img/icee.png";
import pizza from "./img/pizza5.png";
import {FaPizzaSlice} from 'react-icons/fa';
import {IoIceCream} from 'react-icons/io5';
import {GiTacos} from 'react-icons/gi'
import {GiHamburger} from 'react-icons/gi'
import {GiFruitBowl} from 'react-icons/gi';
import {IoFastFoodSharp} from 'react-icons/io5'
import vege from "./img/vegetables.png";
import fruit from "./img/f7.png";

//fruit
import banane from "./img/ba.png"

//burger*********
import burger1 from "./img/burger2.jpg";
//chiken
import chiken from "./img/c1.png"
import chiken1 from "./img/c2.png"
import chiken2 from "./img/c3.png"
import chiken3 from "./img/c4.png"
import chiken4 from "./img/c6.png"
import chiken5 from "./img/cu5.png"



/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 */


 export const categories=[{
    id:'1',
    name:'chiken',
    param:'chiken',
    icon:<IoFastFoodSharp></IoFastFoodSharp>
   },
   {
    id:'2',
    name:'icecream',
    param:'icecream',
    icon:<IoIceCream></IoIceCream>
   },
   {
    id:'3',
    name:'Burger',
    param:'Burger',
    icon:<GiHamburger></GiHamburger>
   },
   {
    id:'4',
    name:'pizaa',
    param:'pizza',
    icon:<FaPizzaSlice></FaPizzaSlice>
   },
   {
    id:'5',
    name:'fruits',
    param:'fruits',
    icon:<GiFruitBowl></GiFruitBowl>
   },
   {
      id:'6',
      name:'vegetables',
      param:'vegetables',
      icon:<img src={vege} style={{width:"65%"}}></img>

   }

]
export const plats=[
{ id:'1',type:'fruits',name:'banane',calories:'80 calories',price:4.00,img:banane},
{id:'2',type:'Burger',name:'burger lamane',calories:'300 calories',price:40.5,img:burger1},
{id:'3',type:'pizza',name:'pizza omar',calories:'300 calories',price:3},
/* {id:'4',type:'fruits',name:'fruit',calories:'300 calories',price:'40.00$'},
 */
//chiken
{id:'5',type:'chiken',name:'chiken Nugget',calories:'30 calories',price:4.00,img:chiken},
{id:'6',type:'chiken',name:'chiken sauce',calories:'90 calories',price:9.00,img:chiken1},
{id:'7',type:'chiken',name:'big chiken',calories:'50 calories',price:12.00,img:chiken2},
{id:'8',type:'chiken',name:'fried chiken',calories:'10 calories',price:3.00,img:chiken3},
{id:'9',type:'chiken',name:'chiken drumstic',calories:'200 calories',price:22.00,img:chiken4},
{id:'10',type:'chiken',name:'Dhaba chikenit',calories:'40 calories',price:33.00,img:chiken5},


]
export const food_pres=[
   {id:'1',name:'Burger',descr:'triple cheeseburger lamane',price:'4.2',img:burger},
   {id:'2',name:'Fruit',descr:' Natural grapeOmar',price:'2',img:fruit},
   {id:'3',name:'Icecream',descr:'Banana icecream',price:'2',img:ice},
   {id:'4',name:'Pizza',descr:'pizza peperonni',price:'5.5',img:pizza}

]