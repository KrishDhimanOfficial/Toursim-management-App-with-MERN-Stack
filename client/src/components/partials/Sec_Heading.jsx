import React from 'react'

const Sec_Heading = ({ heading, description }) => {
    console.log("sec-heading")
    
    return (
        <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center heading-section animate-box">
                <h3>{heading}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default React.memo(Sec_Heading)
