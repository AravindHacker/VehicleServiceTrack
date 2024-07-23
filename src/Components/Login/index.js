import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import config from '../../config';
import './index.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            const OwnerInfo = localStorage.getItem('OwnerInfo');
            const ProviderInfo = localStorage.getItem('ProviderInfo');
            if (OwnerInfo) {
                navigate('/owner');
            } else if (ProviderInfo) {
                navigate('/provider');
            }
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const response = await axios.post(`${config.apiBaseUrl}/login`, { username, password });
            const jwtToken = response.data.token;
            console.log('JWT Token:', jwtToken);
            Cookies.set('jwt_token', jwtToken, { expires: 100 });
            setMessage('Login successful');
            setIsAuthenticated(true);

            const allOwnersResponse = await axios.get(`${config.apiBaseUrl}/AllOwner`, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });
            const allOwners = allOwnersResponse.data;
            const OwnerInfo = allOwners.find(user => user.username === username);

            const ProviderResponse = await axios.get(`${config.apiBaseUrl}/owner/AllProviders`, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });
            const allProviders = ProviderResponse.data;
            const ProviderInfo = allProviders.find(user => user.name === username);

            if (OwnerInfo) {
                if (OwnerInfo.role === 'Owner') {
                    localStorage.setItem('OwnerInfo', JSON.stringify(OwnerInfo));
                    navigate('/owner');
                } else {
                    setMessage('Unauthorized role for Owner');
                }
            } else if (ProviderInfo) {
                if (ProviderInfo.role === 'Provider') {
                    localStorage.setItem('ProviderInfo', JSON.stringify(ProviderInfo));
                    navigate('/provider');
                } else {
                    setMessage('Unauthorized role for Provider');
                }
            } else {
                setMessage('User not found');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed');
            console.log(error.response?.data?.message);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className='login-cont'>
            {loading ? (
                <div className='loading-backdrop'>
                    <div className='loader'></div>
                </div>
            ) : (
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='form-cont'>
                        <p className='heading'>Login</p>
                        <div className='user-inputs'>
                            <label className='label-name'>Username</label>
                            <input
                                type="text"
                                className='user-box'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className='user-inputs'>
                            <label className='label-name'>Password</label>
                            <input
                                type="password"
                                className='user-box'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {message && <p className='login-error'>{message}</p>}
                        <button type="submit" className='submit-btn'>Login</button>
                        <p className='create-acc'>
                            Not a member? <Link to='/login-type'>Create an account</Link>
                        </p>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Login;
