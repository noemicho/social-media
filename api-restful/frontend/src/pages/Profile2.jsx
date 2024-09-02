import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar.jsx";
import { Post } from "../components/Post.jsx"; // Importa o componente Post
import "../styles/Profile.css";
import dontShow from '../images/dont-show-password.png';
import Show from '../images/show-password.png';
import { useNavigate, useParams } from "react-router-dom"; // Importa useParams

export function Profile2() {
    const { userId } = useParams(); // Captura o userId da URL
    const [user, setUser] = useState(null); 
    const [posts, setPosts] = useState([]); 
    const [modalOpen, setModalOpen] = useState(false); 
    const [name, setName] = useState(''); 
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [showPassword, setShowPassword] = useState(false);

    // Estados para o modal de feedback
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    // Estado para armazenar os dados originais do usuário
    const [originalUserData, setOriginalUserData] = useState({});

    const navigate = useNavigate();

    const handleGetPost = async () => {
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
                data.posts.forEach((post) => {
                    console.log('ID do post:', post._id);
                });
                const postsWithUsername = data.posts.map(post => ({
                    ...post,
                    username: data.user.username,     
                }))
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setUser(data.user);
                setPosts(postsWithUsername);
                setName(data.user.name);
                setUsername(data.user.username);
                setEmail(data.user.email);
                setPassword(data.user.password);

                // Salva os dados originais do usuário
                setOriginalUserData({
                    name: data.user.name,
                    username: data.user.username,
                    email: data.user.email,
                    password: data.user.password
                });
            } else {
                console.error("Erro ao obter perfil:", response.statusText);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    useEffect(() => {
        handleGetPost();
    }, [userId]); // Adiciona userId como dependência para atualizar quando mudar


    return (
        <>
            <div className="profile-container">
                <div className="profile-header">
                    <h1 id="profile-title">
                        Profile
                        {user && <span id="profile-username"> ({user.username})</span>}
                    </h1>
                </div>

                {user && (
                    <div className="profile-info">
                        <p className="info-field">{user.name}</p>
                    </div>
                )}

                <div className="posts-container-profile">
                    <div className="posts-grid">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <Post key={post._id} post={post} user={user} />
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
