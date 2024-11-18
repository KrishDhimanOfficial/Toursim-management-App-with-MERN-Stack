import React from 'react'
import { Link } from 'react-router-dom'

function Banner() {
    return (
        <div className="fh5co-hero">
            <div className="fh5co-overlay"></div>
            <div className="fh5co-cover" data-stellar-background-ratio="0.5" style={
                { backgroundImage: '' }
            }>
                <div className="desc">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 col-md-5">
                                <div className="tabulation animate-box">

                                    <ul className="nav nav-tabs" role="tablist">
                                        <li role="presentation" className="active">
                                            <Link to='' aria-controls="flights" role="tab" data-toggle="tab">Flights</Link>
                                        </li>
                                    </ul>

                                    <div className="tab-content">
                                        <div role="tabpanel" className="tab-pane active" id="flights">
                                            <div className="row">
                                                <div className="col-xxs-12 col-xs-6 mt">
                                                    <div className="input-field">
                                                        <label htmlFor="from">From:</label>
                                                        <input type="text" className="htmlForm-control" id="from-place" placeholder="Los Angeles, USA" />
                                                    </div>
                                                </div>
                                                <div className="col-xxs-12 col-xs-6 mt">
                                                    <div className="input-field">
                                                        <label htmlFor="from">To:</label>
                                                        <input type="text" className="htmlForm-control" id="to-place" placeholder="Tokyo, Japan" />
                                                    </div>
                                                </div>
                                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                                    <div className="input-field">
                                                        <label htmlFor="date-start">Check In:</label>
                                                        <input type="text" className="htmlForm-control" id="date-start" placeholder="mm/dd/yyyy" />
                                                    </div>
                                                </div>
                                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                                    <div className="input-field">
                                                        <label htmlFor="date-end">Check Out:</label>
                                                        <input type="text" className="htmlForm-control" id="date-end" placeholder="mm/dd/yyyy" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 mt">
                                                    <section>
                                                        <label htmlFor="className">className:</label>
                                                        <select className="cs-select cs-skin-border">
                                                            <option disabled defaultValue={'Economy'}>Economy</option>
                                                            <option value="economy">Economy</option>
                                                            <option value="first">First</option>
                                                            <option value="business">Business</option>
                                                        </select>
                                                    </section>
                                                </div>
                                                <div className="col-xxs-12 col-xs-6 mt">
                                                    <section>
                                                        <label htmlFor="className">Adult:</label>
                                                        <select className="cs-select cs-skin-border">
                                                            <option disabled defaultValue={'Economy'}>1</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                        </select>
                                                    </section>
                                                </div>
                                                <div className="col-xxs-12 col-xs-6 mt">
                                                    <section>
                                                        <label htmlFor="className">Children:</label>
                                                        <select className="cs-select cs-skin-border">
                                                            <option disabled defaultValue={'Economy'}>1</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                        </select>
                                                    </section>
                                                </div>
                                                <div className="col-xs-12">
                                                    <input type="submit"
                                                        className="btn btn-primary btn-block"
                                                        value="Search Flight"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="desc2 animate-box">
                                <div className="col-sm-7 col-sm-push-1 col-md-7 col-md-push-1">
                                    <p>HandCrafted by <a href="http://frehtml5.co/" target="_blank" className="fh5co-site-name">FreeHTML5.co</a></p>
                                    <h2>Exclusive Limited Time Offer</h2>
                                    <h3>Fly to Hong Kong via Los Angeles, USA</h3>
                                    <span className="price">$599</span>
                                    {/* <p><a className="btn btn-primary btn-lg" href="#">Get Started</a></p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Banner
