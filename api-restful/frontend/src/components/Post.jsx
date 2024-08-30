import '../styles/Post.css';

export function Post({ post }) {
    // Funções para as ações dos botões (curtir, comentar, compartilhar)
    const handleLike = () => {
        console.log("Post curtido!");
        // Implementar lógica de curtir
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
                        <button onClick={handleLike}>Curtir</button>
                        <button onClick={handleComment}>Comentar</button>
                    </section>

                    <section>
                        <p id="legenda">{post.description || "Legenda..."}</p> {/* Mostra a descrição do post */}
                    </section>
                </div>
            </div>
        </div>
    );
}
