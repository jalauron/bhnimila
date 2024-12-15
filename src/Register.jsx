// frontend2/src/components/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './mainpage.css';  // Ensure you have this CSS file for styling

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
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
                navigate('/'); // Redirect to login page after successful registration
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('There was an error registering!', error);
            setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
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
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Register;
