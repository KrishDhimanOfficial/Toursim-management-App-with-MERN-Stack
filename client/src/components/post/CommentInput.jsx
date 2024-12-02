import React, { useRef } from 'react'
import { Button } from '../componets'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import config from '../../config/config'
import { useNavigate, useParams } from 'react-router'


const CommentInput = ({ post_id }) => {
    const { post_slug } = useParams()
    
    const buttonRef = useRef()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()

    const handlePostcomment = async (comment) => {
        const token = localStorage.getItem('token')
        if (!token) navigate('/login')

        const response = await axios.post(`${config.server_url}/post/comment`, { token, comment, post_id })
        console.log(response);
    }
    return (
        <>
            <form onSubmit={handleSubmit(handlePostcomment)}>
                <div className="form-floating" style={{ marginBottom: '20px' }}>
                    <textarea
                        {...register('comment')}
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea"
                        style={{ height: '100px', fontSize: '1.5rem' }}>
                    </textarea>
                </div>

                <Button
                    ref={buttonRef}
                    fn={() => handlePostcomment()}
                    type={'submit'}
                    text={'Comment'}
                    classes={'mt-3 py-3 fw-semibold'}
                />
            </form>
        </>
    )
}

export default React.memo(CommentInput)
