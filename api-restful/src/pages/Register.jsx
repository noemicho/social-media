import { useState } from "react";
import { GoBack } from "../components/GoBack";
import "../styles/Register.css";

export function Register(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    fetch('', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        setName(data.name)
    })
    .catch((error) => console.log(error))

    return(
        <>
        <div class="all">
            <h1 class="title">Register</h1>
            <div class="form">
                <placeholder class="texto"></placeholder>
                <input class="input" type="text" id="name" placeholder="Enter your name:"></input>
                <input class="input" type="email" id="email" placeholder="Enter your email:"></input>
                <input class="input" type="text" id="user" placeholder="Enter your user:"></input> 
                <input class="input" type="password" id="password" placeholder="Enter your password:"></input>   
                <div class="buttons">
                    <GoBack/>
                <button class="create-btn">Create Account</button>
                </div>
            </div>
        </div>          
        </>
    )
}