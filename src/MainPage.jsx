import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './mainpage.css'; // Custom CSS for styling

// Registration Component
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password matching validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('/api/register', { username, password });
            if (response.data.success) {
                alert('Registration successful!');
                navigate('/'); // Redirect to login page
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('There was an error registering!', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
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
                <div className="form-group">
                    <label>Confirm Password</label>
                    <div className="input-group">
                        <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm your password"
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

// Login Component
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { username, password });
            if (response.data.success) {
                navigate('/dashboard');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
            alert('An error occurred. Please try again.');
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
            </form>
        </div>
    );
}

// MainPage Component: Contains Login and Register
function MainPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="container my-5">
            <div className="card">
                <div className="card-header text-center">
                    <h2 className="logo">BH NI MILA</h2>
                </div>
                <div className="card-body">
                    {isLogin ? <Login /> : <Register />}
                    <div className="toggle text-center mt-3">
                        <button 
                            onClick={() => setIsLogin(!isLogin)} 
                            className="btn btn-link"
                        >
                            {isLogin ? "Don't have an account? Register here" : "Already have an account? Login here"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
