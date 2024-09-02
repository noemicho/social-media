import '../styles/Post.css';
import curtiuIcon from '../images/curtiu.png'
import naoCurtiuIcon from '../images/nao-curtiu.png'
import comentarioIcon from '../images/comentario.png'
import binIcon from '../images/bin-icon.png'
import { useState } from 'react';

export function Post({ post, user }) {
    console.log('aaaaaaaaa ', user._id)
    console.log('bbbbbbbbb ', localStorage.getItem('userId'))
    const [liked, setLiked] = useState(post.like.includes(localStorage.getItem('userId'))); // Verifica se o usuário já curtiu
    const [likeCount, setLikeCount] = useState(post.like.length); // Contagem inicial de curtidas
    const [commentCount, setCommentCount] = useState(post.comments.length); // Contagem inicial de comentários
    
    const handleLike = async () => {
        const userId = localStorage.getItem('userId');
        const postId = post._id;

        try {
            const response = await fetch('http://localhost:3002/api/like', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, userId }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setLiked(!liked); // Alterna o estado de curtida
                setLikeCount(data.likesCount); // Atualiza a contagem de curtidas
            } else {
                console.error('Erro ao curtir o post:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição de curtida:', error);
        }
    };

    const handleComment = () => {
        console.log("Comentário adicionado!");
        // Implementar lógica de comentar
    };

    const handleDelete = async () => {
        const userId = localStorage.getItem('userId');
        const postId = post._id;

        try {
            const response = await fetch(`http://localhost:3002/api/post/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Se necessário
                },
            });

            if (response.ok) {
                console.log('Post excluído com sucesso');
                window.location.reload();
            } else {
                console.error('Erro ao excluir o post:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição de exclusão:', error);
        }
    };


    return (
        <div className='posicao'>
            <div className='post'>
                <section className='perfil-post'>
                    <p>{post.user?.username || post.username || "Perfil desconhecido"}</p> {/* Mostra o username */}
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
                    <span className='like-count'>{likeCount}</span> {/* Mostra a contagem de curtidas */}
                    <button onClick={handleComment}><img className='comment' src={comentarioIcon}/></button>
                    <span className='comment-count'>{commentCount}</span> {/* Mostra a contagem de comentários */}
                </section>

                <section className='delete-icon-container'>
                        
                    {user._id === localStorage.getItem('userId') && (
                        <button onClick={handleDelete}>
                            <img className="bin-icon" src={binIcon} alt="delete post" />
                        </button>
                    )}
                </section>

                <section>
                    <p id="legenda">{post.description || "Legenda..."}</p> {/* Mostra a descrição do post */}
                </section>
            </div>
        </div>
    );
}
