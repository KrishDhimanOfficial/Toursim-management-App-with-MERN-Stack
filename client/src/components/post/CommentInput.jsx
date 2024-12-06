import React, { useRef } from 'react'
import { Button } from '../componets'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import config from '../../config/config'
import { useNavigate } from 'react-router'
import AlertMessage from '../../Hooks/AlertMessage'


const CommentInput = ({ post_id }) => {

    const buttonRef = useRef()
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm()

    const handlePostcomment = async (comment) => {
        const token = localStorage.getItem('token')
        if (!token) navigate('/login')

        const response = await axios.post(`${config.server_url}/post/comment`, {
            token,
            comment: comment?.comment.trim(),
            post_id
        })

        // Send Server And Reset Form
        if (response) {
            AlertMessage(response.data.message, response.data.error)
            reset()
        }
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
