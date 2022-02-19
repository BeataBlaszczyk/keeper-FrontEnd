import React, {useEffect} from "react";
import HighlightIcon from "@mui/icons-material/Highlight" //"@material-ui/icons/Highlight";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LogoutIcon from '@mui/icons-material/Logout';
import Axios from "axios";

function Header(props) {

  useEffect(()=> {
    //console.log("use effect")
    //console.log(props.color + " --kolor")

    if(!props.isRegistered || props.isLogged){
      //console.log("try change")
      Axios.post(props.myAppUrl+"/changeColor", {color: props.currentColor, user: props.user.username}).then((response) => {
      })
     }

    //props.colorFunction()
  }, [props.color, props.currentColor])


  return (
    <header style={{backgroundColor: props.currentColor}}>
      <h1>
        <HighlightIcon />
        
        Keeper
      </h1>
      <div id="colorContainer">
      
      <input onChange={props.colorFunction} 
      id="colorChoose" value={props.color} 
      name="color" 
      type="color" 
      style={{visibility:"hidden"}}>

      </input>
      <label  htmlFor="colorChoose"> <BorderColorIcon style={{color:"white" }} /> </label>
      <LogoutIcon  style={{color:"white", marginLeft:"20px", cursor:"pointer" }} onClick={()=> {
        document.cookie = "user="+"";
        props.logOut(false)
      props.setIsRegistered(true)}}/>
      </div>
    </header>
  );
}

export default Header;
