import React, { useRef, useState } from 'react'
import { Button, Input } from '../componets'
import axios from 'axios'
import config from '../../config/config'
import { useForm, useController } from 'react-hook-form'
import { useNavigate } from 'react-router'
import AlertMessage from '../../Hooks/AlertMessage'

const CommentList = ({ username, comment, parent_id, post_id, replies, }) => {
    const inputRef = useRef()
    const naviagte = useNavigate()
    const { control, handleSubmit, reset } = useForm()
    const [hidden, sethidden] = useState(true)
    const { field } = useController({ name: 'comment', control })

    const displayInput = () => { sethidden(prev => !prev) }

    const replycomment = async (data) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) naviagte('/login')

            // Sending Response
            const response = await axios.post(`${config.server_url}/reply/comment`, {
                comment: data.comment.trim(),
                token,
                parentId: parent_id,
                post_id
            })

            if (response) {
                AlertMessage(response.data.message, response.data.error)
                reset()
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="bg-white border border-gray-300 border-l-4 border-orange-600 p-4 mb-4"
                style={{ margin: `1.5rem ${2}rem` }}>
                <div className='w-100'>
                    <p className="font-bold text-xl text-gray-900">
                        {username}
                    </p>
                    <p className="text-lg mb-4">
                        {comment}
                    </p>
                    <form onSubmit={handleSubmit(replycomment)}>
                        <div className='flex align-center'>
                            <Input
                                ref={inputRef}
                                type={hidden ? 'hidden' : 'text'}
                                onChange={field.onChange}
                                name={fetch.name}
                                classs={'form-control w-100 '}
                                placeholder={'write a reply...'}
                            />
                            <button
                                type='submit'
                                onClick={() => displayInput()}
                                className="btn-reply ms-2">
                                Reply
                            </button>
                        </div>
                    </form>
                    {
                        replies?.map((reply, i) => (
                            (reply.parentId === parent_id &&
                                <CommentList key={i}
                                    post_id={post_id}
                                    parent_id={reply._id}
                                    username={reply.username}
                                    comment={reply.comment}
                                    replies={replies} />
                            )
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default React.memo(CommentList)