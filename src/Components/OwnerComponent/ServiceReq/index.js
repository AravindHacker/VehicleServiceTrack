import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import config from '../../../config';
import './index.css'

const RequestService = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        
        vehicleMake: '',
        vehicleModel: '',
        year: '',
        vin: '',
        licensePlate: '',
        serviceType: '',
        description: '',
        preferredDate: '',
        preferredTime: '',
        serviceLocation: '',
        additionalComments: ''
    });

     useEffect(() => {
        const storedFormData = localStorage.getItem('serviceRequest');
        if (storedFormData) {
            setFormData(JSON.parse(storedFormData));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const storedUserData = JSON.parse(localStorage.getItem('OwnerInfo'));
    const ownerId = storedUserData?.id; 
    const handleChooseProvider = () => {
        localStorage.setItem('serviceRequest', JSON.stringify(formData,ownerId));
        navigate('/owner/Allproviders');
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();

         
          const requestPayload = {
            ...formData,
            ownerId
        };

        try {
            const response = await axios.post(`${config.apiBaseUrl}/request-service`, requestPayload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);

            alert("service Request Sucessfully ")
            setFormData({
                vehicleMake: '',
                vehicleModel: '',
                year: '',
                vin: '',
                licensePlate: '',
                serviceType: '',
                description: '',
                preferredDate: '',
                preferredTime: '',
                serviceLocation: '',
                additionalComments: ''
            });
            
        } catch (error) {
            console.error(error);
        }
        navigate('/owner/vechile info')
    };

    const onResetBtn=()=>{
        setFormData({
            vehicleMake: '',
            vehicleModel: '',
            year: '',
            vin: '',
            licensePlate: '',
            serviceType: '',
            description: '',
            preferredDate: '',
            preferredTime: '',
            serviceLocation: '',
            additionalComments: ''
        });
    }
    return (
       <div className='request-service-cont'> 
           <div className='req-service-header'>
                <Header />
          </div> 

          <h2 className='req-header'>Request  Service</h2>

        <form onSubmit={handleSubmit} >
           <div className='reqservice-form'>
            <div className='vehicle-info'>

                <label>
                    Vehicle Model:
                    <input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} required  className='req-input'/>
                </label>   

                <label>
                    Vehicle Make:
                    <input type="text" name="vehicleMake" value={formData.vehicleMake} onChange={handleChange} required className='req-input'/>
                </label>

                <label>
                    Manufacturing year:
                    <input type="text" name="year" value={formData.year} onChange={handleChange} required className='req-input'/>
                </label>

                <label>
                    VIN <span className='span-tag'>(Vehicle Identification Number)</span>:
                    <input type="text" name="vin" value={formData.vin} onChange={handleChange} required className='req-input'/>
                </label>

                <label>
                    License Plate Number:
                    <input type="text" name="licensePlate" value={formData.licensePlate} onChange={handleChange} required className='req-input'/>
                </label>
            </div>
            <div className='service-info'>
                    <label>
                        Service Type:
                        <select name="serviceType" value={formData.serviceType} onChange={handleChange} required className='selection-menu'>
                            <option value="">Select a service</option>
                            <option value="oilChange">Oil Change</option>
                            <option value="tireRotation">Tire Rotation</option>
                            <option value="brakeInspection">Brake Inspection</option>
                            <option value="other">Other</option>
                        </select>
                    </label>

                    <label>
                        Detailed Description:
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </label>

                    <label>
                        Preferred Service Date:
                        <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required className='req-input'/>
                    </label>

                    <label>
                        Preferred Service Time:
                        <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} required className='req-input'/>
                    </label>

                    <label>
                        Service Location:
                        <input type="text" name="serviceLocation" value={formData.serviceLocation} onChange={handleChange} required className='req-input'/>
                     </label>

                    <label>
                        Additional Comments:
                        <textarea name="additionalComments" value={formData.additionalComments} onChange={handleChange} />
                    </label>


                </div>
            </div>
            <button type='button' onClick={handleChooseProvider} className='select-provider'> select service provider</button>

            <button type="submit" className='sumbmit-request-btn'>Submit Request</button>
            <button type="reset" className='Reset-provider' onClick={onResetBtn}>Reset</button>
             </form>
       </div> 
    );
};

export default RequestService;
