import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ProHeader from '../ProHeader';
import config from '../../../config';
import './index.css'

const ServiceRequests = () => {
    const [filteredServiceRequests, setFilteredServiceRequests] = useState([]);
    const [message, setMessage] = useState('');
    const [expandedRequests, setExpandedRequests] = useState({});
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [serviceDetails, setServiceDetails] = useState('');

    useEffect(() => {
        const fetchServiceRequests = async () => {
            try {
                const token = Cookies.get('token');
                const providerDetails = JSON.parse(localStorage.getItem('ProviderInfo'));
                const providerId = providerDetails.id;

                const serviceResponse = await axios.get(`${config.apiBaseUrl}/receive-request`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(serviceResponse.data)
                         
                const currentDate = new Date().toISOString().split('T')[0];
                console.log("currentDate:",currentDate)

                const filteredRequests = serviceResponse.data.filter(request => {
                const preferredDate = new Date(request.preferred_date);
                const localPreferredDate = preferredDate.toISOString().split('T')[0];  
                    console.log("preferredDate :",localPreferredDate)
                    return request.provider_id === providerId && localPreferredDate >= currentDate;
                });

                setFilteredServiceRequests(filteredRequests);

                if (filteredRequests.length === 0) {
                    setMessage('No service requests available for the current provider.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setMessage('An error occurred while fetching data.');
            }
        };

        fetchServiceRequests();
    }, []);

    const toggleRequest = (requestId) => {
        setExpandedRequests(prevState => ({
            ...prevState,
            [requestId]: !prevState[requestId]
        }));
    };

    const handleSubmit = async (request) => {
        try {
            const token = Cookies.get('token');

            if (!request.owner_id) {
                alert('Owner ID is missing. Cannot submit appointment.');
                return;
            }

            const appointmentData = {
                ownerId: request.owner_id,
                providerId: request.provider_id,
                appointmentDate: appointmentDate,
                appointmentTime: appointmentTime,
                serviceDetails: serviceDetails,
                vehicleMake: request.vehicle_make,
                vehicleModel :  request.vehicle_model,
                serviceType:request.service_type,
                licensePlate:request.license_plate
            };

            const response = await axios.post(`${config.apiBaseUrl}/appointments`, appointmentData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Appointment submitted:', response.data);

            toggleRequest(request.id);
            setAppointmentDate('');
            setAppointmentTime('');
            setServiceDetails('');

            alert('Appointment submitted successfully.');

        } catch (error) {
            console.error('Error submitting appointment:', error);
            alert('An error occurred while submitting the appointment.');
        }
    };
    
    return (
        <div className='service-received-home'>
            <ProHeader/>
            {message ? (
                <p>{message}</p>
            ) : (
                <ul className='service-received-cont'>
                    {filteredServiceRequests.map(request => (
                        <li key={request.id}  className='each-service-received-cont'>
                          <div className='service-recived-info' >
                            <p className='service-id'>Service Request ID: {request.id}</p>
                            <p>Provider ID: {request.provider_id}</p>
                            <p>Vehicle Make: {request.vehicle_make}</p>
                            <p>Vehicle Model: {request.vehicle_model}</p>
                            <p>License Plate: {request.license_plate}</p>
                            <p>Preferred Date: {request.preferred_date}</p>
                            <p>Preferred Time: {request.preferred_time}</p>
                            <p>Service Location: {request.service_location}</p>
                            <p>Service Type: {request.service_type}</p>
                           </div>
                            <button 
                                type='button' 
                                className='appointment' 
                                onClick={() => toggleRequest(request.id)}>
                                {expandedRequests[request.id] ? 'Hide' : ' Fix Appointment'}
                            </button>
                            {expandedRequests[request.id] && (
                                <div className='fix-appointment'>
                                    <h3 className='appointment-header'>Appointment details</h3>
                                    <lable className="fix-date">Appointment Date:</lable>
                                    <input
                                        type="date"
                                        value={appointmentDate}
                                        onChange={(e) => setAppointmentDate(e.target.value)}
                                    />
                                    <label className="fix-date">Appintment Time</label>
                                     <input
                                        type="time"
                                        value={appointmentTime}
                                        onChange={(e) => setAppointmentTime(e.target.value)}
                                    />
                                    <label className="fix-date">Service Detailes:</label>
                                    <textarea
                                        value={serviceDetails}
                                        onChange={(e) => setServiceDetails(e.target.value)}
                                        placeholder="Service details"
                                    />
                                    <button 
                                        type='button' 
                                        className='appointment-btn' 
                                        onClick={() => handleSubmit(request)}>
                                        Submit
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ServiceRequests;

