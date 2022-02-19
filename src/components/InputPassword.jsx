import React, {useState} from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function InputPassword(props){

     
    const [visibility, setVisibility] = useState(false)
    return(
    <div id="paswordStyle" style={props.stylex} >
    <input 
    onChange={props.onChange} 
    autoComplete="false"  
    type={visibility ? "text" : "password" } 
    name={props.name} 
    placeholder={props.placeholder} 
    
    />
    
     {visibility ? 
    (<VisibilityIcon onClick={()=> {
        setVisibility(!visibility)
    }}/>): (<VisibilityOffIcon onClick={()=> {setVisibility(!visibility)}}/>) }
    </div>)
}



export default InputPassword