import React, { useRef, useState } from 'react'
import { Input, Button, CategoryList } from '../componets'
import axios from 'axios'
import config from '../../config/config'
import { useForm, useController } from 'react-hook-form'
import { useNavigate } from 'react-router'

const CommentList = ({ index, username, comment, parent_id, slug, leftgap }) => {
    const inputcommentRef = useRef()
    const btnRef = useRef()
    const naviagte = useNavigate()
    const { control, handleSubmit } = useForm()
    const { field } = useController({ name: 'comment', control })

    const replycomment = async (data) => {
        try {
            console.log(data, parent_id)
            const token = localStorage.getItem('token')
            if (!token) naviagte('/login')

            // Sending Response
            const response = await axios.post(`${config.server_url}/reply/comment`, {
                data, token, parentId: parent_id, slug
            })
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div style={{ width: '50%', background: '#fff', padding: '20px', borderRadius: '20px', margin: '1rem 0', marginLeft: `${leftgap}px` || 0 }}>
            <form onSubmit={handleSubmit(replycomment)}>
                <span>{username}{index}</span>
                <p style={{ margin: '10px 12px' }}>
                    {comment}
                </p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Input
                        ref={inputcommentRef}
                        type={'text'}
                        onChange={field.onChange}
                        name={field.name}
                        style={{ border: '1px solid #000', padding: '8px 5px' }}
                        placeholder={'write a reply...'}
                    />
                    <Button
                        ref={btnRef}
                        type={'submit'}
                        text={'reply'}
                        style={{ width: '25%', marginTop: '0' }}
                    />
                </div>
            </form>
        </div>
    )
}

export default React.memo(CommentList)
