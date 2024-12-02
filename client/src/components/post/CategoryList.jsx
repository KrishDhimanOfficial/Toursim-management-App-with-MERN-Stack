import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../config/config'

const CategoryList = () => {
    console.log('Category List');

    const [categories, setcategories] = useState([])

    const fetchPostCategories = async () => {
        const response = await axios.get(`${config.server_url}/post/categories`)
        setcategories(response.data)
    }
    useEffect(() => { fetchPostCategories() }, [])
    return (
        <div>
            <h2>All Categories</h2>
            <ul id="fh5co-primary-menu" className='sf-menu' style={{ float: 'inline-start' }}>
                {
                    categories?.map((category, i) => (
                        category.post.length > 0
                            ? <Link
                                key={i}
                                to={`/posts/${category.slug}`}>
                                {category.category_name}
                            </Link>
                            : ''
                    ))
                }
            </ul>
        </div>
    )
}

export default React.memo(CategoryList)
