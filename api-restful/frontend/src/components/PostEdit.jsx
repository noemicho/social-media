import React from 'react';
import '../styles/PostEdit.css'; 

export default function PostEdit({ post, editedDescription, onDescriptionChange }) {
    return (
        <div className='posicao'>
            <div className='post'>
                <section className='perfil-post'>
                    <p>{post.user?.username || post.username || "Perfil desconhecido"}</p>
                </section>

                <section className='areaImagem'>
                    <img src={post.image} alt="Postagem" className='post-image' />
                </section>

                <section>
                    <textarea 
                        value={editedDescription} 
                        onChange={onDescriptionChange} 
                        className='edit-input'
                        rows="4"
                    />
                </section>
            </div>
        </div>
    );
}
