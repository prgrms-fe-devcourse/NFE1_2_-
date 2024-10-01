import { Post } from '@/typings/types'
import './index.css'
import { useState } from 'react'
import CommentBtn from '../CommentBtn'
import CommentInput from '../CommentInput'

const CommentSection = ({ post }: { post: Post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { comments } = post
  console.log(comments)
  const handleModalState = () => {
    setIsModalOpen((prevState) => !prevState)
  }

  return (
    <>
      <section className='comment-section'>
        <p className='comment-total'>댓글 {comments.length}</p>
        {}
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
