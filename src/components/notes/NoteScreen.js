import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

  const dispatch = useDispatch();

  const { active: note } = useSelector(state => state.notes);
  const [ formValues, handleInputChange, reset ] = useForm(note);
  const { body, title, id }= formValues;

  const activeId = useRef( note.id );

  useEffect(() => {
    
    if( note.id !== activeId.current){
      reset( note);
      activeId.current = note.id
    }

  }, [note, reset])

  useEffect(() => {
    
    dispatch( activeNote( formValues.id,{ ...formValues}));
  }, [formValues, dispatch])

  const handleDelete = () =>{
    dispatch( startDeleting( id ) )
  }
  return (
    <div className="notes__main-content">

    <NotesAppBar />

    <div className="notes__content">
      <input
        type="text"
        name="title"
        placeholder="Some awesome tittle"
        className="notes__tittle-input"
        autoComplete="off"
        value={ title }
        onChange={handleInputChange}
      />
      <hr/>
      <textarea
        placeholder="What happened today??"
        name="body"
        className="notes__textarea"
        value={ body }
        onChange={handleInputChange}
      ></textarea>

      {
        (note.url) &&
        (<div className="notes__image">
        <img 
          src={note.url}
          alt="note img"
        />
        </div>)
      }
    </div>
      <button
        className="btn btn-danger"
        onClick={handleDelete}
      > Delete Note </button>
    </div>
  )
}
