import { Link } from 'react-router-dom';
import './index.css'

const Header=()=>{
    return(
      <>  
        <div className='header-cont'>
            <ul className='menu-list'>
                <Link to="/owner/Profile info" className='header-menu-link'>
                   <li className='header-profile'>Profile</li>
                </Link>
                <Link to='/owner' className='header-menu-link'>
                <li className='home'>Home</li> 
                </Link>
                <Link to="/logout" className='header-menu-link'>
                  <li className='logout'>LogOut</li>
                </Link>  
            </ul>
        </div>
        <div className='header-cont-icons'>
            <Link to="/owner/Profile info" className='header-menu-link'>
                <img src='https://cdn-icons-png.flaticon.com/128/3135/3135715.png' alt='profile'
                className='profile-icon-size'/>
             </Link>
             <Link to="/owner" className='header-menu-link'>
               <img src='https://cdn-icons-png.flaticon.com/128/2549/2549900.png' alt='Home'
                 className='home-icon-size'/>
             </Link>
             <Link to="/logout " className='header-menu-link'>    
               <img src='https://cdn-icons-png.flaticon.com/128/4043/4043198.png' alt='logout'
                 className='logout-icon-size'/>
             </Link> 
        </div>
    </>
    )
}
export default Header;