import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({children} : {children : React.ReactNode}) {

  const appContext = useAuth();
  if (!appContext) return null;
  const {currentUser} = appContext;

  return currentUser ? <>{children}</> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;