import {useState, useEffect} from "react";
import './App.css';
import Axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

 

useEffect(() => {
  Axios.get("https://keeper-back-end.vercel.app/getUsers").then((response) => {
    setListOfUsers(response.data)
  })
},[])


const createUser = ()=> {
  Axios.post("https://keeper-back-end.vercel.app/createUser", {name: name, email: email}).then((response)=>{
    setListOfUsers([...listOfUsers], {name: name, email: email})
  } )
}
  return (
    <div className="App">    
     <div className='usersDisplay'> 
     {listOfUsers.map((user) => {
       return(
         <div>
        <h1>Name: {user.name}</h1>
        <h1>email: {user.email}</h1>
        
         </div>
       )
     })}
     </div>
     <input type="text" placeholder="name..." onChange={(event)=> {setName(event.target.value)} }/> 
     <input type="text" placeholder="email..." onChange={(event)=> {setEmail(event.target.value)}} /> 
     <button onClick={createUser}> Create user </button>
    </div>
  );
}

export default App;
