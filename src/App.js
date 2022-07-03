import logo from './logo.svg';
import './App.css';
import SignUp from './Component/SignUp'
import Login from './Component/Login'
import Feed from './Component/Feed';
import ForgotPassword from './Component/ForgotPassword';
import Profile from './Component/Profile';
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
          <Route path="/profile:id" element={<Profile/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/" element={<Feed/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
