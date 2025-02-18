

import { defineNuxtPlugin } from "#app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_Va8LZp6Mbm8x62Q-r3C9qtkXmX7iIt0",
  authDomain: "poll-management-d1b02.firebaseapp.com",
  projectId: "poll-management-d1b02",
  storageBucket: "poll-management-d1b02.firebasestorage.app",
  messagingSenderId: "860843080247",
  appId: "1:860843080247:web:cbf53dcf355aa94c459db2"
};


export default defineNuxtPlugin((nuxtApp)=>{
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const db = getFirestore(app)
    nuxtApp.provide('auth',auth)
    nuxtApp.provide('db',db)
    
})