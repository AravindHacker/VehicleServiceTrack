import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import config from '../../../config';
import './index.css';

const ServiceProviderForm = () => {

  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    role: 'Provider', 
    business_name: '',
    business_address: '',
    service_categories: '',
    service_description: '',
    service_pricing: '',
    availability: '',
    preferred_communication_channels: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.apiBaseUrl}/provireg`, formData);
      console.log('Provider details saved:', response.data);

      const providersResponse = await axios.get(`${config.apiBaseUrl}/providers`);
      const providers = providersResponse.data; 

      const matchedProvider = providers.find(provider =>
        provider.name === formData.name && provider.password === formData.password
      );

      const providerId = matchedProvider ? matchedProvider.id : '';

      const providerDetails = { ...formData, providerId };
      localStorage.setItem('ProviderInfo', JSON.stringify(providerDetails));

      navigate('/provider');

    } catch (error) {
      console.error('Error saving provider details:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('General error:', error.message);
      }
    }
  };

  return (
    <div className='provider-reg'>
      <h1 className='pro-title'>Registration</h1>
     <div className='provider-cont'>
      <div className='provider-pic'>
                <img src='https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?t=st=1719901484~exp=1719905084~hmac=d602c6a3c6f7f85147ea85ec2d6c15f3e8233e54cf3709d35d93c6f90c9c15f9&w=740'
                        alt='owner-register' className='provider-register-pic' />
            </div>
      
      <form onSubmit={handleSubmit} className="profile">



        <label className='labelcont'>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Provider Name" className="inputcont" required />

        <label className='labelcont'>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="inputcont" required />

        <label className='labelcont'>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="inputcont" required />

        <label className='labelcont'>Contact</label>
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" className="inputcont" required />

        <label className='labelcont'>Role</label>
        <input type="text" name="role" value={formData.role} className="inputcont" readOnly />

        <label className='labelcont'>Business Name</label>
        <input type="text" name="business_name" value={formData.business_name} onChange={handleChange} placeholder="Business Name" className="inputcont" required />

        <label className='labelcont'>Business Address</label>
        <input type="text" name="business_address" value={formData.business_address} onChange={handleChange} placeholder="Business Address" className="inputcont" required />

        <label className='labelcont'>Service Categories</label>
        <input type="text" name="service_categories" value={formData.service_categories} onChange={handleChange} placeholder="Repairs, Alignments..." className="inputcont" required />

        <label className='labelcont'>Service Description</label>
        <textarea name="service_description" value={formData.service_description} onChange={handleChange} placeholder="Service Description" className="inputcont" required />

        <label className='labelcont'>Service Pricing</label>
        <input type="text" name="service_pricing" value={formData.service_pricing} onChange={handleChange} placeholder="Hourly: 50, ..." className="inputcont" required />

        <label className='labelcont'>Availability</label>
        <input type="text" name="availability" value={formData.availability} onChange={handleChange} placeholder="Half day, Full day..." className="inputcont" required />

        <label className='labelcont'>Preferred Communication Channels</label>
        <input type="text" name="preferred_communication_channels" value={formData.preferred_communication_channels} onChange={handleChange} placeholder="Email, Phone, ..." className="inputcont" required />

        <button type="submit" className='pro-submit-btn'>Submit</button>
      </form>
     </div> 
    </div>
  );
};

export default ServiceProviderForm;
