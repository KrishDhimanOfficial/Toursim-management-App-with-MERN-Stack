import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../config/config'
import { Sec_Heading, ErrorBoundary, Post, NaviagteUser } from '../componets'

const Post_row = () => {
    const [posts, setPosts] = useState({})

    const fetchtopPost = async () => {
        const response = await axios.get(`${config.server_url}/top/posts`)
        setPosts(response.data)
    }
    useEffect(() => { fetchtopPost() }, [])
    return (
        <div id="fh5co-blog-section" className="fh5co-section-gray">
            <div className="container">
                <Sec_Heading
                    heading={'Recent Form Blog'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit est facilis maiores, perspiciatis accusamus asperiores sint consequuntur debitis.'} />
                <div className="row row-bottom-padded-md">
                    <ErrorBoundary>
                            {
                                posts.array?.map((post, i) => (
                                    <Post
                                        key={i}
                                        title={post.title}
                                        date={post.createdAt}
                                        slug={`/post/${post.post_slug}`}
                                        imgPath={`${posts.post_img_url}/${post.post_image}`}
                                        commentLength={post.comment_count}
                                        description={post.description}
                                    />
                                ))
                            }
                    </ErrorBoundary>
                </div>
                <NaviagteUser url={'/posts'} text={'See All Offers'} />
            </div>
        </div>
    )
}

export default Post_row
