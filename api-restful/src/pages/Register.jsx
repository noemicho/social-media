import { GoBack } from "../components/GoBack";
import "../styles/Register.css";

export function Register(){
    return(
        <>
        <div class="all">
            <h1 class="title">Register</h1>
            <div class="form">
                <placeholder class="texto"></placeholder>
                <input class="input" type="text" id="name" placeholder="Enter your name:"></input>
                <input class="input" type="text" id="email" placeholder="Enter your email:"></input>
                <input class="input" type="text" id="password" placeholder="Enter your password:"></input>
                <input class="input" type="text" id="user" placeholder="Enter your user:"></input>    
                <div class="buttons">
                    <GoBack/>
                    <button class="create-btn">Create Account</button>
                </div>
            </div>
           
        </div>          
        </>
    )
}