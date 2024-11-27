import React from 'react'
import paris from '../assets/images/paris.webp'

const SinglePost = () => {
    return (
        <div id="fh5co-blog-section" className="fh5co-section-gray">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div>
                            <div style={
                                {
                                    width: '100%',
                                    height: '400px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                <img src={paris} alt="" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost
