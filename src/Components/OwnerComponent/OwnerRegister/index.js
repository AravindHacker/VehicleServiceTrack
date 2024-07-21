import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';
import './index.css'
const OwnerRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [role, setRole] = useState('Owner');
    const [pin_code, setPincode] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.apiBaseUrl}/ownreg`, {
                username,
                email,
                password,
                contact,
                address,
                role,
                pin_code
            });
             console.log(response)
          
                setMessage('Registration Successful');

                localStorage.setItem('OwnerInfo', JSON.stringify({
                    username,
                    email,
                    contact,
                    address,
                    role,
                    pin_code
                }));

                setUsername('');
                setEmail('');
                setPassword('');
                setContact('');
                setAddress('');
                setRole('Owner');
                setPincode('');

                navigate('/');
            
        }  catch (error) {
            setMessage('Registration failed');
            console.error('Registration unsuccessful:', error);
        }
    };

    return (
        <div className='reg-cont'>
        <div className='owner-body'>
                      <h1 className='signup'>Registration</h1>

          <div className='owner-register'>

            <form className="register-cont" onSubmit={handleSubmit}>

                <div className='user-inputs'>
                    <label className='label-name1'>Username</label>
                    <input
                        type="text"
                        value={username}
                        className='user-box1'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='user-inputs'>
                    <label className='label-name1'>Email</label>
                    <input
                        type="email"
                        value={email}
                        className='user-box1'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='user-inputs'>
                    <label className='label-name1'>Password</label>
                    <input
                        type="password"
                        value={password}
                        className='user-box1'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='user-inputs'>
                    <label className='label-name1'>Role</label>
                    <input
                        type="text"
                        value={role}
                        className='user-box1'
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>
                <div className='user-inputs'>
                    <label className='label-name1'>Contact</label>
                    <input
                        type="text"
                        value={contact}
                        className='user-box1'
                        placeholder='Contact Number'
                        onChange={(e) => setContact(e.target.value)}
                        required
                    />
                </div>
                <div className='user-inputs'>
                    <label className='label-name1'>Address</label>
                    <input
                        type="text"
                        value={address}
                        className='user-box1'
                        placeholder='Address'
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className='user-inputs'>
                    <label className='label-name1'>Pincode</label>
                    <input
                        type="text"
                        value={pin_code}
                        className='user-box1'
                        placeholder='Pincode'
                        onChange={(e) => setPincode(e.target.value)}
                        required
                    />
                </div>
                <button className='submit-btn1' type="submit">Register</button>
                {message && <p>{message}</p>}
            </form>
            
            <div className='owner-register-pic'>
                <img src='https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?t=st=1719901484~exp=1719905084~hmac=d602c6a3c6f7f85147ea85ec2d6c15f3e8233e54cf3709d35d93c6f90c9c15f9&w=740'
                        alt='owner-register' className='owner-register-pic' />
            </div>
           </div> 
        </div>
       </div> 
    );
};

export default OwnerRegister;
