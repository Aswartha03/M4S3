import { auth, db } from "./firebase-config.js"
import {signOut,signInWithEmailAndPassword,onAuthStateChanged,createUserWithEmailAndPassword} 
from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js" ;

import {getDoc,setDoc,doc,collection,addDoc,deleteDoc,getDocs} 
from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js" 

document.addEventListener("DOMContentLoaded",async()=>{
     let notesList = document.getElementById("notes-list")
     let noteInput = document.getElementById("note-input")
     let addBtn = document.getElementById("add-btn") 

    let currentUser = null ; 
    onAuthStateChanged(auth,async(user)=>{
        if(user){
            currentUser = user 
            document.getElementById("user-email").innerText = currentUser.email 
            // fetch user role 
            let userDoc = await getDoc(doc(db,"Users",currentUser.uid))
            if(userDoc.exists()){
                let role = userDoc.data().role 
                document.getElementById("user-role").innerText=role
                // load notes 
                loadNotes(user,role)
            }
        }
        else{
            // redirect if not logged in 
            window.location.href = "login.html"
        }
    })

    // load notes 
    async function loadNotes(user,role){
        notesList.innerHTML =""
        let notesRef = collection(db,"Users")
        // fetch all the notes so evry user can see all the notes
        let query = await getDocs(notesRef) 
        query.forEach((doc)=>{
            let noteData = doc.data()
            displayNotes(doc.id,noteData,user.uid,role)
        })
    }
    function displayNotes(id,notes,uid,role){
        let div = document.getElementById("div") 
        div.classList.add("note")
        div.innerHTML=`
        `
    }
})