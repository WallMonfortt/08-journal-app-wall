import React from 'react'

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div 
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage:'url(https://midu.dev/images/wallpapers/una-taza-de-javascript.png)'
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-tittle">
          New Day
        </p>
        <p className="journal__entry-content">
          Nostrud velit magna anim sit pariatur aliquip amet nostrud labore tempor culpa est proident.
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  )
}
