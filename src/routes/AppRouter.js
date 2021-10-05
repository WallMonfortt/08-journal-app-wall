import React, { useEffect, useState } from 'react'
import {onAuthStateChanged, getAuth} from 'firebase/auth'
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { Loading } from '../components/loading/Loading';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
  const dispatch = useDispatch()
  const auth = getAuth();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, async(user) =>{
      
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true)

        dispatch(startLoadingNotes( user.uid ));
      }else{
        setIsLoggedIn(false)
      }

      setChecking(false)
    })
  }, [dispatch, setChecking, setIsLoggedIn,auth])

  if (checking) {
    return(
      <Loading />
    )
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute 
            path="/auth" 
            component={AuthRouter} 
            isLoggedIn={isLoggedIn}
            />
          <PrivateRoute
            exact 
            path="/" 
            component={JournalScreen} 
            isLoggedIn={isLoggedIn}
          />
        </Switch>
      </div>
    </Router>
  )
}
