import React from 'react'

const SuccessAlert = ({ message }) => {
    return (
        <div class="alert alert-success alert-dismissible" role="alert">
            {message}
        </div>
    )
}

export default SuccessAlert
