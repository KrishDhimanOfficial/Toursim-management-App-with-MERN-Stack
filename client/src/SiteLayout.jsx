import React from 'react'
import { Header } from './components/componets'
import { Outlet } from 'react-router'

const SiteLayout = () => {
    return (
        <div id="fh5co-wrapper">
            <div id="fh5co-page">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default SiteLayout
