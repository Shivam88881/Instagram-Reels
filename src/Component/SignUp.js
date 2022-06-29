import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './signup.css';
import logo from './images/Logo.jpg';
import Alert from '@mui/material/Alert';  //for alert message
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

import {database, storage} from '../firebase'


export default function SignUp() {

const [name,setName]=useState();
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const [file,setFile]=useState(null);
const [error,seterror]=useState('');
const [loading,setLoading]=useState();
let history = useNavigate ();

const {signup}=useContext(AuthContext);


const handleSignUp= async()=>{
    if(file==null){
        seterror('Please select profile photo');
        setTimeout(() => {
            seterror('');
        }, 2000);
        return;
    }
    try{
        let userObj= await signup(email,password);
        console.log(userObj);
        let uid = userObj.user.uid
        const uploadTask= storage.ref( `/users/${uid}/profile photo`).put(file);
        // const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
        uploadTask.on('state_changed',progress,errorInUpload,complete);

        const progress=(snapshot)=>{
            console.log('upload started ')
            const uploaded=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log(uploaded);
        }

        const errorInUpload= (error)=>{
            console.log('error occured during upload');
            seterror(error);
            console.log(error);
            setTimeout(() => {
                seterror('');
            }, 2000);
            setLoading(false);
            return;
        }

        const complete= ()=>{
            console.log('SignUp completed')
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                console.log('File available at', url);
                database.users.doc(uid).set({
                    Full_Name: name,
                    Email: email,
                    User_Id: uid,
                    Profile_photo_url: url,
                    CreatedAt: database.getTimeStamp()
                })
              });
              setLoading(false);
            //   history.push('/');
        }

    } catch(err){
        seterror(err);
        setTimeout(() => {
            seterror('');
        }, 2000);
        return;
    }
}


// const {signup} = useContext(AuthContext)

  return (
    <div className='SignUpWrapper'>
        <div className='SignUpCard'>
            <Card variant='outlined'>
                <div className='SignUpImg'>
                    <img src={logo} ></img>
                </div>

                <div className='SignUpMsg'>
                    <div className='LoginMsg'> SignUp to watch short videos</div>
                    {error!='' && <Alert severity="error" margin='dense' > {error} </Alert>}
                </div>
        <CardContent>
            <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth={true} margin='dense' size="small" value={name} onChange={(e)=>setName(e.target.value)}/>
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size="small" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Button size="small" fullWidth={true} margin='dense' variant='outlined' startIcon={<CloudUploadIcon/>} color='info' component='label'>upload profile photo
            <input type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])}     hidden></input> {/*here using component='label' and hidden in input, input icon for accepting file got hide and on clicking button (upload profile photo) input icon for accepting file automaticaly cicked*/}
            </Button>
        </CardContent>

        <CardActions>
            <Button size="small" margin="dense" variant='contained' fullWidth={true} color='primary' onClick={handleSignUp}>SignUp</Button>
        </CardActions>
        <CardContent>
            <div className='SignUpTerms'>By signing up you,you agree to our Terms, Data Policy and Cookies Policy;</div>
        </CardContent>
            
        </Card>

        <div className='AlreadyAcc'>
            <Card variant='outlined' margin='dense'>
                <div>
                    Already have an account? <Link to="/login" style={{textDecoration:'none'}}>Login</Link>
                </div>
            </Card>
     </div>
     </div>
    </div>
  );
}
