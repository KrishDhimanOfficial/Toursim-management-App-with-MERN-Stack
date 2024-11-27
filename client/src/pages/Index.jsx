import React from 'react'
import {
    Tour_row,
    Destinations_row,
    Post_row,
} from '../components/componets'

const Index = () => {
    console.log('Index Render')

    return (
        <>
            <Tour_row />
            <Destinations_row />
            <Post_row />
        </>
    )
}

export default Index