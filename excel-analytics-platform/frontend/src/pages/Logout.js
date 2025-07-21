import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session
    localStorage.removeItem('token'); // remove any auth data
    localStorage.removeItem('user');  // optional
    sessionStorage.clear();           // optional, if used

    // Redirect after 2 seconds
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 2000);

    // Cleanup timeout on unmount
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>You have been logged out.</h2>
      <p>Redirecting to login page...</p>
    </div>
  );
};

export default Logout;
