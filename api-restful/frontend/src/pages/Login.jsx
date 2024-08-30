import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import {Link} from 'react-router-dom';
import { useState } from "react";
import logo from '../images/logo.png';
import '../styles/Login.css';

export function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3002/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Armazena o userId no Local Storage
                localStorage.setItem('userId', data.userId);

                // Login bem-sucedido, redireciona para a Home com o ID do usuário na URL
                navigate('/home');

            } else {
                // Se o login falhar, exibe a mensagem de erro
                setErrorMessage(data.msg || 'Erro ao fazer login');
            }
        } catch (error) {
            setErrorMessage('Erro ao conectar ao servidor');
        }
    };

    return(
        <>
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <div className="logo-div">
                        <img src={logo} className="logo"/>
                    </div>
                    <div className="info-login">
                        <input type='text' 
                        className="input-login" 
                        placeholder='Enter your username' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>

                        <input type='password' 
                        className="input-login" 
                        placeholder='Password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>

                        <button type="submit" className="login-button">Login</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <Link to='/register'><p className="register-button">Register</p></Link>
                    </div>
                </form>
                
            </div>
        </>
    )
}