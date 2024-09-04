import '../styles/Post.css';
import curtiuIcon from '../images/curtiu.png';
import naoCurtiuIcon from '../images/nao-curtiu.png';
import comentarioIcon from '../images/comentario.png';
import binIcon from '../images/bin-icon.png';
import binIconComment from '../images/bin-icon.png';
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

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.log('userId não encontrado no localStorage');
            console.log(userId)
            return; // Ou tome alguma ação de fallback
        }else{
            console.log('peguei id do usuario tentando comentar: ', userId);

        }

        const postId = post._id;

        try {
            const response = await fetch(`http://localhost:3002/api/post/${postId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: userId, // Substitua pelo ID do usuário autenticado
                    text: newComment,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar comentário');
            }

            const data = await response.json();
            setComments([...comments, data.comment]);
            setCommentCount(commentCount + 1);
            setNewComment('');

        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        const postId = post._id;
    
        try {
            const response = await fetch(`http://localhost:3002/api/post/${postId}/comment/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Se você estiver usando tokens de autenticação
                },
            });
    
            if (!response.ok) {
                throw new Error('Erro ao deletar comentário');
            }
    
            const data = await response.json();
            console.log(data.msg);
    
            // Atualiza a lista de comentários no estado
            setComments(comments.filter(comment => comment._id !== commentId));
            setCommentCount(commentCount - 1);
    
        } catch (error) {
            console.error('Erro ao deletar comentário:', error);
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

                {showComments && (
                    <section className='comments-section'>
                        <div className='comments'>
                            {comments.map((comment) => (
                                <p key={comment._id}>
                                    <strong>{comment.username || "Unknow user"}</strong>: {comment.text}
                                    {comment.user === localStorage.getItem('userId') && ( // Mostra o botão apenas se o comentário for do usuário logado
                                    <button onClick={() => handleDeleteComment(comment._id)} className='excluir-comentario'>Excluir</button>
                                )}
                                </p>
                                
                            ))}
                        </div>
                        <form onSubmit={handleCommentSubmit} className='comment-form'>
                            <input 
                                type="text" 
                                value={newComment} 
                                onChange={handleCommentChange} 
                                placeholder="Comment here..." 
                                className='comment-input'
                            />
                            <button type="submit" className='comment-submit'>Send</button>
                        </form>
                    </section>
                )}
            </div>
        </div>
    );
}
