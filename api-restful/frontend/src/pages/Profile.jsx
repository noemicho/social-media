import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar.jsx";
import { Post } from "../components/Post"; // Importa o componente Post
import "../styles/Profile.css";
import dontShow from '../images/dont-show-password.png';
import Show from '../images/show-password.png';
import { Navigate, useNavigate } from "react-router-dom";

export function Profile() {

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
                console.log("Dados retornados:", data); 
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
    }, []);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleEditProfile = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem("userId");

        // Verifica se há alterações nos dados
        if (
            name === originalUserData.name &&
            username === originalUserData.username &&
            email === originalUserData.email &&
            password === originalUserData.password
        ) {
            setFeedbackMessage("No changes !");
            setFeedbackModalOpen(true);
            handleModalClose();
            return;
        }

        try {
            const response = await fetch("http://localhost:3002/api/edit-profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, name, username, email, password }),
            });

            if (response.ok) {
                setFeedbackMessage("Profile updated successfully!");
                // Atualiza os dados originais com os novos dados
                setOriginalUserData({ name, username, email, password });
            } else {
                setFeedbackMessage("Failed to update profile.");
            }
        } catch (error) {
            setFeedbackMessage("Error during the request.");
            console.error("Erro na requisição:", error);
        } finally {
            setFeedbackModalOpen(true); 
            handleModalClose(); 
        }
    };

    // Função para fechar o modal de feedback
    const handleFeedbackModalClose = () => {
        setFeedbackModalOpen(false);
        window.location.reload();
    }

    const handleLogout = () => {
        localStorage.removeItem("userId");
        navigate('/');
    }


    return (
        <>
            <div className="profile-container">
                <div className="profile-header">
                    <h1 id="profile-title">
                        Profile
                        {user && <span id="profile-username"> ({user.username})</span>}
                    </h1>
                    <button id="edit-profile" onClick={handleModalOpen}>Edit Profile</button>
                    <button id="logout" onClick={handleLogout}>Logout</button>
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

            {/* Modal de edição de perfil */}
            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button onClick={handleModalClose} className="modal-close">×</button>
                        <h2>Edit Profile</h2>
                        <form onSubmit={handleEditProfile}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                            <label>
                                Username:
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </label>
                            <label>
                                E-mail:
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <label>
                                Password:
                                <div className="password-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleShowPassword}
                                        className="show-password"
                                    >
                                        <img
                                            src={showPassword ? Show : dontShow}
                                            alt="Toggle Password Visibility"
                                        />
                                    </button>
                                </div>
                            </label>
                            <button type="submit">Save</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de feedback */}
            {feedbackModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>{feedbackMessage}</p>
                        <button onClick={handleFeedbackModalClose} className="modal-close">x</button>
                    </div>
                </div>
            )}
        </>
    );
}
