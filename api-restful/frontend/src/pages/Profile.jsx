import { NavBar } from "../components/NavBar.jsx";
import "../styles/Profile.css"

export function Profile(){
    return(
        <>
            <div className="profile">
                <div className="header"> 
                    <h1 id='title-profile'>Profile</h1>
                    <button id='edit-profile' onClick="">Edit Profile</button>
                    <button id='logout' onClick="">Logout</button>
                </div>

                <div className="info">
                    <input type="text" className="campo"></input>
                    <input type="text" className="campo"></input>
                    <input type="text" className="campo"></input>
                </div>

                <div className="posts-div">
                <p>Photo 1</p>
                <p>Photo 2</p>
                <p>Photo 3</p>
                <p>Photo 4</p>
                </div>



                <NavBar />
            </div>
        </>
    )
}