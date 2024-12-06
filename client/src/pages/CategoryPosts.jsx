import React, { useEffect } from 'react'
import config from '../config/config'
import { useSelector, useDispatch } from 'react-redux'
import { Sec_Heading, Post, Pagination, ErrorBoundary } from '../components/componets'
import { categoryPost } from '../features/post.slice'
import axios from 'axios'
import { useParams } from 'react-router'

const CategoryPosts = () => {
    const { category } = useParams()
    const dispatch = useDispatch()
    const categoryPosts = useSelector(state => state.posts)
    const apiURL = `${config.server_url}/category/posts/${category}`;
    const paginationURL = `/posts/${category}`;

    const fetchPosts = async () => {
        const response = await axios.get(apiURL)
        if (response && response.status == 200) dispatch(categoryPost(response.data))
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
                            categoryPosts.response?.collectionData?.map((category, i) => (
                                <Post
                                    key={i}
                                    title={category.post.title}
                                    date={category.post.createdAt}
                                    commentLength={21}
                                    slug={`/post/${category.post.post_slug}`}
                                    imgPath={`${categoryPosts.post_img_url}/${category.post.post_image}`}
                                    description={category.post.description}
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
                                url={apiURL}
                                paginateurl={paginationURL}
                                slug={category}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryPosts
