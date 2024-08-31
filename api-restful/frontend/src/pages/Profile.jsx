import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar.jsx";
import { Post } from "../components/Post"; // Importa o componente Post
import "../styles/Profile.css";

export function Profile() {
    const [user, setUser] = useState(null); 
    const [posts, setPosts] = useState([]); 

    const handleCreatePost = async () => {
        const userId = localStorage.getItem("userId");

        try {
            const response = await fetch("http://localhost:3002/api/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                const data = await response.json();
                const postsWithUsername = data.posts.map(post => ({
                    ...post,
                    username: data.user.username // Adiciona o username diretamente ao post
                }));
                setUser(data.user);
                setPosts(postsWithUsername);
            } else {
                console.error("Erro ao obter perfil:", response.statusText);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    useEffect(() => {
        handleCreatePost();
    }, []);

    return (
        <>
            <div className="profile-container">
                <div className="profile-header"> 
                    <h1 id="profile-title">
                        Profile
                        {user && <span id="profile-username"> ({user.username})</span>}
                    </h1>
                    <button id="edit-profile">Edit Profile</button>
                    <button id="logout">Logout</button>
                </div>

                {user && (
                    <div className="profile-info">
                        <p className="info-field">{user.name}</p>
                    </div>
                )}

                <div className="posts-container-profile"> {/* Novo contêiner para a área dos posts */}
                    <div className="posts-grid">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <Post key={post._id} post={post}/>
                            ))
                        ) : (
                            <div className="no-posts">
                                <p>No posts available</p>
                            </div>
                        )}
                    </div>
                </div>

                <NavBar />
            </div>
        </>
    );
}