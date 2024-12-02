import React from 'react'
import { Button } from '../components/componets'
import { useNavigate } from 'react-router'

const Success = () => {
    const navigate = useNavigate()
    return (
        <div id="fh5co-tours" className="fh5co-section-gray">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 style={{ textAlign: 'center' }}>Payment Successfull</h2>
                        <Button
                            style={{ width: '25%', margin: '0 auto' }}
                            fn={() => navigate('/')}
                            type={'button'}
                            text={'Back To Home'}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Success
