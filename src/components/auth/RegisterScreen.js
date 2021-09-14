import React from 'react'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startGoogleLogin, startRegisterWithEmailPasswordName } from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.ui);

  const [formValues, handleInputChange ] = useForm({
    name: 'Wal Monfortt',
    email:'gual@gmail.com',
    password:'123123',
    password2:'123123'
  });

  const {name, email, password, password2} = formValues

  const handleRegister = (e) =>{
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  }

  const isFormValid = () =>{
    
    if (name.trim().length === 0) {
      dispatch(setError('Name is required'));
      Swal.fire('Error', 'Name is required', 'error');
      return false;
    }else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      Swal.fire('Error', 'Email is not valid', 'error');
      return false;
    }else if (password !== password2 || password.length < 5) {
      dispatch(setError('Password should be at least 6 characters and match each other'));
      Swal.fire('Error', 'Password should be at least 6 characters and match each other', 'error');
      return false
    }

    dispatch(removeError());

    return true
  }

  const handleGoogleRegister = () =>{
    dispatch( startGoogleLogin() )
  }

  return (
    <>
      <h3 className="auth__tittle">Register</h3>

      <form onSubmit={handleRegister}>
        <input
          type="name"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="no"
          value={name}
          onChange={handleInputChange}
        />
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
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />
        <button
         type="submit"
         className="btn btn-primary btn-block"
         disabled={loading}
        >
          Register
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div 
            className="google-btn"
            onClick={handleGoogleRegister}
          >
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Register with google</b>
            </p>
          </div>
        </div>
        <Link
          to="/auth/login"
          className="link"
        >
          Already registered?
        </Link>
      </form>
    </>
  )
}
