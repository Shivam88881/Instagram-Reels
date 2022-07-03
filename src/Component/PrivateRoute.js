import React,{useContext} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { AuthContext } from './AuthContext';

function PrivateRoute({component:Component,...rest}) {

  const history=useNavigate()
    const {user} = useContext(AuthContext) 
    return (
        <>
        {console.log(user)}
          {user!=null?<Component/>:<Navigate to='/login' />}
          
        </>
    )
}

export default PrivateRoute