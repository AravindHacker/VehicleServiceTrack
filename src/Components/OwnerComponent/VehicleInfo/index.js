import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header';
import config from '../../../config';
import './index.css';

const VehicleInfo = () => {
    const [services, setServices] = useState([]);


    useEffect(() => {
        const fetchServiceInfo = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/serviceinfo`);
               const ownerInfo = JSON.parse(localStorage.getItem('OwnerInfo'));
                const owner_id=ownerInfo.id
            
                const filteredServices = response.data.filter(service => service.ownerId === owner_id.toString());


                setServices(filteredServices);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching service info:', error);

            }
        };

        fetchServiceInfo();
    }, []);

    return (
       <div className='vehicle-info-cont'> 
                    <Header />

         <div className='vehicle-info'>

            <h1>Vehicle Info</h1>
            {services.map((service, index) => (
                <div key={index} className="service-info-item">
                  
                    <label >
                        Vehicle Make:
                        <input type="text" name="vehicleMake" value={service.vehicle_make} readOnly />
                    </label>

                    <label>
                        Vehicle Model:
                        <input type="text" name="vehicleModel" value={service.vehicle_model} readOnly />
                    </label>

                    <label>
                        Manufacturing year:
                        <input type="text" name="year" value={service.year} readOnly />
                    </label>

                    <label>
                        VIN (Vehicle Identification Number):
                        <input type="text" name="vin" value={service.vin} readOnly />
                    </label>

                    <label>
                        License Plate Number:
                        <input type="text" name="licensePlate" value={service.license_plate} readOnly />
                    </label>
                </div>
            ))}
        </div>
      </div>
    );
};

export default VehicleInfo;
