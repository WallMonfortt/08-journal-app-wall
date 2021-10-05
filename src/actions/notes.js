import Swal from 'sweetalert2';
import { db } from "../firebase/firebase-config";
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from '../helpers/fileUpload';


export const startNewNote = () =>{
  return async(dispatch, getState) =>{

    const {uid} = getState().auth;

    const newNote = {
      title:'',
      body:'',
      date: new Date().getTime()
    }

    const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote);

    dispatch( activeNote( doc.id, newNote ));
    dispatch( startLoadingNotes( uid ));
  }
}

export const activeNote = (id, note) =>({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
});

export const startLoadingNotes = ( uid ) =>{
  return async( dispatch ) => {
    const notes = await loadNotes( uid );
    dispatch( setNotes(notes));
  }
}

export const setNotes = (notes) =>({
  type: types.notesLoad,
  payload: notes
});

export const startSaveNote = (note) =>{
  return async(dispatch, getState) =>{

    const {uid} = getState().auth;

    if (!note.url) {
      delete note.url
    }

    const noteToFirestore = {...note};
    delete noteToFirestore.id;

    const noteRef = doc(db,`${uid}/journal/notes/${note.id}`)

    await updateDoc(noteRef,noteToFirestore)
    .then(()=>{
      dispatch( refreshNote( note.id, noteToFirestore));
      Swal.fire('Saved', note.title, 'success');
    })
    .catch( e => {
      Swal.fire('Error', e.message, 'error');
    })

  }
}

export const refreshNote = (id , note) =>({
  type: types.notesUpdated,
  payload:{
    id, 
    note:{
      id,
      ...note
    }
  }
});

export const startUploading = (file) =>{
  return async( dispatch, getState )=>{
    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: 'Uploading...',
      text:'Please wait...',
      allowOutsideClick:false,
      showConfirmButton:false
    });
    
    const fileUrl = await fileUpload( file );    
    activeNote.url = fileUrl;
    
    dispatch( startSaveNote(activeNote));

    Swal.close();

  }
}

export const startDeleting = (id) =>{
  return async(dispatch, getState) =>{
    const {uid} = getState().auth

    const noteRef = doc(db,`${uid}/journal/notes/${id}`)

    await deleteDoc(noteRef)
    .then(()=>{
      dispatch( deleNote(id));
      Swal.fire('Delete', 'note Deleted correctly', 'success');
    })
    .catch( e => {
      Swal.fire('Error', e.message, 'error');
    })
  }
}

export const deleNote = (id) =>({
  type: types.notesDelete,
  payload: id
})