import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({ title, date, description,imgPath, commentLength, url }) => {
    return (
        <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="fh5co-blog animate-box">
                <Link to="#">
                    <img className="img-responsive" src={imgPath} alt="" />
                </Link>
                <div className="blog-text">
                    <div className="prod-title">
                        <h3><Link to="#">{title}</Link></h3>
                        <span className="posted_by"> {date} </span>
                        <span className="comment">
                            <Link to="#">
                                {commentLength}
                                <i className="icon-bubble2"></i>
                            </Link>
                        </span>
                        <p>{description}</p>
                        <p><Link to={url}>Learn More...</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
