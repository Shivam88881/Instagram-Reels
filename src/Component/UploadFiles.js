import React, { useState } from 'react'

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LinearProgress from '@mui/material/LinearProgress';


import {v4 as uuidv4} from 'uuid'


import {database,storage} from '../firebase'


function UploadFiles(props) {
    // console.log(props);
    const[error,setError]=useState('');
    const[loading,setLoading]=useState(false);

    const handleUpload= (file)=>{
        if(file==null){
            setError('Please select any video')
            setTimeout(() => {
                setError('')
            }, 2000);
            return;
        }
        if(file.size/(1024*1024)>100){
            setError('File size is too long.Please select within 100 Mb !')
            setTimeout(() => {
                setError('')
            }, 2000);
            return;
        }

        let uid = uuidv4();
        setLoading(true);
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
            uploadTask.on('state_changed',fn1,fn2,fn3);
            function fn1(snapshot){
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                console.log(`Upload is ${progress} done.`)
            }
            function fn2(error){
                setError(error);
                setTimeout(()=>{
                    setError('')
                },2000);
                setLoading(false)
                return;
            }
            function fn3(){
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url);
                    let obj = {
                        likes:[],
                        comments:[],
                        pId:uid,
                        pUrl:url,
                        uName : props.user.fullname,
                        uProfile : props.user.profileUrl,
                        userId : props.user.userId,
                        createdAt : database.getTimeStamp()
                    }
                    database.posts.add(obj).then(async(ref)=>{
                        let res = await database.users.doc(props.user.userId).update({
                            postIds : props.user.postIds!=null ? [...props.user.postIds,ref.id] : [ref.id]
                        })
                    }).then(()=>{
                        setLoading(false)
                    }).catch((err)=>{
                        setError(err)
                        setTimeout(()=>{
                            setError('')
                        },2000)
                        setLoading(false)
                    })
                })
                // setLoading(false);
            }
    }


  return (
    <div>
        {error!='' ? <Alert severity="error"> {error} </Alert>:
        <>
            <Button variant="outlined" color="error" startIcon={<FileUploadIcon/>} component='label'>
                <input type='file' accept='video/*' onChange={(e)=>handleUpload(e.target.files[0])}  hidden></input>
            Upload Videos</Button>
            {loading && <LinearProgress color="secondary" style={{width:'45%',marginLeft:'2px',marginTop:'3px'}}/>}
        </>

        }
        
    </div>
  )
}

export default UploadFiles