import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import config from '../../../config';
import './index.css';

const ServiceProviders = () => {
    const navigate = useNavigate();
    const [providers, setProviders] = useState([]);
    const defaultImage="https://cdn-icons-png.flaticon.com/512/13695/13695871.png"
    useEffect(() => {
        const fetchServiceInfo = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/owner/AllProviders`);
                setProviders(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching service info:', error);
            }
        };

        fetchServiceInfo();
    }, []);

    const handleSelectProvider = async (providerid) => {
        console.log(providerid);
        console.log('Provider is selected.');
        const serviceRequest = JSON.parse(localStorage.getItem('serviceRequest'));

        if (!serviceRequest) {
            console.error('No service request data found in localStorage');
            return;
        }

        const storedUserData = JSON.parse(localStorage.getItem('OwnerInfo'));
        const ownerId = storedUserData?.id;

        const requestData = { ...serviceRequest, providerid, ownerId };

        try {
            const response = await axios.post(`${config.apiBaseUrl}/submit-request`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            navigate('/owner/reqservice');
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };

    return (
        <div className="service-cont-body">
            <Header />
            <div className="service-cont">
                <h1>All Service Providers List</h1>
                {providers.length > 0 ? (
                    providers.map((provider) => (
                        <div key={provider.id} className="each-provider">
                           <img
                                    src={`${config.apiBaseUrl}/${provider.profile_pic_path}` }
                                    alt="Profile"
                                    className="profile-pic"
                                    onError={(e) => e.target.src = defaultImage}
                                />
                                                         
                            <div className="service-provider-details">
                               
                                <p className="pro-name">{provider.name}</p>
                                <p className="pro-busname">{provider.business_name}</p>
                                <p className="pro-sercat">{provider.service_categories}</p>
                                <p className="pro-busadd">{provider.business_address}</p>
                                <p className="pro-ava">I'm Available : '{provider.availability}'</p>
                                <p className="pro-contact">Call : {provider.contact}</p>
                                <button
                                    type="button"
                                    className="prov-select-btn"
                                    onClick={() => handleSelectProvider(provider.id)} >
                                    Select
                                </button>

                            </div>
                        </div>
                    ))
                ) : (
                    <p>No providers available</p>
                )}
            </div>
        </div>
    );
};

export default ServiceProviders; 
