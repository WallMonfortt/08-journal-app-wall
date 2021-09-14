import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import WM2 from '../img/WM2.png'
import WMonf from '../img/WMonf.png'

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Switch>
          <Route exact path="/auth/login" component={LoginScreen} />
          <Route exact path="/auth/register" component={RegisterScreen} />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
      <div className="auth__logos">
        <img height="50px" alt="logo"  src={WM2} />
        <div ><img height="50px" alt="logo"  src={WMonf} /></div>
      </div>
    </div>
  )
}
