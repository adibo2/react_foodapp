import {getApp,getApps,initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDLTwl1FHMG7yzUfb14kSZdafbi1c2Md-4",
    authDomain: "reactfoodapp-3dff8.firebaseapp.com",
    databaseURL: "https://reactfoodapp-3dff8-default-rtdb.firebaseio.com",
    projectId: "reactfoodapp-3dff8",
    storageBucket: "reactfoodapp-3dff8.appspot.com",
    messagingSenderId: "357826282636",
    appId: "1:357826282636:web:fa2c816224e843621867a9",
    measurementId: "G-Q2FD2ZTH84"
  };

  //intialize firebase app
const app=getApps.length>0 ? getApp() : initializeApp(firebaseConfig)

//get db information
const firestore=getFirestore(app)
const storage=getStorage(app);
  

export {app,firestore,storage};