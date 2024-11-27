import React from 'react'
import { NavLink, Link } from 'react-router-dom'


const Header = () => {
    console.log("Header Render");
    
    return (
        <header id="fh5co-header-section" className="sticky-banner">
            <div className="container">
                <div className="nav-header">
                    <Link to='/' className="js-fh5co-nav-toggle fh5co-nav-toggle dark">
                        <i></i>
                    </Link>
                    <h1 id="fh5co-logo">
                        <Link to='/'>
                            <i className="icon-airplane">
                            </i>Travel
                        </Link>
                    </h1>
                    <nav id="fh5co-menu-wrap" role="navigation">
                        <ul className="sf-menu" id="fh5co-primary-menu">
                            <li>
                                <NavLink to='/'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/tours'
                                    className={({ isActive }) => `${isActive ? 'active' : ''}`}>
                                    Tours
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/posts'>Blogs</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header
