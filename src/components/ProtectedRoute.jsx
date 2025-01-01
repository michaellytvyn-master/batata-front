import { useContext } from 'react'
// import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If no user, redirect to login
  // return user ? children : <Navigate to="/login" />;
		return children
};

export default ProtectedRoute;
