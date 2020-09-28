import firebase from "firebase/app";
import "firebase/database";
const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DB,
  projectId: process.env.REACT_APP_PID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_SID,
  appId: process.env.REACT_APP_APPID,
};
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const jobsRef = databaseRef.child("jobs");
export const companiesRef = databaseRef.child("companies");
export default firebase;
