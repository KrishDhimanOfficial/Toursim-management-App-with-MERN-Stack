import React from 'react'

const Button = ({ btnRef, text, type, classes }) => {
    return (
        <button
            ref={btnRef}
            type={type}
            className={`btn btn-block btn-primary fs-4 ${classes}`}>
            {text}
        </button>
    )
}

export default React.forwardRef(Button)