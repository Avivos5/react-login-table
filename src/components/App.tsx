import Dashboard from './Dashboard';
import { Route, Routes } from 'react-router-dom';
import Signin from './Signin';

function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="sign-in" element={<Signin />} />
        </Routes>
    </div>
  );
}

export default App;
