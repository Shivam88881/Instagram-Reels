import React, { useEffect, useState } from 'react'

import FavoriteIcon from '@mui/icons-material/Favorite';

import './Like.css'
import { database } from '../firebase';

function Like({userData,postData}) {
    // console.log(userData)
    // console.log(postData)

    const[like,setLike]=useState(null)

    useEffect(()=>{
      // console.log(userData.user.userId)
        let check=postData.likes.includes(userData.user.userId)?true:false;
        setLike(check)
    },[postData])

    const handleclick=()=>{
      if(like){
        let parr=postData.likes.filter((el)=>el!=userData.user.userId)
        database.posts.doc(postData.postId).update({
          likes:parr
        })
      }
      else{
        let narr=[...postData.likes,userData.user.userId]
        // console.log(userData.user.userId)
        database.posts.doc(postData.postId).update({
          likes:narr
        })
      }
    }

  return (
    <div>
        {
            like!=null?<>{like==true?<FavoriteIcon fontSize='large' className='liked' onClick={handleclick}/>:<FavoriteIcon fontSize='large' className='unliked' onClick={handleclick}/> }</>:<></>

        }
    </div>
  )
}

export default Like