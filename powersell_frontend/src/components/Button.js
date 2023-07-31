import React from 'react'

function Button({onClick, text}) {
  return (
    <button onClick={onClick} className="purchase-button">
        {text}
    </button>
  )
}

export default Button