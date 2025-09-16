import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/Dashboard/Dashboard';
// Re-import Inventory with a different approach
import Inventory from '../pages/Inventory/Inventory.tsx';
import Suppliers from '../pages/Suppliers/Suppliers';
import Reports from '../pages/Reports/Reports';
import Analytics from '../pages/Analytics/Analytics';
import Settings from '../pages/Settings/Settings';
import Login from '../pages/Auth/Login';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Create router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'inventory',
        element: <Inventory />
      },
      {
        path: 'suppliers',
        element: <Suppliers />
      },
      {
        path: 'reports',
        element: <Reports />
      },
      {
        path: 'analytics',
        element: <Analytics />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      // Catch-all route for protected area
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  // Global catch-all route
  {
    path: '*',
    element: <Navigate to="/login" replace />
  }
]);

export default router;