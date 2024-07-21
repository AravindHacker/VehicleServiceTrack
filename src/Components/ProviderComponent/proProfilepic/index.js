
import React, { useState, useEffect } from 'react';
import config from '../../../config';
import axios from 'axios';

const ProviderProfilePic = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [uploadError, setUploadError] = useState('');

    useEffect(() => {
        const providerInfoStr = localStorage.getItem('ProviderInfo');
        if (providerInfoStr) {
            const providerInfo = JSON.parse(providerInfoStr);
            setProfilePic(providerInfo.profilePic);
        }
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('provider-profilePic', selectedFile);

        const providerInfoStr = localStorage.getItem('ProviderInfo');
        if (!providerInfoStr) {
            setUploadError('Provider information not found. Please log in again.');
            return;
        }

        const providerInfo = JSON.parse(providerInfoStr);
        formData.append('ProviderId', providerInfo.id);
        console.log('form data :',formData)

        try {
            const response = await axios.post(`${config.apiBaseUrl}/providerpics`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const filePath = response.data.filePath;
            setProfilePic(filePath);

            providerInfo.profilePic = filePath;
            localStorage.setItem('ProviderInfo', JSON.stringify(providerInfo));
            setUploadError('');
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadError('Failed to upload image. Please try again.');
        }
    };

    return (
        <div className="profile">
            {profilePic ? (
                <img src={`${config.apiBaseUrl}/${profilePic}`} alt="Profile" className="uploaded-profile-pic" />
            ) : (
                <p>Upload profile.</p>
            )}
            <input type="file" className="profile-size" onChange={handleFileChange} />
            <button onClick={handleUpload} className="upload-btn">Upload</button>
            {uploadError && <p className="error">{uploadError}</p>}
        </div>
    );
};

export default ProviderProfilePic;
