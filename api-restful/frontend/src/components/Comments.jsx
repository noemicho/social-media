import "../styles/Comments.css";
import { useState } from 'react';

export function Comments({ comments, postId, onCommentAdded }) {
    const [newComment, setNewComment] = useState(''); // Estado para armazenar o novo comentário

    const handleCommentChange = (e) => {
        setNewComment(e.target.value); // Atualiza o estado com o valor do input
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
    
        const userId = localStorage.getItem('userId');
    
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
                setNewComment('');
                
                onCommentAdded(data.comment); // Passa o novo comentário para o callback
            } else {
                console.error('Erro ao adicionar comentário:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição de comentário:', error);
        }
    };
    

    return (
        <div>
            <section id="comentarios">
                <div className="comentarios-conteudo">
                    {comments.map((comment) => (
                        <section key={comment._id} className="comentario">
                            <section>
                                <p className="perfil">{comment.user.username || "Usuário desconhecido"}</p>
                            </section>
                            <p className="texto">{comment.text}</p>
                        </section>
                    ))}
                </div>
                
                <section className="comentar">
                    <form onSubmit={handleCommentSubmit}>
                        <input 
                            type="text" 
                            value={newComment} 
                            onChange={handleCommentChange} 
                            placeholder="Adicionar um comentário..." 
                            required 
                        />
                        <button type="submit">Enviar</button>
                    </form>
                </section>
            </section>

        </div>
    );
    
}
