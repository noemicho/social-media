import "../styles/Comments.css";
import { useState } from 'react';

export function Comments({ comments, postId, onCommentAdded }) {
    const [newComment, setNewComment] = useState(''); // Estado para armazenar o novo comentário

    const handleCommentChange = (e) => {
        setNewComment(e.target.value); // Atualiza o estado com o valor do input
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário

        const userId = localStorage.getItem('userId'); // Obtém o ID do usuário

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
                setNewComment(''); // Limpa o campo de comentário após enviar
                
                // Chama a função de callback para atualizar a lista de comentários
                onCommentAdded(data.comment); // Assume que o backend retorna o novo comentário
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
                {comments.map((comment) => (
                    <section key={comment._id} className="comentario">
                        <section>
                            <p className="perfil">{comment.user.username || "Usuário desconhecido"}</p> {/* Exibe o nome do usuário */}
                        </section>
                        <p className="texto">{comment.text}</p>
                    </section>
                ))}
    
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
