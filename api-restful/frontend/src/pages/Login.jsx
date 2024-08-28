import { NavBar } from "../components/NavBar";
import {Link} from 'react-router-dom';
import logo from '../images/logo.png';
import '../styles/Login.css';

export function Login(){
    return(
        <>
            <div className="login">
                <div className="logo-div">
                    <img src={logo} className="logo"/>
                </div>
                <div className="info-login">
                    <input type='text' className="input-login" placeholder='Enter your username'/>
                    <input type='password' className="input-login" placeholder='Password'/>

                    <Link to='/home'><button className="login-button">Login</button></Link>
                    <Link to='/register'><p className="register-button">Register</p></Link>
                </div>
            </div>
        </>
    )
}