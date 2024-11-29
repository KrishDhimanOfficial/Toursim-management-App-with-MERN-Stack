import React from 'react'

const Button = ({ fn, text, type, classes }, ref) => {
    return (
        <button
            onClick={fn}
            ref={ref}
            type={type}
            className={`btn btn-block btn-primary fs-4 ${classes}`}>
            {text}
        </button>
    )
}

export default React.forwardRef(Button)