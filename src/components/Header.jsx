import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight" //"@material-ui/icons/Highlight";
import BorderColorIcon from '@mui/icons-material/BorderColor';

function Header(props) {



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
      <label htmlFor="colorChoose"> <BorderColorIcon style={{color:"white" }} /> </label>
      </div>
    </header>
  );
}

export default Header;
