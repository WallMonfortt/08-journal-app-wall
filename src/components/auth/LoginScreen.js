import React from 'react'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.ui)

  const [formValues, handleInputChange ] = useForm({
    email:'j.gual.m@gmail.com',
    password:'123123'
  });

  const { email, password} = formValues;

  const handleLogin = (e) =>{
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password))
    }
  }

  const isFormValid = () =>{
    if (!validator.isEmail(email)) {
      Swal.fire('Error', 'Email is not valid', 'error');
      dispatch(setError('Email is not valid'));
      return false;
    }else if (password.length < 5) {
      Swal.fire('Error', 'Invalid password', 'error');
      dispatch(setError('Invalid password'));
      return false
    }

    dispatch(removeError());

    return true
  }

  const handleGoogleLogin = () =>{
    dispatch( startGoogleLogin() )
  }
  return (
    <>
      <h3 className="auth__tittle">Login</h3>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="no"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <button
         type="submit"
         className="btn btn-primary btn-block"
         disabled={ loading } 
        >
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div 
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link 
          to="/auth/register"
          className="link"
        >
          Create new Account
        </Link>
      </form>
    </>
  )
}
