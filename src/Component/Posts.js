import React, { useEffect, useState } from 'react'

import {database} from '../firebase'
import Video from './Video';
import './Posts.css'

import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

function Posts(userData) {

    // console.log(userData)


    const [posts,setPosts]=useState(null);

    useEffect( ()=>{
        let parr = []
        const unsub = database.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{
            parr = []
            querySnapshot.forEach((doc)=>{
                let data = {...doc.data(),postId:doc.id}
                parr.push(data)
            })
            setPosts(parr)
        })
        return unsub
    },[])


  return (
    <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
        {/* {console.log(posts)} */}
        { posts==null || userData==null ? <CircularProgress color="secondary" /> :
        <div className='videos-container'>
            
            {
                posts.map((post,index)=>(
                    <React.Fragment key={index}>
                        <div className='videos'>
                            <Video vsrc={post.pUrl} postData={post} userData={userData}/>
                        </div>

                        {/* <div className='video-functionality'>
                            <Like userData={userData} postData={post}/>
                        </div> */}

                    </React.Fragment>
                ))
            } 
        </div> 
        }

    </div>
  )
}

export default Posts