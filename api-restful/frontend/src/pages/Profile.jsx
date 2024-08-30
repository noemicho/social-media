import { NavBar } from "../components/NavBar";
import profileIcon from "../images/profile-icon.png"
import "../styles/Profile.css"

export function Profile(){
    return(
        <div class="tudo">
            <img src={profileIcon} class="profilePic" alt="profile-icon"/>
            <div class="info">
                <p class="campo"> Name </p>
                <p class="campo"> User</p>
                <p class="campo"> E-mail</p>
                <button class="btn-mais"> Ver mais</button>
           </div>

           <div class ="photos">
                <section className='areaImagemP'>
                    <img src="" alt="imagem" />
                </section>
                <section className='areaImagemP'>
                    <img src="" alt="imagem" />
                </section>
                <section className='areaImagemP'>
                    <img src="" alt="imagem" />
                </section>
                <section className='areaImagemP'>
                    <img src="" alt="imagem" />
                </section>
           </div>
            <NavBar />
        </div>
    )
}