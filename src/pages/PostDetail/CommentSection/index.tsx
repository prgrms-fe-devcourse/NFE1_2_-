import { Post } from '@/typings/types'
import './index.css'
import { useState } from 'react'
import CommentCard from '../CommentCard'
import CommentBtn from '../CommentBtn'
import CommentInput from '../CommentInput'

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
        {comments.map((comment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
          />
        ))}
        <CommentBtn onClick={handleModalState} />
        {isModalOpen && (
          <CommentInput
            onClick={handleModalState}
            post={post}
          />
        )}
      </section>
    </>
  )
}

export default CommentSection
