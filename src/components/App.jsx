import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import myNotes from "./notes"
import CreateArea from "./CreateArea";
import Axios from "axios";
//import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setName] = useState("")
  const [content, setEmail] = useState("")
  const [color, setColor]= useState("#f5ba13");

    function changeColor(event){
      setColor(event.target.value)
      console.log("kolor:" + color);
    }


  useEffect(() => {
    Axios.get("https://keeper-back-end.vercel.app/getNotes").then((response) => {
      setNotes(response.data)
      
    })
    
  },[])
  
  
  // const addNote = ()=> {
  //   Axios.post("http://localhost:3001/createNote", {title: title, content: content}).then((response)=>{
  //     setNotes([...notes], {title: title, content: content})
  //   } )
  // }


  function addNote(newNote) {
    Axios.post("https://keeper-back-end.vercel.app/createNote", {title: newNote.title, content: newNote.content}).then((response)=>{
    
      Axios.get("https://keeper-back-end.vercel.app/getNotes").then((response) => {
        setNotes(response.data)});
  });
      
    
  }


  function deleteNote(id) {

    

 Axios.post("https://keeper-back-end.vercel.app/deleteNote", {_id:id}).then((response)=>{
  setNotes(prevNotes => {
    return prevNotes.filter((noteItem, index) => {
      return noteItem._id !== id;
    });
    });
   
    });
  }

  return (
    <div id="mainConteiner">
      <Header currentColor={color} colorFunction={changeColor}/>
      <CreateArea onAdd={addNote} currentColor={color} />
      <div id="growingItem">
      <div id="notes">
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            currentColor={color}
          />
        );
      })}
      <div  id="last"  > </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
