import React from 'react'

const Input = ({
    type,
    placeholder,
    classs,
    ...props
}, ref) => {

    return (
        <input
            type={type}
            ref={ref}
            className={`${classs}`}
            placeholder={placeholder}
            {...props}
            required />
    )
}

export default React.memo(React.forwardRef(Input))
