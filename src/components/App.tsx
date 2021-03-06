import Dashboard from './Dashboard';
import { Route, Routes } from 'react-router-dom';
import AuthProvider from '../contexts/AuthContext';
import Signin from './Signin';
import PrivateRoute from '../routes/PrivateRoute';
import AlreadyLoggedRoute from '../routes/AlreadyLoggedRoute';

function App() {
  return (
    <div className="App">
       <AuthProvider>
        <Routes>
          <Route 
            path="sign-in" 
            element={
              <AlreadyLoggedRoute>
                <Signin />
              </AlreadyLoggedRoute>
            } />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
        </Routes>
       </AuthProvider>
    </div>
  );
}

export default App;
