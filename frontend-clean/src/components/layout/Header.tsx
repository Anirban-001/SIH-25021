import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiBell, FiSettings, FiMenu } from 'react-icons/fi';
import './Header.css';

interface User {
  name: string;
  email: string;
  role: string;
}

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    // Load user from localStorage on component mount
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const userData = JSON.parse(userJson);
        setUser(userData);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
    
    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    
    // Navigate to login page
    navigate('/login');
  };
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="logo">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <h1>RailTrack Insights</h1>
      </div>
      
      <div className="nav-actions">
        <div className="header-icon">
          <FiBell />
          <span className="notification-badge">7</span>
        </div>
        
        <div className="user-profile" onClick={toggleDropdown}>
          <div className="user-avatar">
            <FiUser />
          </div>
          <div className="user-info">
            <div className="user-name">{user?.name || 'Guest'}</div>
            <div className="user-role">{user?.role || 'Not logged in'}</div>
          </div>
          
          {dropdownOpen && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-user-name">{user?.name}</div>
                <div className="dropdown-user-email">{user?.email}</div>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <div className="dropdown-item" onClick={() => navigate('/settings')}>
                <FiSettings className="dropdown-item-icon" />
                <span>Settings</span>
              </div>
              
              <div className="dropdown-item" onClick={handleLogout}>
                <FiLogOut className="dropdown-item-icon" />
                <span>Sign out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;