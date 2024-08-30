import '../styles/Post.css';

export function Post(){
    return (
        <>
        <div className='posicao'>
            <div className='post'>
                <div id="grupo"> 
                  <section className='perfil'>
                    <p>Perfil</p>
                </section>

                <section className='areaImagem'>
                    <img src="" alt="imagem" />
                </section>

                <section>
                    <button>curtir</button>
                    <button>comentar</button>
                    <button>compartilhar</button>
                </section>
                <section>
                    <p id="legenda">Legenda...</p>
                </section>
  
                </div>
                
            </div>
        </div>
            
        </>
    )
}