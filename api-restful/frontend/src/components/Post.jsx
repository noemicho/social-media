import '../styles/Post.css';
import curtiuIcon from '../images/curtiu.png';
import naoCurtiuIcon from '../images/nao-curtiu.png';
import comentarioIcon from '../images/comentario.png';
import binIcon from '../images/bin-icon.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Comments } from './Comments';

export function Post({ post, user }) {
    const [liked, setLiked] = useState(post.like.includes(localStorage.getItem('userId')));
    const [likeCount, setLikeCount] = useState(post.like.length);
    const [commentCount, setCommentCount] = useState(post.comments.length);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState(post.comments); // Estado para comentários

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
                setLiked(!liked);
                setLikeCount(data.likesCount);
            } else {
                console.error('Erro ao curtir o post:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição de curtida:', error);
        }
    };

    const handleAddComment = async () => {
        const userId = localStorage.getItem('userId');
        const postId = post._id;

        try {
            const response = await fetch(`http://localhost:3002/api/post/${postId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: userId, text: newComment }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Comentário adicionado:', data);

                // Atualiza o estado local com o novo comentário
                setComments(data.post.comments); // Atualiza o estado de comentários com a resposta do servidor
                setCommentCount(commentCount + 1);
                setNewComment('');
            } else {
                console.error('Erro ao adicionar comentário:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição de adicionar comentário:', error);
        }
    };

    const handleDelete = async () => {
        const userId = localStorage.getItem('userId');
        const postId = post._id;

        try {
            const response = await fetch(`http://localhost:3002/api/post/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
                    <Link className='username-link' to={`/profile/${post.user?._id || post.userId}`}>
                        <p>{post.user?.username || post.username || "Perfil desconhecido"}</p>
                    </Link>
                </section>

                <section className='areaImagem'>
                    <img src={post.image} alt="Postagem" className='post-image' />
                </section>

                <section className='actions'>
                    <button onClick={handleLike}>
                        <img
                            className="like"
                            src={liked ? curtiuIcon : naoCurtiuIcon}
                            alt={liked ? 'Curtido' : 'Não curtido'}
                        />
                    </button>
                    <span className='like-count'>{likeCount}</span>
                    <button onClick={() => setShowComments(!showComments)}>
                        <img className='comment' src={comentarioIcon} alt="Comentários" />
                    </button>
                    <span className='comment-count'>{commentCount}</span>
                </section>

                <section className='delete-icon-container'>
                    {user._id === localStorage.getItem('userId') && (
                        <button onClick={handleDelete}>
                            <img className="bin-icon" src={binIcon} alt="delete post" />
                        </button>
                    )}
                </section>

                <section>
                    <p id="legenda">{post.description || "Legenda..."}</p>
                </section>

                {showComments && 
                <Comments 
                    comments={comments} 
                    postId={post._id} 
                    onCommentAdded={(newComment) => {
                        setComments((prevComments) => [...prevComments, newComment]);
                        setCommentCount((prevCount) => prevCount + 1);
                    }} 
                />}
            </div>
        </div>
    );
}
