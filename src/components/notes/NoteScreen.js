import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">

    <NotesAppBar />

    <div className="notes__content">
      <input
        type="text"
        placeholder="Some awesome tittle"
        className="notes__tittle-input"
        autoComplete="no"
      />
      <textarea
        placeholder="What happened today"
        className="notes__textarea"
      ></textarea>

      <div className="notes__image">
        <img 
          src="https://en.free-wallpapers.su/data/media/13/big/com0542.jpg"
          alt="image"
        />

      </div>
    </div>
      
    </div>
  )
}
