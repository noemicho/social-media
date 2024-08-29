import { NavBar } from "../components/NavBar";
import profileIcon from "../images/profile-icon.png"
import "../styles/Profile.css"

export function Profile(){
    return(
        <div class="tudo">
            <img src={profileIcon} class="profilePic" alt="profile-icon"/>
           


            <NavBar />
        </div>
    )
}