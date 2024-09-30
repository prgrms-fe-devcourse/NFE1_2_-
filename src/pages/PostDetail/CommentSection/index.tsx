import { Post } from '@/typings/types'
import './index.css'
import { useState } from 'react'
import MessageBtn from '../MessageBtn'
import MessageInput from '../MessageInput'

const CommentSection = ({ post }: { post: Post }) => {
  const [inputState, setInputState] = useState(false)
  const { comments } = post

  const handleModalState = () => {
    setInputState(!inputState)
  }
  return (
    <>
      <section className='comment-section'>
        <p className='comment-total'>댓글 {comments.length}</p>
        <MessageBtn onClick={handleModalState} />
        {inputState && <MessageInput onClick={handleModalState} />}
      </section>
    </>
  )
}

export default CommentSection
