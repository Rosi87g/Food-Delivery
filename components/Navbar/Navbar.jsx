import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { getTotalCartItems, token, setToken, searchQuery, setSearchQuery } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    setLoggingOut(true);
    localStorage.removeItem("token");
    setToken("");
    setShowLogoutConfirm(false);
    toast.info("You have been logged out 👋");
    navigate("/");
    setLoggingOut(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const section = document.getElementById("explore-menu");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      toast.warn("Please enter a search term");
    }
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>

      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact-us</a>
      </ul>

      <div className='navbar-right'>
        <div className='navbar-search-icon'>
          <img
            src={assets.search_icon}
            alt="Search"
            onClick={() => setShowSearchInput(prev => !prev)}
            style={{ cursor: "pointer" }}
          />
        </div>

        {showSearchInput && (
          <div className='navbar-search'>
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>
              <img src={assets.search_icon} alt="Search" />
            </button>
          </div>
        )}

        <Link to='/cart'>
          <img src={assets.basket_icon} alt="Cart" />
          {getTotalCartItems() > 0 && (
            <div className="cart-count">{getTotalCartItems()}</div>
          )}
        </Link>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign Up/Login</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={() => setShowLogoutConfirm(true)}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>

      {showLogoutConfirm && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <p>Are you sure you want to log out?</p>
            <div className="logout-modal-buttons">
              <button onClick={logout} disabled={loggingOut}>Yes</button>
              <button onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
