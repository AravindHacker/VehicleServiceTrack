import React, { useEffect, useState } from 'react';
import ProHeader from '../ProHeader';
import axios from 'axios';
import config from '../../../config';
import './index.css'

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const defaultImage="https://cdn-icons-png.flaticon.com/512/13695/13695871.png"

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('ProviderInfo'));
        const providerId=storedUserData.id
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/All-reviews&rating`);
                console.log(response.data)
                const filteredReviews = response.data.filter(review => review.provider_id === providerId);
                console.log("filtreview:",filteredReviews)
                setReviews(filteredReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className='reviwed-provider-container'>
            <ProHeader />
            <h1>Reviews & Rating</h1>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review.id} className='provider-review-rating'>
                        <img src={`${config.apiBaseUrl}/${review.profile_pic}`} alt="Profile"  className='owenr-reviewd-profile' 
                                onError={(e) => e.target.src = defaultImage}
                       />
                       <div className='review-rating-details'>
                            <p className='reviewed-name'><strong> {review.owner_name}</strong></p>
                            <p className='rating-color'> {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</p>
                            <p className='review-context'>{review.review}</p>

                            <p> {new Date(review.created_at).toLocaleDateString()}</p>
                        </div>    
                    </div>
                ))
            ) : (
                <p>No reviews available for this provider.</p>
            )}
        </div>
    );
};

export default Reviews;
