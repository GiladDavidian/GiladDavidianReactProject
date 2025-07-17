import { Link, Route, Routes } from 'react-router-dom';
import Cards from './components/Cards';
import { createContext, useEffect, useState } from "react";
import Header from './components/Header';
import Login from './components/Login';
import About from './components/About';
import { jwtDecode } from 'jwt-decode';
import Signup from './components/Signup';
import FavCards from './components/FavCards';
import AddCard from './components/AddCard';
import { FaInfoCircle, FaHeart } from 'react-icons/fa';
import { BsPersonSquare } from 'react-icons/bs';
import UpdateCard from './components/UpdateCard';
import MyCards from './components/MyCards';
import './App.css'

export const MyContext = createContext();

function App() {
  const [isLoader, setIsLoader] = useState(false);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [user, setUser] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [cards, setCards] = useState([]);
  const currentUserId = user ? user._id : ''

  const getCardsData = async () => {
    setIsLoader(true);
    const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`);

    if (res.ok) {
      const data = await res.json();
      setCards(data);
    }
    setIsLoader(false);
  };

  const snackbar = text => {
    setSnackbarText(text);
    setIsSnackbar(true);
    setTimeout(() => setIsSnackbar(false), 2 * 1000);
  }

  useEffect(() => {
    getCardsData()
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const data = jwtDecode(token);
        setUser(data)
      }
      catch (error) {
        console.error(error);
      }
    }
  }, [])

  return (
    <MyContext.Provider value={{ setIsLoader, snackbar, setUser, setCards, getCardsData }}>
      <div className="app-container">
        <Header user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="main-content-wrapper">
          <Routes>
            <Route path="/" element={<Cards user={user} searchTerm={searchTerm} cards={cards} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/favcards" element={<FavCards currentUserId={currentUserId} cards={cards} user={user} searchTerm={searchTerm} />} />
            <Route path="/addcard" element={<AddCard />} />
            <Route path="/updatecard/:id" element={<UpdateCard />} />
            <Route path="/mycards" element={<MyCards user={user} searchTerm={searchTerm} />} />
          </Routes>
        </div>

        {isLoader &&
          <div className="loaderFrame"><div className="loader"></div></div>}
        {isSnackbar && <div className="snackbar">{snackbarText}</div>}

        <footer className='myFooter'>
          <button className='footerBtns'>
            <Link to={'/about'} className='footerLinkContent'>
              <FaInfoCircle className='footerIcons' />
              <span>About</span>
            </Link>
          </button>

          {user && (
            <>
              <button className='footerBtns'>
                <Link to={'/favcards'} className='footerLinkContent'>
                  <FaHeart className='footerIcons' />
                  <span>My Favorites</span>
                </Link>
              </button>

              {user.isBusiness && (
                <button className='footerBtns'>
                  <Link to={'/'} className='footerLinkContent'>
                    <BsPersonSquare className='footerIcons' />
                    <span>My Cards</span>
                  </Link>
                </button>
              )}

              {user.isAdmin && (
                <button className='footerBtns'>
                  <Link to={'/mycards'} className='footerLinkContent'>
                    <BsPersonSquare className='footerIcons' />
                    <span>My Cards</span>
                  </Link>
                </button>
              )}
            </>
          )}
        </footer>
      </div>
    </MyContext.Provider>
  );
}

export default App;