import React, { useEffect } from 'react'
import { Sec_Heading, Post, ErrorBoundary, Pagination } from '../components/componets'
import { useSelector, useDispatch } from 'react-redux'
import { allPosts } from '../features/post.slice'
import config from '../config/config'
import axios from 'axios'

const Posts = () => {
    console.log('Post Page Render')

    const dispatch = useDispatch()
    const poststate = useSelector(state => state.posts)
    const apiURL = `${config.server_url}/all/posts?page`;
    const paginationURL = '/posts?page';


    const fetchPosts = async () => {
        const response = await axios.get(apiURL)
        if (response && response.status === 200) dispatch(allPosts(response.data))
    }
    useEffect(() => { fetchPosts() }, [])
    return (
        <div id="fh5co-blog-section" className="fh5co-section-gray">
            <div className="container">
                <Sec_Heading
                    heading={'Our Blogs'}
                    description={'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'} />
            </div>
            <div className="container">
                <div className="row row-bottom-padded-md">
                    <ErrorBoundary>
                        {
                            poststate.response && poststate.response.collectionData?.map((post, i) => (
                                <Post
                                    key={i}
                                    title={post.title}
                                    date={post.createdAt}
                                    commentLength={post.comment_count}
                                    slug={`/post/${post.post_slug}`}
                                    imgPath={`${poststate.post_img_url}/${post.post_image}`}
                                    description={post.description}
                                />
                            ))
                        }
                    </ErrorBoundary>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center">
                            <Pagination
                                api={apiURL}
                                paginateurl={paginationURL}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts