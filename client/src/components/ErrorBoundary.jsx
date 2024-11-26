import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="container">
                    <div className="row" style={{margin :'30px 0'}}>
                        <div className="col-12">
                            <h2 className='text-center'>Oops! Something went wrong.</h2>
                        </div>
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}