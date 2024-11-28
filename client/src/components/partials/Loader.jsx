import React from 'react'

const Loader = () => {
    return (
        <div className="spinner-grow" style={{ width: '50px', height: '50px' }} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Loader
