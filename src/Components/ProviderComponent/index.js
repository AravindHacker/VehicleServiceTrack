import React from 'react'
import { Link } from 'react-router-dom';
import ProHeader from './ProHeader';
import './index.css'

const ProviderCom = () => {
  return (
    <div className='provider-home'>
           <div className='pro-header-container'>
               <ProHeader />
            </div>
        <div className='provider-main-cont'>
            <div className='provider-container'>
                <Link to='/provider/Profile' className='provider-box-link'>
                    <p className='provider-box'>
                        Profile Information
                    </p>
                </Link>
                <Link to='/provider/service-info' className='provider-box-link'>
                    <p className='provider-box'>
                        Services Received
                    </p>
                </Link>
                <Link to='/provider/scheduled-service' className='provider-box-link'>
                    <p className='provider-box'>
                        Scheduled Service
                    </p>
                </Link>
            
            
            </div>
            <div className='provider-container'>
                    <Link to='/provider/upcomingservices' className='provider-box-link'>
                        <p className='provider-box'>
                            Upcoming Services
                        </p>  
                    </Link>
                    <Link to='/provider/service-history' className='provider-box-link' >
                    <p className='provider-box'>
                          Service History
                    </p>
                    </Link>
                    <Link to='/provider/rating&review' className='provider-box-link'>
                    <p className='provider-box'>
                         Review & Ratings
                    </p>
                    </Link>
            </div>
        </div>
    </div>
  )
}
export default ProviderCom;
