import React from 'react'


const Input = ({
    type,
    placeholder,
    style,
    ...props
}, ref) => {
    return (
        <input
            type={type}
            style={style}
            ref={ref}
            {...props}
            className="input"
            placeholder={placeholder}
            required />
    )
}

export default React.forwardRef(Input)
