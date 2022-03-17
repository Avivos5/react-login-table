import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AlreadyLoggedRoute({children} : {children : React.ReactNode}) {

  const appContext = useAuth();
  if (!appContext) return null;
  const {currentUser} = appContext;

  return !currentUser ? <>{children}</> : <Navigate to="/" />;
}

export default AlreadyLoggedRoute;