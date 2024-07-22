import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../../../config';
import './index.css'

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [shouldDisplayForm, setShouldDisplayForm] = useState(false); 

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const ownerResponse = JSON.parse(localStorage.getItem('OwnerInfo'));
                const ownerId = ownerResponse.id;
                const token = Cookies.get('token');
                const response = await axios.get(`${config.apiBaseUrl}/All-update-status`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                 const ownerUpdates = response.data.filter(update => update.owner_id === ownerId);
                 if (ownerUpdates.length > 0) {
                     setNotifications(ownerUpdates);
                     setShouldDisplayForm(true);
                 }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        shouldDisplayForm ?(
        <div >
            <h2>Notifications</h2>
            <ul className='notification-container'>
                {notifications.map(notification => (
                    <li key={notification.id}>
                        <p>{notification.message}</p>
                        <p>Service Id:{notification.serviceId}</p>
                        <p className='vehicel-status'>Vechical Service Status: {notification.status}</p>
                        <p>Date: {new Date().toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
        ):(
            <p></p>
        )
    );
};

export default Notifications;
