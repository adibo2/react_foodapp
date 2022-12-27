import { collection, doc, getDocs, orderBy, setDoc } from "firebase/firestore"
import { firestore } from "../firebase.config"


export const saveitem=async (data)=>{
    //document date.now collectionid
    //merge in case of updating or adding a field in it
    await setDoc(doc(firestore,'Meals',`${Date.now()}`),data,{merge:true})
}

export const getitems=async (data)=>{
    //document date.now collectionid
    //merge in case of updating or adding a field in it
    const meals=await getDocs(collection(firestore,'Meals'),orderBy("id","desc"))
    return meals.docs.map((doc)=>doc.data());
}