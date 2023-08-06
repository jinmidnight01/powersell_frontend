import React from 'react'

function Button({className, onClick, text}) {
  return (
    <button className={`positive_button ${className}`}
     onClick={onClick}>
        {text}
    </button>
  )
}

export default Button