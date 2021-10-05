import React from 'react'

export const Loading = () => {
  return (
    <div className="loading_container">
      <h1 className="center loading_title">Please wait...</h1>

      <div className="spinner">
        <span className="spinner-inner-1"></span>
        <span className="spinner-inner-2"></span>
        <span className="spinner-inner-3"></span>
      </div>
    </div>
  )
}
