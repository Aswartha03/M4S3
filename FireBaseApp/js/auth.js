// code  

import { auth, db } from "./firebase-config.js"
import {signOut,signInWithEmailAndPassword,onAuthStateChanged,createUserWithEmailAndPassword} 
from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js" ;

import {getDoc,setDoc,doc,collection} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js" 

//  code should be write after our page open 
document.addEventListener("DOMContentLoaded",()=>{
    // all the data is loaded 

    let loginBtn = document.getElementById("login-btn")
    let signUpBtn = document.getElementById("signup-btn")
    let logOutBtn = document.getElementById("logout-btn")

    // checking whether login btn is loaded or not ad have data or not
    if(loginBtn){
        loginBtn.addEventListener("click",async()=>{
            let email = document.getElementById("login-email").value 
            let password =  document.getElementById("login-password").value 
            
            try {
                await signInWithEmailAndPassword(auth,email,password) 
                 // redirect the user to dashboard page 
                 window.open("dashBoard.html","_blank")
            } catch (error) {
                document.getElementById("login-message").innerText=error.message 
            }
        })
    }
    if(signUpBtn){
        signUpBtn.addEventListener("click",async()=>{
            // console.log("Aswartha")
            let email = document.getElementById("signup-email").value 
            let password =  document.getElementById("signup-password").value 
            let userRole = document.getElementById("role").value 
            // console.log("hello")
            try {
                let userData = await createUserWithEmailAndPassword(auth,email,password) 
                let user = userData.user 
                // sending data to firestore
                await setDoc(doc(db,"Users",user.uid),{
                    email:user.email,
                    role:userRole
                }) 
                // redirect to login page
                window.location.href="login.html" 
                // window.open("login.html","_blank")
            } catch (error) {
                document.getElementById("signup-message").innerText = error.message  
            }
        })
    }
    if(logOutBtn){
        logOutBtn.addEventListener("click",async()=>{
            await(signOut(auth));
            window.location.href = "login.html"
        })
    }

})