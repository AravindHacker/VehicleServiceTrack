import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import Cookies from 'js-cookie';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('jwt_token');
        navigate('/'); 
        window.location.reload();
    };

    return (
        <>  
            <div className='header-cont'>
                <ul className='menu-list'>
                    <Link to="/owner/Profile info" className='header-menu-link'>
                        <li className='header-profile'>Profile</li>
                    </Link>
                    <Link to='/owner' className='header-menu-link'>
                        <li className='home'>Home</li> 
                    </Link>
                    <li className='logout' onClick={handleLogout}>LogOut</li>  
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
                <img 
                    src='https://cdn-icons-png.flaticon.com/128/4043/4043198.png' 
                    alt='logout'
                    className='logout-icon-size'
                    onClick={handleLogout}
                />
            </div>
        </>
    )
}

export default Header;
