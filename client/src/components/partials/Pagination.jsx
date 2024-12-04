import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import config from '../../config/config'
import { allPosts, categoryPost } from '../../features/post.slice'
import { alltours } from '../../features/tour.slice'

const Pagination = ({ url, paginateurl, slug }) => {
    console.log('Pagination Render')

    const dispatch = useDispatch()
    const pagination = paginateurl == '/posts'
        ? useSelector(state => state.posts)
        : useSelector(state => state.tours)

    const fetchpostswithPagination = async (i) => {
        const response = await axios.get(`${url}?page=${i}`)
        if (url === `${config.server_url}/all/posts`) {
            dispatch(allPosts(response.data))
        }
        if (url === `${config.server_url}/category/posts/${slug}`) {
            dispatch(categoryPost(response.data))
        }
        if (url === `${config.server_url}/all/tours`) {
            dispatch(alltours(response.data))
        }
        if (url === `${config.server_url}/destination/${slug}`) {
            dispatch(alltours(response.data))
        }
    }

    return (
        <nav aria-label="Page navigation">
            {
                pagination.response?.totalDocs > pagination.response?.limit
                    ? <ul className="pagination">
                        {
                            pagination.response?.prevpage
                                ? <li className="page-item">
                                    <Link
                                        className="page-link"
                                        onClick={() => fetchpostswithPagination(pagination.response?.page - 1)}
                                        to={`${paginateurl}?page=${pagination.response?.page - 1}`}>
                                        Previous
                                    </Link>
                                </li>
                                : ''
                        }
                        {
                            Array.from({ length: pagination.response?.totalPages }, (_, i) => (
                                <li key={i} className="page-item">
                                    <Link
                                        className="page-link"
                                        to={`${paginateurl}?page=${i + 1}`}
                                        onClick={() => fetchpostswithPagination(i + 1)}
                                    >
                                        {i + 1}
                                    </Link>
                                </li>
                            ))
                        }
                        {
                            pagination.response?.nextpage
                                ? <li className="page-item">
                                    <Link
                                        className="page-link"
                                        onClick={() => fetchpostswithPagination(pagination.response?.page + 1)}
                                        to={`${paginateurl}?page=${pagination.response?.page + 1}`}>
                                        Next
                                    </Link>
                                </li>
                                : ''
                        }
                    </ul>
                    : ''
            }
        </nav>
    )
}

export default Pagination
