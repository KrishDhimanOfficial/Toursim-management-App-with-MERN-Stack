import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({ title, date, description, imgPath, commentLength, slug }) => {
    return (
        <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="fh5co-blog animate-box">
                <Link to={slug}>
                    <img className="img-responsive" src={imgPath} alt="" />
                </Link>
                <div className="blog-text">
                    <div className="prod-title">
                        <h3><Link to={slug}>{title}</Link></h3>
                        <span className="posted_by"> {date} </span>
                        <span className="comment">
                            <Link to={slug}>
                                {commentLength}
                                <i className="icon-bubble2"></i>
                            </Link>
                        </span>
                        <p dangerouslySetInnerHTML={{ __html: description }} />
                        <p><Link to={slug}>Learn More...</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
