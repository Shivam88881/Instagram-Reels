import React, { useEffect } from 'react'
import { useState } from 'react';
import ReactDOM  from 'react-dom'

import Avatar from '@mui/material/Avatar';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';


import './Video.css'
import Like from './Like';
import { database } from '../firebase';




function Video({vsrc,postData,userData}) {

    const[modal,setModal]=useState(false)
    const[comment,setComment]=useState(null)
    const[text,setText]=useState('')

    const handleClick= (e)=>{
        e.preventDefault()
        e.target.muted=(!e.target.muted)
    }

    const toggleModal=()=>{
        setModal(!modal)
    }

    const handlePost=()=>{
      let Obj={
        text:text,
        ProfileImage:userData.user.profileUrl,
        Name:userData.user.fullname
      }
      database.comments.add(Obj).then((Obj)=>{
        database.posts.doc(postData.postId).update({
          comments:[...postData.comments,Obj.id]
        })
      })
      setText('')
    }

    
    useEffect( ()=>{
      let carr=[]
        postData.comments.forEach(element => {
             database.comments.doc(element).get().then((ref)=>{
                let data=ref.data()
                carr.push(ref.data())
                
              })
        });
        // console.log(carr)
        setComment(carr)
        // console.log(comment)
      },[postData])

    const autoScroll=(e)=>{
        let next=ReactDOM.findDOMNode(e.target).parentNode.nextSibling
        // console.log(next)  /* e.target is current video. ReactDOM.findDOMNode(e.target) is giving node of e.target which is current video means giving node of current video, again we are ging to its parents and then going to nextsibling means next video   */
        if(next){
            e.target.muted=true
            next.scrollIntoView()  /* it is for automaticaly going to next */
        }
    }


  return (
    <div className='video'>
      <video src={vsrc} className='videos-styling' muted={true} onClick={handleClick}  onEnded={autoScroll} autoPlay={true} ></video>

      <div className='Owner-detail' style={{display:'flex'}}>
        <Avatar  src={postData.uProfile} />
        <h4>{postData.uName}</h4>
      </div>

      <div className='like'>
        <Like userData={userData} postData={postData}/>
      </div>

      <div className='comment-section' >
        <CommentIcon fontSize='large' onClick={toggleModal} className='comment'/>
        {
          modal &&
          <div className='modal'>
            <div className='overlay'>
              <div  className='modal-content'>
              <Card className='All-comments'>
                <CloseIcon onClick={toggleModal} className='modal-close'/>
                <div>
                  {console.log(comment)}
                  {
                    comment.length==0 ? <CircularProgress color="secondary"/> :
                    <div>
                      {
                        comment.map((cmnt,index)=>(
                          <div key={index} style={{display:'flex',marginLeft:'5px'}}>
                            <Avatar  src={cmnt.ProfileImage} />
                            <p><span style={{fontWeight:'bold'}}>{cmnt.Name}</span>&nbsp;&nbsp;&nbsp;{cmnt.text}</p>
                          </div>
                        ))
                      }
                    </div>
                  }
                </div>
              </Card>
              <Card className='comment-input'>
                <TextField label="Comment" color="secondary" variant='outlined' value={text} onChange={(e)=>setText(e.target.value)}/>
                <Button onClick={handlePost}>post</Button>
              </Card>
              </div>
            </div>
          </div>
        }
      </div>

    </div>
  )
}

export default Video