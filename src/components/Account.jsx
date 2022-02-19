import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import myNotes from "./notes"
import CreateArea from "./CreateArea";
import Axios from "axios";
import LoginForm from "./LoginForm"

function Account(props) {
  const [notes, setNotes] = useState([]);
  const [title, setName] = useState("");
  const [content, setEmail] = useState("");
  const myAppUrl = props.myAppUrl;

  useEffect(() => {
    console.log("ID" + props.user.username)

    Axios.get(myAppUrl+"/getNotes"+ props.user._id).then((response) => {
      document.cookie = "user="+props.user.username;
      setNotes(response.data)
      
    })
    
  },[])
  
  function addNote(newNote) {
    
    Axios.post(myAppUrl+ "/createNote", {title: newNote.title, content: newNote.content, userID: props.user._id}).then((response)=>{
    
      Axios.get(myAppUrl+"/getNotes"+ props.user._id).then((response) => {
        setNotes(response.data)});
  });
      
  }


  function deleteNote(id) {

 Axios.post(myAppUrl +"/deleteNote", {_id:id}).then((response)=>{
  setNotes(prevNotes => {
    return prevNotes.filter((noteItem, index) => {
      return noteItem._id !== id;
    });
    });
   
    });
  }


  return (
    <React.Fragment>
    
      <CreateArea onAdd={addNote} currentColor={props.currentColor} />
      <div className="growingItem">
      <div id="notes">
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            currentColor={props.currentColor}
          />
        );
      })}
      <div  id="last"  > </div>
      </div>
      </div>
      <Footer />
    </React.Fragment>
  );
 } 
 


export default Account;
