import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../Header';
import './index.css'
const OwnerCom = () => {
  return (
    <div className='owner-home'>
       <div className='header-container'>
          < Header />
       </div>

        <div className='onwer-main-cont'>
            <div className='owner-container'>
                <Link to='/owner/Profile info' className='owner-box-link'>
                    <p className='owner-box'>
                        Profile Information
                    </p>
                </Link>
                <Link to='/owner/vechile info' className='owner-box-link'>
                    <p className='owner-box'>
                        Vechical Information
                    </p>
                </Link>
                <Link to='/owner/servicehistory' className='owner-box-link'>
                <p className='owner-box'>
                    Service History
                </p>
                </Link>
            
            
            </div>
            <div className='owner-container'>
                        <Link to='/owner/reqservice' className='owner-box-link'>
                        <p className='owner-box'>
                            Request Service
                        </p>  
                    </Link>
                    <Link to='/owner/Upcomingservice' className='owner-box-link'>
                        <p className='owner-box'>
                            Upcoming Service Remainder
                        </p>
                    </Link>
                    <Link to='/owner/Allproviders' className='owner-box-link'>
                        <p className='owner-box'>
                            Service Provider Directory
                        </p>
                    </Link>
            </div>
        </div>
    </div>
  )
}
export default OwnerCom;
