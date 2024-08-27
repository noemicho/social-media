import { NavBar } from "../components/NavBar";
import {Link} from 'react-router-dom';
import logo from '../images/logo-camera.png'
import '../styles/Login.css'

export function Login(){
    return(
        <>
            <div className="login">
                <div className="logo-div">
                    <Link to='/home'><img src={logo} className="logo"/></Link>
                </div>
                <div>
                    
                </div>
            </div>
        </>
    )
}