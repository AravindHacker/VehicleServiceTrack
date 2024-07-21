import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Notifications from '../serviceTracking';
import ReviewForm from '../ReviewAndRating';
import Header from '../../Header';
import config from '../../../config';
import './index.css';

const UpcomingService = () => {
    const [upcomingServices, setUpcomingServices] = useState([]);

    useEffect(() => {
        const fetchUpcomingServices = async () => {
            try {
                const ownerResponse = JSON.parse(localStorage.getItem('OwnerInfo'));
                const ownerId = ownerResponse.id;
                const token = Cookies.get('token');

                const response = await axios.get(`${config.apiBaseUrl}/Allappointments`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const filteredServices = response.data.filter(service => {
                    const appointmentDate = service.appointment_date;
                    return service.owner_id === ownerId && appointmentDate >= new Date().toISOString().split('T')[0];
                });
                console.log("filteredServices:",filteredServices)
                setUpcomingServices(filteredServices);
            } catch (error) {
                console.error('Error fetching upcoming services:', error);
            }
        };

        fetchUpcomingServices();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setUpcomingServices(prevServices =>
                prevServices.filter(service => new Date(service.appointment_date) > now)
            );
        }, 60000); 

        return () => clearInterval(interval);
    }, []);

    const ownerResponse = JSON.parse(localStorage.getItem('OwnerInfo'));
    const ownerId = ownerResponse.id;

    return (
        <div className='notification-service-cont'>
            <Header />
            <div className='notificatin-service-body'>
            <h2>New service Appointment</h2>
            {upcomingServices.length === 0 ? (
                <p>No upcoming services.</p>
            ) : (
                <ul className='appointment-cont'>
                    {upcomingServices.map(service => (
                        <li key={service.id} className='each-appointment'>
                            <p>Appointment ID: {service.id}</p>
                            <p>Date & Time: {new Date(service.appointment_date).toLocaleString()}</p>
                            <p>Service Provider ID: {service.provider_id}</p>
                        </li>
                    ))}
                </ul>
            )}
            <Notifications />

            {ownerId && <ReviewForm ownerId={ownerId} />} 
            </div>
        </div>
    );
};

export default UpcomingService; 
