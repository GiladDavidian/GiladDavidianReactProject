import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { MyContext } from '../App';
import { useCustomTheme } from '../ThemeContext';
import './Header.css';

export default function Header({ user, searchTerm, setSearchTerm }) {
    const { setUser, setIsLoader } = useContext(MyContext);
    const { theme, toggleTheme } = useCustomTheme();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logout = () => {
        setIsLoader(true);
        localStorage.removeItem('token');
        setUser(null);
        navigate('/')
        setIsLoader(false);
    };

    const titleButtonHeader = () => {
        setIsLoader(true)
        navigate('/')
        setIsLoader(false)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <ul className="Header">
            <li><button onClick={titleButtonHeader}>BCard</button></li>
            <li className="hamburger-icon" onClick={toggleMenu}>
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </li>

            <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li><Link to="/about">ABOUT</Link></li>
                {user && (
                    <>
                        <li><Link to={"/favcards"}>FAV CARDS</Link></li>
                        {user.isBusiness && <li><Link to={"/myCards"}>MY CARDS</Link></li>}
                        {user.isAdmin && (
                            <>
                                <li><Link to={"/myCards"}>MY CARDS</Link></li>
                                <li><Link to={"/sandbox"}>SANDBOX</Link></li>
                            </>
                        )}
                    </>
                )}
                <li className="input_group">
                    <input type="search" placeholder="Search.." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    <div className="search_icon"><SearchIcon /></div>
                </li>
                <li onClick={toggleTheme} className='liAdds'>
                    {theme === 'light' ? <ModeNightIcon /> : <LightModeIcon />}
                </li>
                {!user && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign up</Link></li>
                    </>
                )}
                {user && (
                    <>
                        <li className='liAdds'><AccountCircleIcon /></li>
                        <li onClick={logout} className='liAdds'><LogoutIcon /></li>
                    </>
                )}
            </div>
        </ul>
    );
}
