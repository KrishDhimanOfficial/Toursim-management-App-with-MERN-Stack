import React from 'react'
import { Sec_Heading, Tour } from '../components/componets'
import { useSelector } from 'react-redux'

const SearchedPackage = () => {
    const { searchedPackages } = useSelector(state => state.tours)
    console.log(searchedPackages);

    return (
        <div id="fh5co-blog-section" className="fh5co-section-gray">
            <div className="container">
                <Sec_Heading
                    heading={'Search Results'}
                    description={'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'} />
                <div className="row" style={{ display: 'flex', alignItems: 'stretch' }}>

                    {
                        searchedPackages?.response?.length == 0
                            ? <div className="col-md-12 text-center">
                                <h1>No Packages Available</h1>
                            </div>
                            : searchedPackages?.response?.map((tour, i) => (
                                <Tour
                                    key={i}
                                    location={tour.location?.location_name}
                                    imgPath={`${searchedPackages.tour_img_url}/${tour.featured_image}`}
                                    price={tour.price}
                                    slug={tour.slug}
                                />
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchedPackage
