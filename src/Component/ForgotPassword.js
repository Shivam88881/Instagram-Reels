import React, { useState } from 'react'

import { Link } from 'react-router-dom';

import Alert from '@mui/material/Alert';  //for alert message
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

import { auth } from '../firebase';

function ForgotPassword() {

  const [email,setEmail]=useState();
  const [loading,setLoading]=useState(false);
  const [error,seterror]=useState('')
  const history=useNavigate()

  const handleSubmit= ()=>{
    setLoading(true)
    auth.sendPasswordResetEmail(email).then(()=>{
      history('/login')
    }).catch((err)=>{
      seterror(err)
      setLoading(false)
    })
  }


  return (
    <div>
      <div className='spacer'></div>
        <div className='forgot-container'>
        <Card variant='outlined'>

          <div className='error-msg'>
              {error!='' && <Alert severity="error" margin='dense' > {error} </Alert>}
          </div>
        <CardContent>
        <Typography variant='outlined'>Please Enter email address</Typography>
        <Button variant='outlined' size="small" margin="dense" color='secondary' sx={{marginLeft:'15px'}}><Link to='/login' style={{textDecoration:'none'}}>Login</Link></Button>
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </CardContent>
        <CardActions>
            <Button size="small" margin="dense" variant='contained' fullWidth={true} color='primary' onClick={handleSubmit} disabled={loading}>Reset Password</Button>
        </CardActions>
        </Card>
     </div>
    </div>
  )
}

export default ForgotPassword