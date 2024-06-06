import { Outlet, Navigate } from 'react-router-dom';

const ProductedRoute = ({ authData }) => {
  if (!authData.isLoggedIn) {
    return <Navigate to={'/login'} replace />;
  }
  return <Outlet />;
};

export default ProductedRoute;
