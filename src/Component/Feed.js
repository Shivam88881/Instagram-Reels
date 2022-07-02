import * as React from 'react'
import { useContext } from 'react';
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';


import './Feed.css'
import { AuthContext } from './AuthContext';
import {database, storage} from '../firebase'
import UploadFiles from './UploadFiles';
import Posts from './Posts';
import FeedLogo from './images/FeedLogo.jpg'

import Button from '@mui/material/Button';



function Feed() {

  let history=useNavigate();

  const {user} =useContext(AuthContext);
  // console.log(user);


  const {logout}=useContext(AuthContext);

  const handleClick= async ()=>{
    let lgout=await logout();
    // console.log(user);

  }

  const [userData,setUserData] = useState('')

    useEffect(()=>{
      if(user==null){
        // console.log('not logged in');
        history("/login")
        return;
      }

      const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
          setUserData(snapshot.data())
      })
      return ()=> {unsub()}
    },[user])


  return (
    <>
        <div className='FeedLogo'>
          <img src={FeedLogo} />
          {/* <button onClick={handleClick} style={{marginLeft:'10px'}}>Logout</button> */}
          <Button variant="outlined" color="primary" onClick={handleClick} className='Feed-btn'>Logout</Button>
        </div>
        <div className='feed-container'> 
          <div  className='feed-container-container'>
            {/* {console.log(user)} */}
            <UploadFiles user={userData}/>
            <Posts user={userData}/>
          </div>
        </div>
    </>
  )
}

export default Feed