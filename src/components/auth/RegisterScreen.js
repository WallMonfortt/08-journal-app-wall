import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
  return (
    <>
      <h3 className="auth__tittle">Register</h3>

      <form>
        <input
          type="name"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="no"
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="no"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
        />
        <button
         type="submit"
         className="btn btn-primary btn-block"
        >
          Register
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div 
            className="google-btn"
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
