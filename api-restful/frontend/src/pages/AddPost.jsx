import { useState } from "react"; // Importando useState
import { NavBar } from "../components/NavBar";
import "../styles/AddPost.css";

export function AddPost() {
    const [selectedImage, setSelectedImage] = useState(""); // Estado para a imagem selecionada

    const handleImageClick = (src) => {
        setSelectedImage(src); // Atualiza o estado com a imagem clicada
    };

    const handleRemoveImage = () => {
        setSelectedImage(""); // Remove a imagem definindo o estado como vazio
    };

    const images = [
        "https://a-static.mlcdn.com.br/800x560/conjunto-feminino-blusa-short-moda-roupas-femininas-bellucy-modas/bellucymodas/15865186830/25df664d36b68a09b76cda357e953e48.jpeg",
        "https://www.estadao.com.br/resizer/v2/FIVYQFU6J5ND3PYRA6XQHR4NW4.jpg?quality=80&auth=04a93b8f4c288302da64fd8a96da7bb7cc11dff70430e4ba66587218d5b6011f&width=720&height=503&focal=0,0",
        "https://s1.1zoom.me/big0/815/Sunrises_and_sunsets_Hands_Sun_571948_1280x918.jpg",
        "https://www.estadao.com.br/resizer/v2/FIVYQFU6J5ND3PYRA6XQHR4NW4.jpg?quality=80&auth=04a93b8f4c288302da64fd8a96da7bb7cc11dff70430e4ba66587218d5b6011f&width=720&height=503&focal=0,0",
        // Adicione mais URLs de imagens conforme necessário
    ];

    return (
        <>
            <h1 className="title">Add Post</h1>

            <div className='novaposicao'>
                <div className="galeria">
                    <section>
                        <p>Galeria</p>    
                    </section>
                    
                    <section id="imagens">
                        {images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt="imagem"
                                onClick={() => handleImageClick(src)} // Define o evento de clique
                            />
                        ))}
                    </section>
                </div>

                <div className='novopost'>
                    <div className="grid">
                        <section id="grid1">
                            {selectedImage && <img src={selectedImage} alt="imagem_aqui" />} {/* Renderiza a imagem selecionada */}
                        </section>

                        <section id="grid2">
                            <input type="text" placeholder="Digite sua legenda aqui..." />
                        </section>    
                    </div>
                   
                    <div className="grid">
                        <button id="buttonRemove" onClick={handleRemoveImage}>Remover</button>
                        <button id="buttonPost">Postar</button>
                    </div>
                </div>
            </div>

            <NavBar />
        </>
    );
}
