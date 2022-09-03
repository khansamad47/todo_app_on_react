import React from 'react'
import { loginPopup } from './../firebase';

export default function Login() {

  return (
    <>
    <h1>Login</h1>
    <button onClick={ loginPopup }>Login</button>
    </>
  )
}
