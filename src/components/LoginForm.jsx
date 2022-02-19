import React, {useEffect, useState} from "react";
//import DeleteIcon from "@mui/icons-material/Delete" //"@material-ui/icons/Delete";
import InputPassword from "./InputPassword"
//import Header from "./Header";
import Footer from "./Footer";
import validator from 'validator';
import Axios from "axios";

function LoginForm(props) {
 
  useEffect(()=>{
 
    if(isRegistered){
      ( Boolean(props.user.username)  && Boolean(props.user.password))? setCanSubmit(true): setCanSubmit(false)
    }
    else{
    ((!errorMessage) && (!props.userInDatabase) && isPasswordConfirmationCorrect && Boolean(props.user.username) && Boolean(passConf) && Boolean(props.user.password))? setCanSubmit(true): setCanSubmit(false)
    // console.log("pass validatiorn: " + (!errorMessage));
    // console.log("user in database: " + (!userInDatabase));
    // console.log("password conf: " + isPasswordConfirmationCorrect);
    // console.log("username : " + Boolean(props.user.username));
    // console.log("cpassword: " +  Boolean(props.user.password));
    // console.log("ostatecznie: " + canSubmit)
    }
  })
 
        
    const [canSubmit, setCanSubmit] = useState(false)
    const [isPasswordConfirmationCorrect, setIsPasswordConfirmationCorrect] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [passConf, setPassConf] =useState("")
    const isRegistered = props.isRegistered
    const setIsRegister=props.setIsRegister
    
    function passwordConf(event){
    setPassConf(event.target.value)  
        if (event.target.value === props.user.password){
           setIsPasswordConfirmationCorrect(true);
          
        }else{
         setIsPasswordConfirmationCorrect(false);
          
        }

    }
    

    function passValidation(event){

    if (validator.isStrongPassword(event.target.value, {
      minLength: 6, minNumbers:1, minLowercase:0, minUppercase:0, minSymbols:0
    })) {
      setErrorMessage('')
    } else {
      setErrorMessage('Your password must contain at least 6 characters and 1 number.')
      setCanSubmit(false)
    }
    //(!errorMessage) && (!userInDatabase) && isPasswordConfirmationCorrect && props.user.username && props.user.password && setCanSubmit(true)
    if(!event.target.value)  setErrorMessage('')

    }



    function handleChange(event){
        const { name, value } = event.target;
        props.setLoginMsg("");

        props.setUser(prevUser => {
          return {
            ...prevUser,
            [name]: value,
            
          };
        });
    }

    function changeOption() {
    setIsRegister(!isRegistered)
  }

  
  return (

    <React.Fragment >
  
    <form onSubmit ={(event) => {event.preventDefault()}} className="login growingItem">
    <input autoComplete="off" type="text" name="username" placeholder="username" onChange={(target)=> {
        handleChange(target)
        
        props.userValidation(target)
        
        }} value={props.user.username} 
        
        style={(props.userInDatabase && !isRegistered) ? {backgroundColor:"yellow"} : {}}/>

{(props.userInDatabase && !isRegistered) && <p id="userVal" > Username already exist</p>}

    <InputPassword  name="password"  placeholder="password" onChange={(target)=> {
        handleChange(target)
        passValidation(target)
        }} value={props.user.password} stylex={{}}/>
    
    {(!isRegistered) && <p id="passVal" style={errorMessage ? {}: {display: "none"}}>{errorMessage} </p>}
   {(!isRegistered) && <InputPassword value={passConf}  name="passwordConf" placeholder="confirm password" onChange={passwordConf} stylex={(isPasswordConfirmationCorrect) ?{}: {border: "1px solid red"}}  />}
    
      <button id="LogSign" onClick={()=> {props.loginFunc(props.user, isRegistered)}} 
      disabled={(canSubmit)? false: true}>
       { isRegistered ? "LogIn" : "Create Account" }
      </button>
     {(props.loginMsg) && <p id="userVer" > {props.loginMsg}</p>}

      <button id="changeOption" onClick={changeOption}>
       { isRegistered ? "Are you new here? Register!" : "You have already an account? Log in !" }
      </button>
     

      </form>
    
    <Footer />
    </React.Fragment>
  );
}

export default LoginForm;
