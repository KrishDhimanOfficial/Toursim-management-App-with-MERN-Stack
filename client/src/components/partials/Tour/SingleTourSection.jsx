import React from 'react'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const SingleTourSection = ({ singletour }) => {

    const dep_date = new Date(singletour.tour?.deperature_date)
    const return_date = new Date(singletour.tour?.return_date)


    return (
        <>
            <h2>{singletour.tour?.title}</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '0' }}>
                <li>
                    Deperature Date : {dep_date.toLocaleDateString()}
                </li>
                <li>
                    Location : {singletour.tour?.location.location_name}
                </li>
                <li>
                    Seats : {singletour.tour?.total_Seats}
                </li>
                <li>
                    Return Date : {return_date.toLocaleDateString()}
                </li>
            </ul>
            <div>
                <Fade>
                    {
                        singletour.tour?.product_images?.map((image, i) => (
                            <div key={i} >
                                <img
                                    style={{ width: '100%', height: '400px', objectFit: 'contain' }}
                                    src={`${singletour.tour_img_url}/${image}`} />
                            </div>
                        ))
                    }
                </Fade>
            </div>
            <div style={{ margin: '3rem 0' }}>
                <h2 style={{ marginBottom: '10px', color: '#000' }} className='font-semibold'>Description</h2>
                <p
                    dangerouslySetInnerHTML={{ __html: singletour.tour?.description }}
                />
            </div>
            <div style={{ margin: '3rem 0' }}>
                <h2 style={{ marginBottom: '10px', color: '#000' }} className='font-semibold'>Included</h2>
                <div style={{ width: '100%', height: '1px', background: '#000' }}></div>
                <ul style={{ fontSize: '1.8rem', listStyle: 'circle', fontWeight: 'lighter', marginBlock: '10px' }}>
                    {
                        singletour.tour?.product_included.map((included, i) => (
                            <li key={i}>
                                {included}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div style={{ margin: '3rem 0' }}>
                <h2 style={{ marginBottom: '10px', color: '#000' }} className='font-semibold'>Excluded</h2>
                <div style={{ width: '100%', height: '1px', background: '#000' }}></div>
                <ul style={{ listStyle: 'circle', fontSize: '1.8rem', fontWeight: 'lighter', marginBlock: '10px' }}>
                    {
                        singletour.tour?.product_excluded.map((included, i) => (
                            <li key={i}>
                                {included}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div style={{ margin: '3rem 0' }}>
                <h2 style={{ marginBottom: '10px', color: '#000' }} className='font-semibold'>Traveling Plan</h2>
                <div style={{ width: '100%', height: '1px', background: '#000', marginBottom: '20px' }}></div>
                <p
                    dangerouslySetInnerHTML={{ __html: singletour.tour?.travelling_plan }}
                />
            </div>
        </>
    )
}

export default React.memo(SingleTourSection)
