import { NavBar } from "../components/NavBar";
import profileIcon from "../images/profile-icon.png"
import "../styles/Profile.css"

export function Profile(){
    return(
        <div class="tudo">
            <img src={profileIcon} class="profilePic" alt="profile-icon"/>
            <div class="info">
                <input type="text" class="campo"></input>
                <input type="text" class="campo"></input>
                <input type="text" class="campo"></input>
           </div>
           <div class ="photos">
                <p class="photo">Photo 1</p>
                <p class="photo">Photo 2</p>
                <p class="photo">Photo 3</p>
                <p class="photo">Photo 4</p>
           </div>
            <NavBar />
        </div>
    )
}