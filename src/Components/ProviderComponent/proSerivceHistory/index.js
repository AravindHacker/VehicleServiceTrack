
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ProHeader from '../ProHeader';
import config from '../../../config';
import './index.css'

const ProviderServiceHistory = ({ ownerId }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = Cookies.get('token');
                
                const storedUserData = JSON.parse(localStorage.getItem('ProviderInfo'));
                const providerId = storedUserData?.id;    

                const statusResponse = await axios.get(`${config.apiBaseUrl}/All-update-status`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Status Updates:', statusResponse.data);

                const statusUpdates = statusResponse.data;
                console.log('Status Updates:', statusUpdates);

                console.log('Fetching service requests...');
                const serviceResponse = await axios.get(`${config.apiBaseUrl}/receive-request`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const serviceRequests = serviceResponse.data;
                console.log('Service Requests:', serviceResponse.data);

                const completedNotifications = serviceRequests.filter(request => 
                    statusUpdates.some(update => 
                        request.provider_id === providerId && (
                        update.provider_id === request.provider_id  
                       ||  update.status === 'completed'
                        )
                    )
                );
                console.log('Completed Notifications:', completedNotifications);

                setNotifications(completedNotifications);
                
            } catch (error) {
                console.error('Error fetching notifications:', error.message, error);
            }
        };

        fetchNotifications();


    }, [ownerId]);

    return (
        <div className='provider-service-history'>
            <ProHeader />
            <h2>Service Records</h2>
            {notifications.length > 0 ? (
               <div className="table-container"> 
                <table className="notification-table">
                        <thead>
                            <tr>
                                <th>Service ID</th>
                                <th>Vehicle Make</th>
                                <th>Vehicle Model</th>
                                <th>License Plate</th>
                                <th>Owner Id</th>
                                <th>Serviced Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map(notification => (
                                <tr key={notification.id}>
                                    <td>{notification.id}</td>
                                    <td>{notification.vehicle_make}</td>
                                    <td>{notification.vehicle_model}</td>
                                    <td>{notification.license_plate}</td>
                                    <td> {notification.owner_id}</td>
                                    <td>{new Date().toLocaleDateString()}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
               </div>        
            ) : (
                <p>No completed services yet.</p>
            )}
        </div>
    );
};

export default ProviderServiceHistory;
