import React from 'react'
import { Footer, Header, Banner } from './components/componets'
import { Outlet } from 'react-router'

const SiteLayout = () => {
    return (
        <div id="fh5co-wrapper">
            <div id="fh5co-page">
                <Header />
                <Banner />
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}

export default SiteLayout
