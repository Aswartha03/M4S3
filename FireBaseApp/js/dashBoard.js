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
    notesList.innerText=""
    onAuthStateChanged(auth,async(user)=>{
        if(user){
            currentUser = user 
            document.getElementById("user-email").innerText = currentUser.email 
            // fetch user role 
            let userDoc = await getDoc(doc(db,"Users",currentUser.uid))
            // matching document 
            if(userDoc.exists()){
                let role = userDoc.data().role  
                document.getElementById("user-role").innerText=role
                // load notes
                if(noteInput!=undefined){
                    loadNotes(user,role)
                } 
                
            }
        }
        else{
            // redirect if not logged in 
            window.location.href = "login.html"
        }
    })
 
    // load notes 
    async function loadNotes(user,role){
        notesList.innerText =""
        let notesRef = collection(db,"Notes")
        // fetch all the notes so every user can see all the notes
        let query = await getDocs(notesRef) 
         // whole document
        query.forEach((doc)=>{
            // console.log(doc)
            let notesData = doc.data()
            displayNotes(doc.id,notesData,user.uid,role)
        })
    }
    // displaying the notes
    function displayNotes(id,notes,uid,role){
        let notesdiv = document.createElement("div") 
        notesdiv.classList.add("note")
        // create elements 
        let noteContent = document.createElement("p")
        noteContent.innerText = notes.content

        let noteEmail = document.createElement("small")
        noteEmail.innerText=`By : ${notes.email }`
        notesdiv.append(noteContent,noteEmail)
        // only admin and owner should be able to edit and delete
        if(notes.userId===uid || role==="admin"){
            // edit button 
            let editBtn = document.createElement("button")
            editBtn.innerText="Edit"
            editBtn.classList.add("edit-btn");
            editBtn.onclick=()=>{
                let editTextArea = document.createElement("textarea") 
                editTextArea.value = noteContent.innerText
                // save btn  
                let saveBtn = document.createElement("button")
                saveBtn.innerText="Save"
                saveBtn.classList.add("save-btn")
                saveBtn.onclick=async()=>{
                    let newContent = editTextArea.value.trim()
                    if(newContent !=="") {
                        await setDoc(doc(db,"Notes",id),{...notes,content:newContent})
                        noteContent.innerText=newContent 
                        notesdiv.replaceChild(noteContent,editTextArea)
                        notesdiv.replaceChild(editBtn,saveBtn)
                    } 

                }
                // replace for editing
                notesdiv.replaceChild(editTextArea,noteContent)
                notesdiv.replaceChild(saveBtn,editBtn)
            }

            // delete btn 
            let deleteBtn = document.createElement("button")
            deleteBtn.innerText = "Delete"
            deleteBtn.classList.add("dlt-btn")
            deleteBtn.onclick = async()=>{
                await deleteDoc(doc(db,"Notes",id));
                notesdiv.remove()
            }
            notesdiv.append(editBtn)
            notesdiv.append(deleteBtn)
        }

        notesList.appendChild(notesdiv)
    }
    // add notes 
    addBtn.addEventListener("click",async()=>{
        let content = noteInput.value.trim() // textarea 
        if(content === "") return 
        await addDoc(collection(db,"Notes"),{
            content,
            userId:currentUser.uid,
            email:currentUser.email,
            createdAt:new Date()
        })
        noteInput.value="" 
        loadNotes(currentUser,document.getElementById("user-role").innerText)

    })
});