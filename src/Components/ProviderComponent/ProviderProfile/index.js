import React, { useEffect, useState } from 'react';
import ProviderProfilePic from '../proProfilepic';
import ProHeader from '../ProHeader';
import config from '../../../config';
import './index.css';

const ProviderProfile = () => {
  const [providerDetails, setProviderDetails] = useState(null);
  const [profileChange, setProfileChange] = useState(false);
  const placeholderImage="https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"

  useEffect(() => {
    const storedUserData = localStorage.getItem('ProviderInfo');
    console.log("storedData:", storedUserData);
    if (storedUserData) {
      setProviderDetails(JSON.parse(storedUserData));
    }
  }, []);

  if (!providerDetails) {
    return <div>Loading...</div>;
  }

  const onChangeProfile = () => {
    setProfileChange(!profileChange);
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
              src={providerDetails.profilePic ? `${config.apiBaseUrl}/${providerDetails.profilePic}` : placeholderImage} 
              alt="Profile" 
                className="provider-profile-image" 
              />
            </button>

            <div className='profile-pic-div'>
              {profileChange && <ProviderProfilePic />}
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
