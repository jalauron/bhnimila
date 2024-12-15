import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './mainpage.css';

const Login =() => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Username:', username, 'Password:', password);  // Debugging step
        try {
            const response = await axios.post('${API_ENDPOINT}/auth/login', {username, password });
            console.log('Response:', response.data);  // Debugging step
            if (response.data.success) {
                localStorage.setItem('authToken', response.data.token);
                navigate('/dashboard');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
            setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };
    

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <div className="input-group">
                        <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <div className="input-group">
                        <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Login;
