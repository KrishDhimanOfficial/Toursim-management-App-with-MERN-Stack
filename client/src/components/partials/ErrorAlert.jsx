import React from 'react'

const ErrorAlert = ({ message }) => {    
    return (
        <div
            style={{ marginBottom: '0' }}
            className="alert alert-danger alert-dismissible "
            role="alert">
            {message}
        </div>
    )
}

export default ErrorAlert
