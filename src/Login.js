import React from 'react'
import "./Login.css"
import { Button } from "@mui/material";
import { auth, provider } from "./firebase";
import { actionTypes } from './reducer';
import { useStateValue } from "./StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth.signInWithPopup(provider)
    .then((result) => {
      dispatch({
        type :actionTypes.SET_USER,
        user: result.user,
      });
    })
  };

  return (
    <div className='login'>

<div className='login_text'>
    <h1>Welcome!</h1>
    </div>
      <div className='login__container'>
        
    <img src="https://i.imagesup.co/images2/87fc33a2240f03f0f60d206bc177f416b53ae12e.png" />
    </div>


    <Button className='button' onClick={signIn} >
    <img src="https://i.imagesup.co/images2/c726c22c364295b01e07ef68baf901025e2f07db.png" />
    </Button>
    </div>

  )
}

export default Login