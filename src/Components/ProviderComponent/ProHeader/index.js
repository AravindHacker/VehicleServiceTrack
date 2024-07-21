import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './index.css'

const ProHeader=()=>{
  const navigate = useNavigate();

  const handleLogout = () => {
      Cookies.remove('jwt_token'); 
      navigate('/'); 
  };
    return(
      <>  
        <div className='header-cont'>
            <ul className='providers-menu-list'>
                <Link to="/provider/Profile" className='provider-header-menu-link'>
                   <li className='provider-header-profile'>Profile</li>
                </Link>
                <Link to="/provider" className='provider-header-menu-link'>
                <li className='provider-home-bar'>Home</li> 
                </Link>
                <Link to="/logout" className='provider-header-menu-link'>
                  <li className='provider-logout' onClick={handleLogout}>LogOut</li>
                </Link>  
            </ul>
        </div>
        <div className='provider-header-cont-icons'>
            <Link to="/provider/Profile" className='provider-header-menu-link'>
                <img src='https://cdn-icons-png.flaticon.com/128/3135/3135715.png' alt='profile'
                className='provider-profile-icon-size'/>
             </Link>
             <Link to="/provider" className='provider-header-menu-link'>
               <img src='https://cdn-icons-png.flaticon.com/128/2549/2549900.png' alt='Home'
                 className='provider-home-icon-size'/>
             </Link>
             <Link to="/logout " className='provider-header-menu-link' onClick={handleLogout}>    
               <img src='https://cdn-icons-png.flaticon.com/128/4043/4043198.png' alt='logout'
                 className='provider-logout-icon-size'/>
             </Link> 
        </div>
    </>
    )
}
export default ProHeader;