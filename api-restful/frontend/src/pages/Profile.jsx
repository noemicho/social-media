import { NavBar } from "../components/NavBar.jsx";
import { Post } from "../components/Post.jsx"
import profileIcon from "../images/profile-icon.png"
import "../styles/Profile.css"

export function Profile(){
    return(
        <div className="tudo">
            <img src={profileIcon} className="profilePic" alt="profile-icon"/>
            <div className="info">
                <input type="text" className="campo"></input>
                <input type="text" className="campo"></input>
                <input type="text" className="campo"></input>
           </div>
           <p>Photo 1</p>
           <p>Photo 2</p>
           <p>Photo 3</p>
           <p>Photo 4</p>
            <NavBar />
        </div>
    )
}