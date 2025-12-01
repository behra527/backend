import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo');
  
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  try {
    const { user } = JSON.parse(userInfo);
    if (user.role !== 'admin') {
      localStorage.removeItem('userInfo');
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    localStorage.removeItem('userInfo');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

