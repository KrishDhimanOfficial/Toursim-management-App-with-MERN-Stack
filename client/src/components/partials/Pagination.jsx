import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import config from '../../config/config'
import { useSearchParams } from 'react-router-dom'
import { allPosts, categoryPost } from '../../features/post.slice'
import { alltours, bookings } from '../../features/tour.slice'

const Pagination = ({ api, paginateurl, slug }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()
    let pagination = undefined;

    const loc = searchParams.get('loc')
    const dep_date = searchParams.get('dep_date')
    const re_date = searchParams.get('re_date')


    if (paginateurl === '/posts?page') pagination = useSelector(state => state.posts)
    else if (paginateurl === `/posts/${slug}?page`) pagination = useSelector(state => state.posts)
    else pagination = useSelector(state => state.tours)


    const fetchdatawithPagination = async (i) => {
        const response = await axios.get(`${api}=${i}`)

        if (api === `${config.server_url}/all/posts?page`) {
            dispatch(allPosts(response.data))
        }
        if (api === `${config.server_url}/category/posts/${slug}?page`) {
            dispatch(categoryPost(response.data))
        }
        if (api === `${config.server_url}/all/tours?page`) {
            dispatch(alltours(response.data))
        }
        if (api === `${config.server_url}/destination/${slug}?page`) {
            dispatch(alltours(response.data))
        }
        if (api === `${config.server_url}/search?loc=${loc}&dep_date=${dep_date}&re_date=${re_date}&page`) {
            dispatch(alltours(response.data))
        }
        if (api === `${config.server_url}/bookings?page`) {
            dispatch(bookings(response.data))
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
                                        onClick={() => fetchdatawithPagination(pagination.response?.page - 1)}
                                        to={`${paginateurl}=${pagination.response?.page - 1}`}>
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
                                        to={`${paginateurl}=${i + 1}`}
                                        onClick={() => fetchdatawithPagination(i + 1)}
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
                                        onClick={() => fetchdatawithPagination(pagination.response?.page + 1)}
                                        to={`${paginateurl}=${pagination.response?.page + 1}`}>
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
