import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ProHeader from '../ProHeader';
import config from '../../../config';
import './index.css';

const ProUpcomingService = () => {
    const [upcomingServices, setUpcomingServices] = useState([]);

    useEffect(() => {
        const fetchUpcomingServices = async () => {
            try {
                const ProviderResponse = JSON.parse(localStorage.getItem('ProviderInfo'));
                const providerId = ProviderResponse.id;
                const token = Cookies.get('token');

                const response = await axios.get(`${config.apiBaseUrl}/Allappointments`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data)
                const filteredServices = response.data.filter(service => {
                    const appointmentDate = service.appointment_date;
                    return service.provider_id === providerId && appointmentDate >= new Date().toISOString().split('T')[0];
                });
                console.log("filterservices : ",filteredServices)
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

    return (
        <div className='provider-upcoming-services-cont'>
            <ProHeader />
            <h1>New service Appointment</h1>
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
        </div>
    );
};

export default ProUpcomingService;
