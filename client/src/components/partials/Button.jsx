import React from 'react'

const Button = ({ fn, text, type, classes, style }, ref) => {
    return (
        <button
            onClick={fn}
            ref={ref}
            type={type}
            style={style}
            className={`btn btn-primary fs-4 ${classes}`}>
            {text}
        </button>
    )
}

export default React.memo(React.forwardRef(Button))