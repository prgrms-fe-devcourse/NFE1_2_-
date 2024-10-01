import { Post } from '@/typings/types'
import './index.css'
import { useState } from 'react'
import CommentCard from '../CommentCard'
import CommentBtn from '../CommentBtn'
import CommentInput from '../CommentInput'

const CommentSection = ({ post }: { post: Post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [parentCommentInfo, setParentCommentInfo] = useState('')

  const { comments } = post

  const handleModalState = () => {
    setIsModalOpen((prevState) => !prevState)
  }

  const handleUpdateParentInfo = (parentId: string) => {
    setParentCommentInfo(parentId)
  }

  return (
    <>
      <section className='comment-section'>
        <p className='comment-total'>댓글 {comments.length}</p>
        {comments.map((comment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            handleModalState={handleModalState}
            onupdateParentInfo={handleUpdateParentInfo}
          />
        ))}
        <CommentBtn onClick={handleModalState} />
        {isModalOpen && (
          <CommentInput
            post={post}
            onClick={handleModalState}
            parentInfo={parentCommentInfo}
            setParentCommentInfo={setParentCommentInfo}
          />
        )}
      </section>
    </>
  )
}

export default CommentSection
