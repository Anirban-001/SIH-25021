import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiPackage, 
  FiUsers, 
  FiFileText, 
  FiBarChart2
} from 'react-icons/fi';
import './Sidebar.css';

interface SidebarProps {
  isOpen?: boolean;
}

const Sidebar = ({ isOpen = false }: SidebarProps) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <FiHome /> },
    { name: 'Inventory', path: '/inventory', icon: <FiPackage /> },
    { name: 'Suppliers', path: '/suppliers', icon: <FiUsers /> },
    { name: 'Reports', path: '/reports', icon: <FiFileText /> },
    { name: 'Analytics', path: '/analytics', icon: <FiBarChart2 /> },
  ];

  // Use the useLocation hook to determine the active nav item
  const location = useLocation();
  
  // Helper function to determine if a navigation item is active
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="nav-items">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="nav-item-icon">{item.icon}</span>
            <span className="nav-item-text">{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;