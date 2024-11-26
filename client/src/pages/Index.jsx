import React from 'react'
import {
    Tour_row,
    Destinations_row,
    Post_row,
    ErrorBoundary
} from '../components/componets'

const Index = () => {
    console.log('Index Render')

    return (
        <>
            <Tour_row />
            <Destinations_row />
            <ErrorBoundary >
                <Post_row />
            </ErrorBoundary>
        </>
    )
}

export default Index