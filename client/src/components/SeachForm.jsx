import React from 'react'

const SeachForm = () => {
    return (
        <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="flights">
                <div className="row">
                    <div className="col-xxs-12 col-xs-6 mt">
                        <div className="input-field">
                            <label htmlFor="from">From:</label>
                            <input type="text" className="html form-control" id="from-place" placeholder="Los Angeles, USA" />
                        </div>
                    </div>
                    <div className="col-xxs-12 col-xs-6 mt">
                        <div className="input-field">
                            <label htmlFor="from">To:</label>
                            <input type="text" className="html form-control" id="to-place" placeholder="Tokyo, Japan" />
                        </div>
                    </div>
                    <div className="col-xxs-12 col-xs-6 mt alternate">
                        <div className="input-field">
                            <label htmlFor="date-start">Check In:</label>
                            <input type="text" className="html form-control" id="date-start" placeholder="mm/dd/yyyy" />
                        </div>
                    </div>
                    <div className="col-xxs-12 col-xs-6 mt alternate">
                        <div className="input-field">
                            <label htmlFor="date-end">Check Out:</label>
                            <input type="text" className="html form-control" id="date-end" placeholder="mm/dd/yyyy" />
                        </div>
                    </div>
                    <div className="col-sm-12 mt">
                        <section>
                            <label htmlFor="className">class:</label>
                            <select className="cs-select cs-skin-border form-control">
                                <option disabled >Economy</option>
                                <option value="economy">Economy</option>
                                <option value="first">First</option>
                                <option value="business">Business</option>
                            </select>
                        </section>
                    </div>
                    <div className="col-xxs-12 col-xs-6 mt">
                        <section>
                            <label htmlFor="className">Adult:</label>
                            <select className="cs-select cs-skin-border form-control">
                                <option disabled >1</option>
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
                            <select className="cs-select cs-skin-border form-control">
                                <option disabled >1</option>
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
                            value="Search"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeachForm
