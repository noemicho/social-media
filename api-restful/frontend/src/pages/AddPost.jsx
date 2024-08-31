import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import "../styles/AddPost.css";

export function AddPost() {
    const [selectedImage, setSelectedImage] = useState(""); 
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState(""); 
    const navigate = useNavigate();

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

    const handleCreatePost = async () => {
        const userId = localStorage.getItem("userId"); // Obtém o ID do usuário do localStorage
        
        if (!selectedImage) {
            setMessage("Please select a photo..."); 
            return;
        }


        const postData = {
            user: userId,
            image: selectedImage, 
            description: description || "", 
            like: [],
            comments: []
        };

        try {
            const response = await fetch("http://localhost:3002/api/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                setMessage("Post created successfully!");
                setSelectedImage("");
                setDescription("");
                navigate("/home");
            } else {
                setMessage("Failed to create post.");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            setMessage("An error occurred. Please try again.");
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
                            <input type="text" 
                            placeholder="Description..." 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            />
                        </section>    

                        <div id="actions">
                            <label htmlFor="fileInput">Upload Photo</label>
                            <button id="buttonPost" onClick={handleCreatePost}>Create Post</button>
                            <input id="fileInput" type="file" accept="image/*" onChange={handleImageUpload} />
                        </div>
                    </div>
                    {/* Exibe a mensagem de feedback */}
                    {message && <div className="message">{message}</div>}
                </div>
            </div>

            <NavBar />
        </>
    );
}
