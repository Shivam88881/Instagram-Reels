import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Login.css';
import logo from './images/Logo.jpg';
import Alert from '@mui/material/Alert';  //for alert message
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Link} from 'react-router-dom';
import { borderRadius, textAlign } from '@mui/system';
import slider from './images/mobile.png'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import img1 from './images/img1.jpg'
import img2 from './images/img2.jpg'
import img3 from './images/img3.jpg'
import img4 from './images/img4.jpg'
import img5 from './images/img5.jpg'
import { AuthContext } from './AuthContext';

export default function Login() {

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');

    const {login} =useContext(AuthContext);

    const history=useNavigate()

    const handleLogin= async()=>{
        try{
            setLoading(true);
            let userObj= await login(email,password);
            console.log('loged in');
            console.log(userObj.user.uid);
            setLoading(false);
            history("/")
        }catch(err){
            setLoading(true);
            setError(err);
            console.log(error);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
            return;
        }
    }

  return (
    <div className='LoginWrapper'>
        
        <div className='imgcar' style={{backgroundImage:'url('+slider+')', backgroundSize:'cover'}}>
            <div className='car'>
            <CarouselProvider 
            visibleSlides={1}
            totalSlides={5}
            naturalSlideWidth={250}
            naturalSlideHeight={546}
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
            isIntrinsicHeight={true}
      >
        <Slider>
          <Slide index={0}> <img src={img1}/></Slide>
          <Slide index={1}> <img src={img2}/></Slide>
          <Slide index={2}> <img src={img3}/></Slide>
          <Slide index={3}> <img src={img4}/></Slide>
          <Slide index={4}> <img src={img5}/></Slide>
        </Slider>
      </CarouselProvider>
            </div>
        </div>
     



        <div className='LoginCard'>
            <Card variant='outlined'>
                <div className='LoginImg'>
                    <img src={logo} ></img>
                </div>
                <div className='LoginMsg'> Login to watch short videos</div>
                <div className='LoginMsg'>
                    {error!='' && <Alert severity="error" margin='dense' > {error} </Alert>}
                </div>
        <CardContent>
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size="small" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <div style={{textAlign:'center'}}>
            <Link to='/forgotpassword' style={{textDecoration:'none'}}> Forgot Password</Link>
        </div>
        </CardContent>
        <CardActions>
            <Button size="small" margin="dense" variant='contained' fullWidth={true} color='primary' onClick={handleLogin} disabled={loading}>Login</Button>
        </CardActions>
        </Card>

        <div className='DontHaveAcc'>
        <Card variant='outlined' margin='dense'>
            <div>
                Don't have an account? <Link to="/signup" style={{textDecoration:'none'}}>SignUp</Link>
            </div>
        </Card>
     </div>
     </div>
    </div>
  );
}
