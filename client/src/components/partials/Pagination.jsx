import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import config from '../../config/config'
import { allPosts } from '../../features/post.slice'

const Pagination = () => {
    const dispatch = useDispatch()
    const pagination = useSelector(state => state.posts)

    const fetchpostswithPagination = async (i) => {
        const response = await axios.get(`${config.server_url}/all/posts?page=${i}`)
        dispatch(allPosts(response.data))
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
                                        to={`/posts?page=${pagination.response?.page - 1}`}>
                                        Previous
                                    </Link>
                                </li>
                                : null
                        }
                        {
                            Array.from({ length: pagination.response?.totalPages }, (_, i) => (
                                <li key={i} className="page-item">
                                    <Link
                                        className="page-link"
                                        to={`/posts?page=${i + 1}`}
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
                                        to={`/posts?page=${pagination.response?.page + 1}`}>
                                        Next
                                    </Link>
                                </li>
                                : null
                        }
                    </ul>
                    : null
            }
        </nav>
    )
}

export default Pagination
