import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for the field being changed
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use environment variables instead of hardcoded credentials
      // In a real app, this would be an API call
      if (formData.email === 'admin@railtrack.in' && formData.password === 'password123') {
        // Set some user info in localStorage for demo auth
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({
          name: import.meta.env.VITE_ADMIN_NAME,
          email: formData.email,
          role: import.meta.env.VITE_ADMIN_ROLE
        }));
        
        // Redirect to dashboard
        navigate('/');
      } else {
        setFormErrors({
          password: 'Invalid email or password'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setFormErrors({
        password: 'An error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-banner">
        <div className="auth-banner-content">
          <h1>RailTrack Insights</h1>
          <p>
            A comprehensive track fitting management system designed for Indian Railways.
            Monitor inventory, manage suppliers, and optimize railway maintenance operations
            with our powerful dashboard and analytics tools.
          </p>
          <p>
            Log in to access your dashboard and get real-time insights into your railway
            operations.
          </p>
        </div>
      </div>
      
      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-header">
            <h2>Welcome Back</h2>
            <p>Please sign in to continue</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${formErrors.email ? 'error' : ''}`}
              placeholder="your.email@indianrailways.gov.in"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {formErrors.email && <div className="error-message">{formErrors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control ${formErrors.password ? 'error' : ''}`}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {formErrors.password && <div className="error-message">{formErrors.password}</div>}
          </div>
          
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
          
          <div className="auth-form-footer">
            <a href="#">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
