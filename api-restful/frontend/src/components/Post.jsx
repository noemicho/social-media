import '../styles/Post.css';
import curtiuIcon from '../images/curtiu.png'
import naoCurtiuIcon from '../images/nao-curtiu.png'
import comentarioIcon from '../images/comentario.png'
import { useState } from 'react';

export function Post({ post }) {

    const [liked, setLiked] = useState(false);
    
    const handleLike = () => {
        console.log("Post curtido!");

        setLiked(!liked); // Alterna o estado de curtida
    };

    const handleComment = () => {
        console.log("Comentário adicionado!");
        // Implementar lógica de comentar
    };

    return (
        <div className='posicao'>
            <div className='post'>
                <div id="grupo">
                    <section className='perfil'>
                        <p>{post.user?.name || "Perfil desconhecido"}</p> {/* Mostra o nome do usuário */}
                    </section>

                    <section className='areaImagem'>
                        <img src={post.image} alt="Postagem" className='post-image' /> {/* Mostra a imagem do post */}
                    </section>

                    <section className='actions'>
                        <button onClick={handleLike}><img
                                className="like"
                                src={liked ? curtiuIcon : naoCurtiuIcon} // Mostra o ícone de acordo com o estado
                                alt={liked ? 'Curtido' : 'Não curtido'}
                        /></button>
                    
                        <button onClick={handleComment}><img className='comment' src={comentarioIcon}/></button>
                    </section>

                    <section>
                        <p id="legenda">{post.description || "Legenda..."}</p> {/* Mostra a descrição do post */}
                    </section>
                </div>
            </div>
        </div>
    );
}
