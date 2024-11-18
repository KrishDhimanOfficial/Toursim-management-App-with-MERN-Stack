import React from 'react'
import { Link, NavLink } from 'react-router-dom'


const Header = () => {
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
                            <li className="active"><a href="index.html">Home</a></li>
                            <li>
                                <a href="vacation.html" className="fh5co-sub-ddown">Vacations</a>
                                <ul className="fh5co-sub-menu">
                                    <li><Link to=''>Family</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to=''>Flights</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header
