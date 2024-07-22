import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import './index.css';

const ProfilePic = ({ onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [uploadError, setUploadError] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const ownerInfoStr = localStorage.getItem('OwnerInfo');
        if (ownerInfoStr) {
            const ownerInfo = JSON.parse(ownerInfoStr);
            setProfilePic(ownerInfo.profilePic);
        }
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadError('Please select a file to upload.');
            return;
        }

        setIsUploading(true);
        setUploadError('');

        const formData = new FormData();
        formData.append('profilePic', selectedFile);

        const ownerInfoStr = localStorage.getItem('OwnerInfo');
        if (!ownerInfoStr) {
            setUploadError('Owner information not found. Please log in again.');
            setIsUploading(false);
            return;
        }

        const ownerInfo = JSON.parse(ownerInfoStr);
        formData.append('ownerId', ownerInfo.id);

        try {
            const response = await axios.post(`${config.apiBaseUrl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const filePath = response.data.filePath;
            setProfilePic(filePath);

            ownerInfo.profilePic = filePath;
            localStorage.setItem('OwnerInfo', JSON.stringify(ownerInfo));
            setIsUploading(false);
            onUpload(filePath); 
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadError('Failed to upload image. Please try again.');
            setIsUploading(false);
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
            <button onClick={handleUpload} className="upload-btn" disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Upload'}
            </button>
            {uploadError && <p className="error">{uploadError}</p>}
        </div>
    );
};

export default ProfilePic;
