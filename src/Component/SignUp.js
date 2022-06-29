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

export default function SignUp() {
const [name,setName]=useState();
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const [file,setFile]=useState(null);
const [error,seterror]=useState('');
const [loading,setLoading]=useState();
let history = useNavigate ();
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
                    {error!='' && <Alert severity="error" margin='dense' >error in signup — check it out!</Alert>}
                </div>
        <CardContent>
        <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth={true} margin='dense' size="small" value={name} onChange={(e)=>setName(e.target.value)}/>
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size="small" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Button size="small" fullWidth={true} margin='dense' variant='outlined' startIcon={<CloudUploadIcon/>} color='info' component='label'>upload profile photo
        <input type='file' accept='image/*' hidden></input>
        </Button>
        </CardContent>
        <CardActions>
            <Button size="small" margin="dense" variant='contained' fullWidth={true} color='primary'>SignUp</Button>
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
