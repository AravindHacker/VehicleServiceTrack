import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const FirstLogin = () => {
  return (
    <div className='bg-cont'>
        <h1 className='first-login'>Select which type You are Locking ?</h1>
        <div className='type-user'>
              <Link to='/owner-register' className='sec-link'>

                <div className='owner-sec'>

                    <img src='https://img.freepik.com/premium-vector/concept-buying-renting-new-red-car-seller-owner-new-machine-modern-flat-style-illustration-isolated_195647-28.jpg?w=996' className='owner-img' alt='owner-img' />
                    <p className='user-name'>Vehicle Ownwer</p>
                </div>
              </Link>
              
              <Link to='/provider-register' className='sec-link'>

                <div className='provider-sec'>

                    <img src='https://st.depositphotos.com/1006018/4536/v/950/depositphotos_45362811-stock-illustration-mechanic-holding-spanner-toolbox-circle.jpg' className='provider-img' alt='provider-img' />
                    <p className='user-name'>Service Provider</p>
                </div>   
              </Link>
        </div>
    </div>
  )
}

export default FirstLogin
