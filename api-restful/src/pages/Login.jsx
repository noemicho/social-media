import { NavBar } from "../components/NavBar";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import {Link} from 'react-router-dom';
import { useState } from "react";
import logo from '../images/logo.png';
import '../styles/Login.css';

export function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

//testeeee
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(username, password);
        console.log("Envio");

        navigate('/home');

    };

    return(
        <>
            <div className="login">
               <form onSubmit={handleSubmit}>
                <div className="logo-div">
                    <img src={logo} className="logo"/>
                </div>
                <div className="info-login">
                    <input type='text' className="input-login" placeholder='Enter your username' onChange={(e) => setUsername(e.target.value)}/>
                    <input type='password' className="input-login" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>

                    <button type="submit" className="login-button">Login</button>
                    <Link to='/register'><p className="register-button">Register</p></Link>
                </div>
                </form>
                
            </div>
        </>
    )
}