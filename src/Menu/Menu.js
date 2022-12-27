import Filter from "./Filter";
import Item from "./Item";
import classes from "./Menu.scss"
import { plats } from "../data";
import { useContext, useEffect, useState,useRef } from "react";
import { gsap } from "gsap";
import { categories } from "../data";
import Cartcontext from "../store/Cartcontext";
import { filtercontext } from "./../store/Cartcontext";
import ReactPaginate from 'react-paginate';
import "./../UI/page.scss"
import { async } from "@firebase/util";
import enter from "./Enter.mp3"
import notfound from "./../img/notfound.webp";
import Usercontext from "../store/Usercontext";

const Menu=()=>{

    const [filter,Setfilter]=useState("chiken");
    const [count,Setcount]=useState(1);
    const [pagenumb, Setpagenumb] = useState(0);
    const produitparpage = 8;
    const [items, setItems] = useState([]);
    const pagevisite = pagenumb * produitparpage;

    

    const Cartctx=useContext(Cartcontext);
    const food=useContext(Usercontext);
    

    const filterhandler=(type)=>{
        console.log("type of food" + type)
        Setfilter(type);
    }
    
    const clickhandler=async(plat)=>{
        console.log("item"+plat)
        Setcount(count+1);
        console.log("count play"+count)
        
        var audio =new Audio(enter);
        audio.type = "audio/mp3";
        await audio.play();
        Cartctx.additem({
            id:plat.id,
            name:plat.title,
            calories:plat.calories,
            // qty:count,
            img:plat.imageUrl,
            price:plat.price,
        },count)
        // setItems([...Cartctx.items])
        console.log("dldsld"+items);
        
    }
  
    // useEffect(() => {
    //     Cartctx.additem();
    //   }, [items]);

    const changepage = ({ selected }) => {
        Setpagenumb(selected);
    }

    const filterfood=food.meals.filter(plat=>{
        return plat.category===filter;
    })
    const produit_data = filterfood.slice(pagevisite, pagevisite + produitparpage)
    const pageCount = Math.ceil(filterfood.length / produitparpage);



    return(
       
        <filtercontext.Provider value={{filter}}>
        <div className="Menu" id="menu">
        <Filter filter={filter} onAdd={filterhandler} categories={categories}></Filter>
        
            <div className="item__filter">
            {produit_data.length>0 ? produit_data.map((plat)=>(
                <Item key={plat.id} name={plat.title} calories={plat.calories} price={plat.price} img={plat.imageUrl} onClick={()=>clickhandler(plat)}></Item>        
        )):<div className="item__filter-notfound">
            <img src={notfound} className="item__filter-notfound-img" alt="food not found"/>
            <p className="item__filter-notfound-p">Items not avaible</p>
            </div>}

            </div>
{/*         {filterfood.map((plat)=>(
                <Item key={plat.id} name={plat.name} calories={plat.calories} price={plat.price} img={plat.img} onClick={()=>clickhandler(plat)}></Item>        
        ))} */}
        <div className="produits-pagination">
        <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={pageCount}
        onPageChange={changepage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        />
        </div>
                      
        </div>
        </filtercontext.Provider>
        
        
    )

}
export default Menu;

