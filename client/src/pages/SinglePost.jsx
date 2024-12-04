import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config/config'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { singlePost, setLoading } from '../features/post.slice'
import { CategoryList, Loader, NoTFound, CommentInput, CommentList } from '../components/componets'

const SinglePost = () => {
    console.log('SinglePost render')
    const navigate = useNavigate()
    const { post_slug } = useParams()
    const dispatch = useDispatch()
    const [error, seterror] = useState(false)
    const [comments, setcomment] = useState([])
    const singlePostState = useSelector(state => state.posts)
    const loading = useSelector(state => state.posts.loading)


    const fetchSinglePost = async () => {
        dispatch(setLoading(true))
        const response = await axios.get(`${config.server_url}/single/post/${post_slug}`)
        if (response.data.error) seterror(true)
        setcomment(response.data.comments)
        dispatch(singlePost(response.data))
        dispatch(setLoading(false))
    }
    useEffect(() => { fetchSinglePost() }, [])
    return (
        error
            ? <NoTFound />
            : <div id="fh5co-blog-section" className="fh5co-section-gray">
                <div className="container">
                    <div className="row">
                        {
                            loading
                                ? <Loader />
                                : <div className="col-md-8">
                                    <h1>{singlePostState.post?.title}</h1>
                                    <div className='row'>
                                        <div className='col-12' style={{ width: '100%', height: '400px', marginBottom: '30px' }}>
                                            <img
                                                src={`${singlePostState.post_img_url}/${singlePostState.post?.post_image}`}
                                                alt=""
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        </div>
                                        <div
                                            className="col-12"
                                            dangerouslySetInnerHTML={{ __html: singlePostState.post?.description }}
                                        >
                                        </div>
                                    </div>
                                </div>
                        }
                        <div className="col-md-4">
                            <CategoryList />
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: '30px' }}>
                        <div className="col-md-8">
                            <CommentInput
                                post_id={singlePostState.post?._id}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <h3 style={{ margin: '20px 0' }}>Comments</h3>
                            {
                                comments?.map((comment, i) => (
                                    <CommentList
                                        key={i}
                                        index={i}
                                        parent_id={`${comment._id}`}
                                        username={comment.username}
                                        comment={comment.comment}
                                        slug={post_slug}
                                    />
                                ))

                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default SinglePost