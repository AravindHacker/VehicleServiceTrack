import React, { useEffect, useState } from 'react';
import ProviderProfilePic from '../proProfilepic';
import ProHeader from '../ProHeader';
import config from '../../../config';
import './index.css';

const ProviderProfile = () => {
  const [providerDetails, setProviderDetails] = useState(null);
  const [profileChange, setProfileChange] = useState(false);
  const placeholderImage = "https://icon-library.com/images/profile-png-icon/profile-png-icon-25.jpg";

  useEffect(() => {
    const storedUserData = localStorage.getItem('ProviderInfo');
    if (storedUserData) {
      setProviderDetails(JSON.parse(storedUserData));
    } else {
      fetchProviderDetails();
    }
  }, []);

  const fetchProviderDetails = async () => {
    const response = await fetch(`${config.apiBaseUrl}/provider-details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProviderDetails(data);
      localStorage.setItem('ProviderInfo', JSON.stringify(data));
    } else {
      console.error('Failed to fetch provider details');
    }
  };

  if (!providerDetails) {
    return <div>Loading...</div>;
  }

  const onChangeProfile = () => {
    setProfileChange(!profileChange);
  };

  const handleUpload = (filePath) => {
    setProviderDetails((prevData) => ({
      ...prevData,
      profilePic: filePath,
    }));

    const updatedData = { ...providerDetails, profilePic: filePath };
    localStorage.setItem('ProviderInfo', JSON.stringify(updatedData));
  };

  const getProfileImageUrl = () => {
    if (providerDetails.profilePic) {
      return `${config.apiBaseUrl}/${providerDetails.profilePic}?timestamp=${new Date().getTime()}`;
    }
    return placeholderImage;
  };

  return (
    <div className='provider-details'>
      <ProHeader />
      <div className='provider-profile-container'>
        <div className='provider-profile-change'>
          <button
            type='button'
            className='provider-profile-image-btn'
            onClick={onChangeProfile}
          >
            <img
              src={getProfileImageUrl()}
              alt="Profile"
              className="provider-profile-image"
            />
          </button>
          <div className='profile-pic-div'>
            {profileChange && <ProviderProfilePic onUpload={handleUpload} />}
          </div>
        </div>
        <div className='provider-profile-details'>
          <p>Name: <span>{providerDetails.name}</span></p>
          <p>Email: <span>{providerDetails.email}</span></p>
          <p>Password:<span> ******* </span></p>
          <p>Contact: <span>{providerDetails.contact}</span></p>
          <p>Business Name:<span> {providerDetails.business_name}</span></p>
          <p>Business Address: <span>{providerDetails.business_address}</span></p>
          <p>Service Categories: <span>{providerDetails.service_categories}</span></p>
          <p>Service Description: <span>{providerDetails.service_description}</span></p>
          <p>Service Pricing: <span>{providerDetails.service_pricing}</span></p>
          <p>Availability: <span>{providerDetails.availability}</span></p>
          <p>Preferred Communication Channels: <span>{providerDetails.preferred_communication_channels}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
