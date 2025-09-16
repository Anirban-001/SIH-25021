import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Type for the props
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      navigate('/login', { 
        replace: true,
        state: { from: location.pathname } 
      });
    }
  }, [navigate, location.pathname]);

  // Check if the user is authenticated before rendering the children
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // Return the children only if authenticated
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;