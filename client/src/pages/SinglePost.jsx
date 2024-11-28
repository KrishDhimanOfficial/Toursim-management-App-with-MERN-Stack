import React, { useEffect } from 'react'
import axios from 'axios'
import config from '../config/config'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { singlePost, setLoading } from '../features/post.slice'
import { CategoryList, Loader, CommentInput } from '../components/componets'

const SinglePost = () => {
    const { post_slug } = useParams()
    const dispatch = useDispatch()
    const singlePostState = useSelector(state => state.posts)
    const loading = useSelector(state => state.posts.loading)

    const fetchSinglePost = async () => {
        dispatch(setLoading(true))
        const response = await axios.get(`${config.server_url}/single/post/${post_slug}`)
        if (response && response.status == 200) {
            dispatch(singlePost(response.data))
            dispatch(setLoading(false))
        }
    }

    useEffect(() => { fetchSinglePost() }, [])
    return (
        <div id="fh5co-blog-section" className="fh5co-section-gray">
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
                        <CommentInput />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost