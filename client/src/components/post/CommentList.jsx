import React, { useRef, useState } from 'react'
import { Input, Button } from '../componets'
import axios from 'axios'
import { Link } from 'react-router-dom'
import config from '../../config/config'
import { useForm, useController } from 'react-hook-form'
import { useNavigate } from 'react-router'

const CommentList = ({ username, comment, parent_id, post_id, replies, mL }) => {
    const inputRef = useRef()
    const naviagte = useNavigate()
    const { control, handleSubmit } = useForm()
    const [a, setA] = useState(0)
    const [hidden, sethidden] = useState(true)
    const [commentrep, displayrep] = useState(true)
    const { field } = useController({ name: 'comment', control })

    const displayInput = () => { sethidden(prev => !prev) }
    const showcomments = () => {
        displayrep(prev => !prev)
        setA(prev => prev + 1)
        console.log(a);
    }


    const replycomment = async (data) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) naviagte('/login')

            // Sending Response
            if (data.comment) {
                const response = await axios.post(`${config.server_url}/reply/comment`, {
                    data, token, parentId: parent_id, post_id
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div style={{
                width: '50%',
                background: '#fff',
                padding: '20px',
                borderRadius: '20px',
                margin: `10px ${mL}rem`,
            }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <p>user : </p>
                    {username}
                </div>
                <p style={{ margin: '10px 12px' }}>
                    {comment}
                </p>
                <form onSubmit={handleSubmit(replycomment)}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <Input
                            ref={inputRef}
                            type={hidden ? 'hidden' : 'text'}
                            onChange={field.onChange}
                            name={fetch.name}
                            classs={'form-control'}
                            placeholder={'write a reply...'}
                        />
                        <Link
                            onClick={() => displayInput()}
                            to='#'>
                            reply
                        </Link>
                    </div>
                </form>
            </div>
            <Link to='#' onClick={() => showcomments()}>
                {commentrep ? 'Load More' : 'Show Less'}
            </Link>
            {
                commentrep
                    ? ''
                    : replies?.map((reply, i) => (
                        (reply.parentId === parent_id &&
                            <div key={i}>
                                {setA(prev => prev+1)}
                                <CommentList
                                    // key={i}
                                    mL={1 + i}
                                    post_id={post_id}
                                    parent_id={reply._id}
                                    username={reply.username}
                                    comment={reply.comment}
                                    replies={replies}
                                />
                            </div>
                        )
                    ))
            }
        </>
    )
}

export default React.memo(CommentList)
