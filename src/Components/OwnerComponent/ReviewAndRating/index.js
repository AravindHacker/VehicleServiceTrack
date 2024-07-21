
import React, { useState, useEffect } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import config from '../../../config';
import './index.css';

const ReviewForm = ({ ownerId }) => {
  const [rating, setRating] = useState(1); 
  const [review, setReview] = useState('');
  const [serviceData, setServiceData] = useState(null);
  const [shouldDisplayForm, setShouldDisplayForm] = useState(false); 

  const storedUserData = JSON.parse(localStorage.getItem('OwnerInfo'));

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/All-update-status`);
        const completedService = response.data.find(data => data.status === 'completed' && data.owner_id === storedUserData.id);

        if (completedService && !localStorage.getItem(`reviewed-${completedService.serviceId}`)) {
          setServiceData(completedService);
          setShouldDisplayForm(true);
        }
      } catch (error) {
        console.error('Error fetching service data:', error);
      }
    };

    fetchServiceData();
  }, [storedUserData.id]);

  const onStarClick = (nextValue) => {
    setRating(nextValue); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceData) {
      alert('Service data is not available yet. Please try again later.');
      return;
    }

    try {
      await axios.post(`${config.apiBaseUrl}/reviews`, {
        profile_pic: storedUserData.profile_pic_path,
        owner_name: storedUserData.username,
        owner_id: storedUserData.id,
        provider_id: serviceData.provider_id,
        service_id: serviceData.serviceId,
        review: review,
        rating: rating,
      });

      console.log('Review submitted successfully.');
      localStorage.setItem(`reviewed-${serviceData.serviceId}`, 'true'); 
      setShouldDisplayForm(false); 
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    shouldDisplayForm ? (
      <div>
        <h2>Submit a Review</h2>
        <form onSubmit={handleSubmit} className='review-rating-cont'>
          <div>
            <label className='rating-label'>Rating:</label>
            <StarRatingComponent
              name="rating"
              starCount={5}
              value={rating}
              onStarClick={onStarClick}
            />
          </div>
          <div>
            <label className='review-label'>Review:</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </div>
          <button type="submit" className='review-btn'>Submit Review</button>
        </form>
      </div>
    ) : (
      <p>No review needed at this time.</p>
    )
  );
};

export default ReviewForm;
