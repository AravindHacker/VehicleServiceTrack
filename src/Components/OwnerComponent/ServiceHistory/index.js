import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '../../Header';
import config from '../../../config';
import './index.css'

const ServiceHistory = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = Cookies.get('token');
                
                console.log('Fetching service status updates...');
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
                        update.owner_id === request.owner_id ||
                        update.status === 'completed'
                    )
                );
                console.log('Completed Notifications:', completedNotifications);

                setNotifications(completedNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error.message, error);
            }
        };

        fetchNotifications();


    }, []);

    return (
        <div className='service-history-cont'>
           <div className='service-header'>
              <Header />
           </div> 
            <h2 className='service-history-header'>Service History</h2>
            {notifications.length > 0 ? (
               <div className="table-container"> 
                <table className="notification-table">
                        <thead>
                            <tr>
                                <th>Service ID</th>
                                <th>Vehicle Make</th>
                                <th>Vehicle Model</th>
                                <th>License Plate</th>
                                <th>Provider Id</th>
                                <th>Serviced Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map(notification => (
                                <tr key={notification.id}>
                                    <td >{notification.id}</td>
                                    <td>{notification.vehicle_make}</td>
                                    <td>{notification.vehicle_model}</td>
                                    <td>{notification.license_plate}</td>
                                    <td> {notification.provider_id}</td>
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

export default ServiceHistory;
