import React from 'react'
import {
    Sec_Heading,
    Tours, Post,
    Destination,
    NaviagteUser
} from '../components/componets'

const Index = () => {
    return (
        <>
            <div id="fh5co-tours" className="fh5co-section-gray">
                <div className="container">
                    <Sec_Heading
                        heading={'Hot Tours'}
                        description={'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'} />
                    <div className="row">
                        <Tours location={'Paris'} price={1000} />
                        <Tours location={'London'} price={2000} />
                        <Tours location={'Russia'} price={8000} />
                        <NaviagteUser url={'/'} text={'See All Offers'} />
                    </div>
                </div>
            </div>
            <div id="fh5co-destination">
                <div className="tour-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <ul id="fh5co-destination-list" className="animate-box">
                                <Destination location={'Paris'} />
                                <Destination location={'London'} />
                                <Destination location={'Thailand'} />
                                <Destination location={'Japan'} />
                                <Destination location={'Goa'} />
                                <li class="one-half text-center">
                                    <div class="title-bg">
                                        <div class="case-studies-summary">
                                            <h2>Most Popular Destinations</h2>
                                            <span><a href="#">View All Destinations</a></span>
                                        </div>
                                    </div>
                                </li>
                                <Destination location={'Kasauli'} />
                                <Destination location={'Norway'} />
                                <Destination location={'China'} />
                                <Destination location={'Shimla'} />
                                <Destination location={'Poland'} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="fh5co-blog-section" className="fh5co-section-gray">
                <div className="container">
                    <Sec_Heading
                        heading={'Recent Form Blog'}
                        description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit est facilis maiores, perspiciatis accusamus asperiores sint consequuntur debitis.'} />
                    <div className="row row-bottom-padded-md">
                        <Post
                            title={'30% Discount To Travel All World'}
                            date={'Sep 30'}
                            commentLength={21}
                            url={'#'}
                            description={'Far far away, behind the word mountains, far from the countries Vokalia andConsonantia, there live the blind texts.'}
                        />
                    </div>
                    <NaviagteUser url={'/'} text={'See All Offers'} />
                </div>
            </div>
        </>
    )
}

export default Index