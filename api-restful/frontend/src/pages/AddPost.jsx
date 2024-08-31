import { useState } from "react"; 
import { NavBar } from "../components/NavBar";
import "../styles/AddPost.css";

export function AddPost() {
    const [selectedImage, setSelectedImage] = useState(""); 

    const handleImageUpload = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); 
            };
            reader.readAsDataURL(file); 
        }
    };

    return (
        <>
            <h1 className="title">Add Post</h1>

            <div className='novaposicao'>
                <div className='novopost'>
                    <div className="grid">
                        <section id="grid1">
                            {selectedImage && <img src={selectedImage} alt="imagem_aqui" />} 
                        </section>

                        <section id="grid2">
                            <input type="text" placeholder="Description..." />
                        </section>    

                        <div id="actions">
                            <label htmlFor="fileInput">Upload Photo</label>
                            <button id="buttonPost">Create Post</button>
                            <input id="fileInput" type="file" accept="image/*" onChange={handleImageUpload} />
                        </div>
                    </div>
                </div>
            </div>

            <NavBar />
        </>
    );
}
