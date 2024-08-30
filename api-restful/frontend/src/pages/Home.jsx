import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Post } from "../components/Post"; // Importa o componente Post
import "../styles/Home.css";

export function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:3002/api/post');
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            <h1 className="title">Home</h1>
            <NavBar />
            {loading ? (
                <p>Carregando posts...</p>
            ) : (
                <div className="posts-container">
                    {posts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </div>
            )}
        </>
    );
}
