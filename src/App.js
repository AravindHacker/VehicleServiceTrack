import React from 'react';
import { BrowserRouter as Router ,Route ,Routes} from 'react-router-dom';

import FirstLogin from './Components/FirstLogin';
import Login from './Components/Login';
import OwnerCom from './Components/OwnerComponent';
import ProviderCom from './Components/ProviderComponent';
import ProfileInfo from './Components/OwnerComponent/ProfileInfo';
import ServiceProviderForm from './Components/ProviderComponent/ProviderRegister';
import RequestService from './Components/OwnerComponent/ServiceReq';
import VehicleInfo from './Components/OwnerComponent/VehicleInfo';
import OwnerRegister from './Components/OwnerComponent/OwnerRegister';
import ProviderProfile from './Components/ProviderComponent/ProviderProfile';
import ServiceProviders from './Components/OwnerComponent/Service Providers';
import ServiceReceived from './Components/ProviderComponent/ServiceReceived';
import ProfilePic from './Components/OwnerComponent/ProfilePic';
import ProviderProfilePic from './Components/ProviderComponent/proProfilepic';
import UpcomingService from './Components/OwnerComponent/UpcomingService';
import ProUpcomingService from './Components/ProviderComponent/UpcomingServiceNotifiction';
import ScheduledService from './Components/ProviderComponent/ScheduleService';
import ServiceHistory from './Components/OwnerComponent/ServiceHistory';
import Notifications from './Components/OwnerComponent/serviceTracking';
import ReviewForm from './Components/OwnerComponent/ReviewAndRating';
import Reviews from './Components/ProviderComponent/RatingAndReviews';
import ProviderServiceHistory from './Components/ProviderComponent/proSerivceHistory';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                 <Router>
                  <Routes>
                    <Route exact path='/' element={<FirstLogin />} />
                    <Route exact path='/owner-register' element={<OwnerRegister />} />
                    <Route exact path='/provider-register' element={< ServiceProviderForm/>} />
                    <Route exact path='/owner' element={<OwnerCom />} />
                    <Route exact path='/provider' element={<ProviderCom/>} />
                    <Route exact path='/owner/Profile info' element={<ProfileInfo/>} />
                    <Route exact path='/provider/Profile' element={<ProviderProfile/>} />
                    <Route exact path='/owner/Allproviders' element={<ServiceProviders />}/>
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/owner/reqservice' element={<RequestService/>} />
                    <Route exact path='/owner/vechile info' element={<VehicleInfo/>} />
                    <Route exact path='/provider/service-info' element={<ServiceReceived/>} />
                    <Route exact path='/profilepic' element={<ProfilePic/>} />
                    <Route exact path='/providerpics' element={<ProviderProfilePic/>}/>
                    <Route exact path='/owner/Upcomingservice' element={<UpcomingService/>}/>
                    <Route exact path='/provider/upcomingservices' element={<ProUpcomingService />} />
                    <Route exact path='/provider/scheduled-service' element={<ScheduledService/>}/>
                    <Route exact path='/owner/servicehistory' element={<ServiceHistory/>}/>
                    <Route exact path='/owner/notification' element={<Notifications/>}/>
                    <Route exact path='/review' element={<ReviewForm/>}/>
                    <Route exact path='/provider/rating&review' element={<Reviews/>}/>
                    <Route exact path='/provider/service-history' element={<ProviderServiceHistory/>}/>

                   </Routes> 
                </Router> 
            </header>
        </div>
    );
}

export default App;