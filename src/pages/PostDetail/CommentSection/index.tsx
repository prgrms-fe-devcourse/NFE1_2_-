import { Post } from '@/typings/types'
import './index.css'
import { useState } from 'react'
import MessageBtn from '../MessageBtn'
import MessageInput from '../MessageInput'

const CommentSection = ({ post }: { post: Post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { comments } = post

  const handleModalState = () => {
    setIsModalOpen((prevState) => !prevState)
  }
  return (
    <>
      <section className='comment-section'>
        <p className='comment-total'>댓글 {comments.length}</p>
        <MessageBtn onClick={handleModalState} />
        {isModalOpen && <MessageInput onClick={handleModalState} />}
      </section>
    </>
  )
}

export default CommentSection
