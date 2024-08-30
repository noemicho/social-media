import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { GoBack } from "../components/GoBack";
import "../styles/Register.css";

export function Register(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3002/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, username }),
            });

            const data = await response.json();

            if (response.ok) {
                // Registro bem-sucedido, exibe uma mensagem de sucesso e redireciona para o login
                setSuccessMessage('Registro realizado com sucesso! Redirecionando para o login...');
                setTimeout(() => navigate('/login'), 2000); // Redireciona após 2 segundos
            } else {
                // Se o registro falhar, exibe a mensagem de erro
                setErrorMessage(data.msg || 'Erro ao registrar');
            }
        } catch (error) {
            setErrorMessage('Erro ao conectar ao servidor');
        }
    };


    return(
        <>
        <div class="all">
            <h1 class="title">Register</h1>
            <form class="form" onSubmit={handleSubmit}>
                <input class="input" 
                type="text" 
                id="name" 
                placeholder="Enter your name:"
                value={name}
                onChange={(e) => setName(e.target.value)}
                ></input>

                <input class="input" 
                type="text" 
                id="email" 
                placeholder="Enter your email:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></input>

                <input class="input" 
                type="text" 
                id="password" 
                placeholder="Enter your password:"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></input>

                <input class="input" 
                type="text" 
                id="username" 
                placeholder="Enter your username:"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                ></input> 
                
                <div class="buttons">
                    <GoBack/>
                    <button class="create-btn">Create Account</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
           
        </div>          
        </>
    )
}