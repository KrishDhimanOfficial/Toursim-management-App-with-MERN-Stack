import React, { useRef } from 'react'
import { Button } from '../componets'

const CommentInput = () => {
    const buttonRef = useRef()
    return (
        <>
            <div className="form-floating" style={{ marginBottom: '20px' }}>
                <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    style={{ height: '100px', fontSize: '1.5rem' }}>
                </textarea>
            </div>

            <Button
                ref={buttonRef}
                type={'button'}
                text={'Comment'}
                classes={'mt-3 py-3 fw-semibold'}
            />
        </>
    )
}

export default React.memo(CommentInput)
