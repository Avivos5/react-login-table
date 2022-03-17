import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {

   const navigate = useNavigate();

   const appContext = useAuth();
   if (!appContext) return null;
   const {logout} = appContext;

   const handleLogout = () : void =>{
      logout();
      navigate("/sign-in")
   }

  return ( 
     <>
      <h1>Dashboard</h1>
      <Button variant="contained" onClick={handleLogout}>Logout</Button>
     </>
   );
}

export default Dashboard;