import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Sec_Heading, Post } from '../components/componets'
import config from '../config/config'
import { getPosts } from '../features/post'

const Posts = () => {
    return (
        <div id="fh5co-blog-section" className="fh5co-section-gray">
            <div className="container">
                <Sec_Heading
                    heading={'Our Blogs'}
                    description={'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'} />
            </div>
            <div className="container">
                <div className="row row-bottom-padded-md">
                    <Post
                        title={'30% Discount To Travel All World'}
                        date={'Sep 30'}
                        commentLength={21}
                        url={'#'}
                        imgPath={'path'}
                        description={'Far far away, behind the word mountains, far from the countries Vokalia andConsonantia, there live the blind texts.'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Posts