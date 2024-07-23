import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ProHeader from '../ProHeader';
import config from '../../../config';
import './index.css';

const serviceTrack = [
    { id: 1, status: "pending" },
    { id: 2, status: "in_progress" },
    { id: 3, status: "additional_repairs_needed" },
    { id: 4, status: "completed" }
];

const ScheduledService = () => {
    const [selectedStatus, setSelectedStatus] = useState(serviceTrack[0].status);
    const [serviceRequests, setServiceRequests] = useState([]);
    const [appointmentData, setAppointmentData] = useState([]);
    const [filteredServiceRequests, setFilteredServiceRequests] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchServiceRequests = async () => {
            try {
                const token = Cookies.get('token');
                const serviceResponse = await axios.get(`${config.apiBaseUrl}/receive-request`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setServiceRequests(serviceResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setMessage('An error occurred while fetching data.');
            }
        };

        fetchServiceRequests();
    }, []);

    useEffect(() => {
        const fetchAppointmentData = async () => {
            try {
                const token = Cookies.get('token');
                const appointmentResponse = await axios.get(`${config.apiBaseUrl}/Allappointments`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const formattedAppointmentData = appointmentResponse.data.map(appointment => ({
                    ...appointment,
                    appointment_date: new Date(appointment.appointment_date).toISOString().split('T')[0]
                }));
                console.log("formattedAppointmentData:", formattedAppointmentData);
                setAppointmentData(formattedAppointmentData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setMessage('An error occurred while fetching data.');
            }
        };

        fetchAppointmentData();
    }, []);

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        console.log("currentDate:", currentDate);
        const filteredRequests = appointmentData.filter(request =>
            request.appointment_date === currentDate
        );

        console.log("filteredRequests:", filteredRequests);
        setFilteredServiceRequests(filteredRequests);
    }, [serviceRequests, appointmentData]);

    console.log("serviceRequests:",serviceRequests)
    const handleStatusChange = async (event, requestId) => {
        const newStatus = event.target.value;
        setSelectedStatus(newStatus);
        const providerDetails = JSON.parse(localStorage.getItem('ProviderInfo'));
         const providerId = providerDetails.id;
    
        try {
            const token = Cookies.get('token');
            console.log("Handling status change for requestId:", requestId);
            console.log("Current serviceRequests:", serviceRequests);
    
            const requestToUpdate = filteredServiceRequests.find(request => request.id === requestId ===providerId);
            console.log("requestToUpdate:", requestToUpdate);
    
            if (!requestToUpdate) {
                console.error(`Service request with ID ${requestId} not found.`);
                return;
            }
    
            const correspondingAppointment = appointmentData.find(appointment => appointment.provider_id === requestToUpdate.provider_id && appointment.provider_id === providerId);
            console.log('correspondingAppointment:', correspondingAppointment);
    
            if (!correspondingAppointment) {
                console.error(`Corresponding appointment for provider ID ${requestToUpdate.provider_id} not found.`);
                return;
            }
    
            await axios.post(`${config.apiBaseUrl}/update-status`, {
                status: newStatus,
                serviceId: correspondingAppointment.id,
                ownerId: correspondingAppointment.owner_id,
                providerId: requestToUpdate.provider_id
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            const updatedRequests = serviceRequests.map(request =>
                request.id === requestId ? { ...request, status: newStatus } : request
            );
            setServiceRequests(updatedRequests);
    
            alert('Status updated successfully.');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('An error occurred while updating status.');
        }
    };
    
    const currentDate = new Date().toLocaleDateString();

    return (
        <div className='sehdule-service-body'>
            <ProHeader />
            {message && <p>{message}</p>}
            <div>
                <h2>Service Schedule for Today ({currentDate})</h2>
                {filteredServiceRequests.length > 0 ? (
                    <ul className='schedule-service-container'>
                        {filteredServiceRequests.map(request => (
                            <li key={request.id} className='each-schedule-service'>
                                <p>Service Request ID: {request.id}</p>
                                <p>Vehicle Make: {request.vehicle_make}</p>
                                <p>Vehicle Model: {request.vehicle_model}</p>
                                <p>License Plate: {request.license_plate}</p>
                                <p>Service Type: {request.service_type}</p>
                                <ul className='updating-schedul-service'>
                                    <h3>Mark the tasks as completed after finishing each one:</h3>
                                    {serviceTrack.map(eachId => (
                                        <li key={eachId.id} className='each-updating-schedul-service'>
                                          
                                            <input
                                                type="checkbox"
                                                name={`status-${request.id}`}
                                                value={eachId.status}
                                                className='update-input'
                                                id={`status-${request.id}-${eachId.id}`}
                                                onChange={(e) => handleStatusChange(e, request.id)} 
                                            />
                                            <label htmlFor={`status-${request.id}-${eachId.id}`} className='update-labels'>{eachId.status}</label>
                                        </li>
                                    ))}
                                </ul>
                                <p>Selected Status: {selectedStatus}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No service requests for today.</p>
                )}
            </div>
        </div>
    );
};

export default ScheduledService;
