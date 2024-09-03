import "../styles/Comments.css"
import profileIcon from '../images/profile-icon.png'

export function Comments(){
    return(
        <div>
            <section id="comentarios">
                <section className="comentario">
                    <section>
                        <p className="perfil">Fulano</p> 
                    </section>
                    <p className="texto">comentario...</p>
                </section>

                <section className="comentario">
                    <section>
                        <p className="perfil">Fulano</p> 
                    </section>
                    <p className="texto">comentario...</p>
                </section>

                <section className="comentario">
                    <section>
                        <p className="perfil">Fulano</p> 
                    </section>
                    <p className="texto">comentario...</p>
                </section>

                
               
                
                <section className="comentar">
                    <input type="text" />
                    <button>Enviar</button>
                </section>
                
            </section>

            
        </div>
    )
}