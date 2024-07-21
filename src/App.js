import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';
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
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthProvider>
          <Router >
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login-type" element={<FirstLogin />} />
              
              <Route path="/owner-register" element={<ProtectedRoute element={<OwnerRegister />} />} />
              <Route path="/provider-register" element={<ProtectedRoute element={<ServiceProviderForm />} />} />
              <Route path="/owner" element={<ProtectedRoute element={<OwnerCom />} />} />
              <Route path="/provider" element={<ProtectedRoute element={<ProviderCom />} />} />
              <Route path="/owner/Profile info" element={<ProtectedRoute element={<ProfileInfo />} />} />
              <Route path="/provider/Profile" element={<ProtectedRoute element={<ProviderProfile />} />} />
              <Route path="/owner/Allproviders" element={<ProtectedRoute element={<ServiceProviders />} />} />
              <Route path="/owner/reqservice" element={<ProtectedRoute element={<RequestService />} />} />
              <Route path="/owner/vechile info" element={<ProtectedRoute element={<VehicleInfo />} />} />
              <Route path="/provider/service-info" element={<ProtectedRoute element={<ServiceReceived />} />} />
              <Route path="/profilepic" element={<ProtectedRoute element={<ProfilePic />} />} />
              <Route path="/providerpics" element={<ProtectedRoute element={<ProviderProfilePic />} />} />
              <Route path="/owner/Upcomingservice" element={<ProtectedRoute element={<UpcomingService />} />} />
              <Route path="/provider/upcomingservices" element={<ProtectedRoute element={<ProUpcomingService />} />} />
              <Route path="/provider/scheduled-service" element={<ProtectedRoute element={<ScheduledService />} />} />
              <Route path="/owner/servicehistory" element={<ProtectedRoute element={<ServiceHistory />} />} />
              <Route path="/owner/notification" element={<ProtectedRoute element={<Notifications />} />} />
              <Route path="/review" element={<ProtectedRoute element={<ReviewForm />} />} />
              <Route path="/provider/rating&review" element={<ProtectedRoute element={<Reviews />} />} />
              <Route path="/provider/service-history" element={<ProtectedRoute element={<ProviderServiceHistory />} />} />
            </Routes>
          </Router>
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;
