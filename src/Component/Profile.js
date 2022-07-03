import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { database } from '../firebase'

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import Navbar from './Navbar'
import './Profile.css'
import Video from './Video'

function Profile() {

var {id}=useParams() 
id=id.substring(1)
// console.log(id)


const history=useNavigate()

const [userData,setuserData]=useState(null)
const [posts,setPosts]=useState(null)
var parr=[]

useEffect(()=>{
  database.users.doc(id).onSnapshot((snap)=>{
    setuserData(snap.data())
  })
},[id])

useEffect( ()=>{
    if(userData!=null){
      for(let i=0;i<userData.postIds.length;i++){
        let postdata=  database.posts.doc(userData.postIds[i]).get().then((ref)=>{
          parr.push(ref.data())
        })
      }
      console.log(parr)
      setPosts(parr)
    }
},[userData])



  return (
    <div>

      {console.log(posts)}
      {
        posts==null || userData==null ? <CircularProgress color="secondary" /> :<>
        <Navbar userData={userData}/>
        <div className='spacer'></div>
        <div className='profile-detail'>
          <div className='profile-Image'>
            <img src={userData.profileUrl} />
          </div>
          <div className='info'>
            <div>
              Name:{userData.fullname}
            </div>
            <div>
              Email:{userData.email}
            </div>
            <div>
              Posts:{userData.postIds.length}
            </div>
          </div>
        </div>
        <hr></hr>
        <div className='All-posts'>  
            
        </div>

        </>
      }

    </div>
  )
}

export default Profile