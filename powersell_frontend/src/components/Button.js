import React from 'react'

function Button({onClick, text}) {
  return (
    <button id="pc-width" onClick={onClick} className="purchase-button">
        {text}
    </button>
  )
}

export default Button