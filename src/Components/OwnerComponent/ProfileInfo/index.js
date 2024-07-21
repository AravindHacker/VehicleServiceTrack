import React, { useEffect, useState } from 'react';
import ProfilePic from '../ProfilePic';
import Header from '../../Header';
import config from '../../../config';
import './index.css'

const OwnerDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [profileChange,setProfileChange]=useState(false)
    const placeholderImage="https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"

    useEffect(() => {
        const fetchData = async () => {
            const storedUserData = localStorage.getItem('OwnerInfo');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            }
        };

        fetchData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }
    const onChangeProfile=()=>{
        setProfileChange(!profileChange)
    }

    return (
        <div className='owner-details'>
                <Header/>

            <div className='owner-profile-cont'>
                <div className='owner-profile-edit-cont'>
                    <button type='button' className='owner-edit-profile' onClick={onChangeProfile}>
                            <img 
                                src={userData.profilePic ? `${config.apiBaseUrl}/${userData.profilePic}` : placeholderImage} 
                                alt="Profile" 
                                className="owner-profile-pic" 
                            />
                        
                    </button>
                    <div className='owner-profile-pic-div'>
                        {profileChange && <ProfilePic />}
                    </div> 
                </div>
               <div className="owner-personal-details ">   
                <p className='lable-name'>Username: <span className='owner-lable-name'>{userData.username}</span></p>
                <p className='lable-name'>Email:<span className='owner-lable-name'>{userData.email}</span></p>
                <p className='lable-name'>Password:<span className='owner-lable-name'> ******</span></p>
                <p className='lable-name'>Contact: <span className='owner-lable-name'>{userData.contact}</span></p>
                <p className='lable-name'>Address:<span className='owner-lable-name'> {userData.address}</span></p>
                <p className='lable-name'>Role: <span className='owner-lable-name'>{userData.role}</span></p>
                <p className='lable-name'>Pincode:<span className='owner-lable-name'> {userData.pin_code}</span></p>
               </div> 
            </div>
        </div>
    );
};

export default OwnerDashboard;
