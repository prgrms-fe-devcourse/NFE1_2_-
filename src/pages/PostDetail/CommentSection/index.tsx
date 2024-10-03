import { Post } from '@/typings/types'
import './index.css'
import { useState } from 'react'
import CommentCard from '../CommentCard'
import CommentBtn from '../CommentBtn'
import CommentInput from '../CommentInput'
import BeforePollImg from '@assets/imgs/투표 전 사진.png'
interface CommentSectionProps {
  post: Post
  isVoted: boolean | null
}
const CommentSection = ({ post, isVoted }: CommentSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [parentCommentInfo, setParentCommentInfo] = useState('')

  const { _id, comments } = post
  const pollData = post.title.poll

  const handleModalState = () => {
    setIsModalOpen((prevState) => !prevState)
  }

  const handleUpdateParentInfo = (parentId: string) => {
    setParentCommentInfo(parentId)
  }

  if (!isVoted) {
    return (
      <>
        <section className='comment-section'>
          <p className='comment-total'>댓글 17</p>
          <img src={BeforePollImg} />
        </section>
      </>
    )
  }

  return (
    <>
      <section className='comment-section'>
        <p className='comment-total'>댓글 {comments.length}</p>
        {!comments.length && <p>댓글을 남겨주세요.</p>}
        {comments.map((comment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            postId={_id}
            pollData={pollData}
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
