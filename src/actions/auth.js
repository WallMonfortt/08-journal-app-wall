import { provider } from "../firebase/firebase-config";
import Swal from 'sweetalert2'
import { 
  getAuth, 
  signInWithPopup,
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from "./notes";

const auth = getAuth();

export const startLoginEmailPassword = (email, password) =>{
  return (dispatch) =>{

    dispatch(startLoading());

    signInWithEmailAndPassword(auth, email, password)
    .then(({user}) => {
      dispatch(login(user.uid, user.displayName));

      dispatch(finishLoading());
    })
    .catch( e => {
      dispatch(finishLoading());
      Swal.fire('Error', "Email o contraseña invalidos", 'error');
    })
  }
}

export const startRegisterWithEmailPasswordName = (email, password, name) =>{
  return (dispatch) =>{

    dispatch(startLoading());

    createUserWithEmailAndPassword(auth, email, password)
      .then(async({user}) => {
        await updateProfile(user, {displayName: name})

        dispatch(
          login(user.uid, user.displayName)
        )

        dispatch(finishLoading());
      })
      .catch(e => {
        dispatch(finishLoading());
        Swal.fire('Error', e.message, 'error');
      })
  }
}

export const startGoogleLogin = () => {
  return (dispatch) =>{
    signInWithPopup(auth, provider)
    .then(({user}) => {
      dispatch(
        login(user.uid, user.displayName)
      )
    })
  }
}

export const login = (uid,displayName) =>({
  type: types.login,
  payload:{
    uid,
    displayName
  }
});


export const startLogout = () =>{
  return (dispatch) => {
    signOut(auth)

    dispatch( logout());
    dispatch( noteLogout());
  }
}

export const logout = () => ({
  type:types.logout
})
