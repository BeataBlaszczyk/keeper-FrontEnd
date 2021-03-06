import React, { useState, useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import myNotes from "./notes"
import CreateArea from "./CreateArea";
import Axios from "axios";
import LoginForm from "./LoginForm";
import Account from "./Account";


var currentUser = document.cookie.split('; ').find(row => row.startsWith('user'))?.split('=')[1];
//import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';



const myAppUrl = "https://keeper-back-end.vercel.app" //
//const myAppUrl = "http://localhost:3001" //

 function  App() {
 
 useEffect(()=> {

  setIsLoaded(false)
    
  if (currentUser){
     
      console.log("rerender whole app" + currentUser)
      Axios.post(myAppUrl+"/login", {username: currentUser, password: ""}).then((response)=>{
        console.log(response.data + "RESPONSE")
       if (typeof(response.data)=== 'string'){
          setLoginMsg(response.data)
        }else{
       // setUserID(response.data.id)
       setUser(response.data) 
       
        
        setColor(response.data.color)
        }
        setIsLogged(true)
        setIsLoaded(true)
      });

  }else{
    setIsLoaded(true)
  }
  
}, [])

const [isLoaded, setIsLoaded] = useState(false)
  const [isRegistered, setIsRegister] = useState(true)
  const [color, setColor]= useState("#f5ba13");
  const [isLogged, setIsLogged] = useState(false);
  const [userInDatabase, setUserInDatabes]=useState(false);
const [loginMsg, setLoginMsg] = useState("")

  const [user, setUser] = useState({
    username:"",
    password: "",
    color: color,
    _id: ""
});




  function changeColor(event){
    event ? setColor(event.target.value) : setColor(color);
    console.log(color + "---"+ event.target.value)
    setUser(prevUser => {
      return {
        ...prevUser,
        color: color
        
      }})
    

   
  }

  function userValidation(event){
const userName= event.target.value || "testowynieistniejacyuzytkownik"
    Axios.get(myAppUrl+"/getUser"+ userName).then((response) => {
      
      setUserInDatabes(response.data)});
    /// czy istnieje ju?? taka nazwa uzytkownika
    //(!errorMessage) && (!userInDatabase) && isPasswordConfirmationCorrect && props.user.username && props.user.password && setCanSubmit(true)
} 
      

  function handleClick(newUser, isRegistered){
      
  

    if (isRegistered){
      
    
      // sprawdzenie czy si?? zgadza u??ytkownik i has??o
      Axios.post(myAppUrl+"/login", {username: newUser.username, password: newUser.password}).then((response)=>{
      
        //console.log(response.data);

        
        if (typeof(response.data)=== 'string'){
          setLoginMsg(response.data)
        }else{
       // setUserID(response.data.id)
       setUser(response.data) 
        setIsLogged(true)
        setColor(response.data.color)
        }
   
      });
      
  
    }else if(!isRegistered){
     
      Axios.post(myAppUrl + "/createUser", {username: newUser.username, password: newUser.password, color: newUser.color}).then((response)=>{
       
        setUser(response.data)  
      //setUserID(response.data.id)
      setIsLogged(true)
          
      

        });
    }
  }

  return(
    <React.Fragment> 
    { (isLoaded) ?  (
    <div id="mainConteiner" >
      <Header setIsRegistered={setIsRegister} 
      isRegistered={isRegistered} myAppUrl={myAppUrl}  user={user} isLogged={isLogged}
      logOut = {setIsLogged} currentColor={color}  colorFunction={changeColor}/>
      {(isLogged) ? (<Account 
      myAppUrl={myAppUrl} 
      currentColor={color} 
      user={user} 
      setUser={setUser} />) : 
      (<LoginForm 
      setLoginMsg={setLoginMsg}
      isRegistered={isRegistered}
      setIsRegister={setIsRegister}
      loginMsg={loginMsg}
      userInDatabase={userInDatabase} 
      userValidation={userValidation} 
      myAppUrl={myAppUrl} 
      currentColor={color} 
      user={user} 
      setUser={setUser} 
      loginFunc={handleClick}/>) }</div>) 
      : (<Oval 
      height="200"
    width="200"
    color='DimGray'
    ariaLabel='loading' />)
    }
      </React.Fragment>
    
  )

 
}

export default App;
