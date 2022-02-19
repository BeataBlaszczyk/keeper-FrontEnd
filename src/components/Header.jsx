import React, {useEffect} from "react";
import HighlightIcon from "@mui/icons-material/Highlight" //"@material-ui/icons/Highlight";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LogoutIcon from '@mui/icons-material/Logout';

function Header(props) {

  useEffect(()=> {props.colorFunction()}, [])


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
      <LogoutIcon  style={{color:"white", marginLeft:"20px", cursor:"pointer" }} onClick={()=> {props.logOut(false)
      props.setIsRegistered(true)}}/>
      </div>
    </header>
  );
}

export default Header;
