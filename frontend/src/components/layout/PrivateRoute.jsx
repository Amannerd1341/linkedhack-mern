import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;