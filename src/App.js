import logo from './logo.svg';
import './App.css';
import SignUp from './Component/SignUp'
// import SignUp from './Component/SignUp1';
import Login from './Component/Login'
import Feed from './Component/Feed';
import {BrowserRouter,Route, Routes} from 'react-router-dom';

import { AuthProvider } from './Component/AuthContext';
import { AuthContext } from './Component/AuthContext';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/" element={<Feed/>}/>
          {/* <Route path="/profile" element={<Profile/>}/> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
