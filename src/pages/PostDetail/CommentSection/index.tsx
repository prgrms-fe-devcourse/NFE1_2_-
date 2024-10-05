import { FormattedPost, Poll } from '@/typings/types'
import './index.css'
import { useState } from 'react'
import CommentCard from '../CommentCard'
import CommentBtn from '../CommentBtn'
import CommentInput from '../CommentInput'
import ReplyCard from '../ReplyCard'
import formatCommentList from '@/utils/formatCommentList'
import BeforePollImg from '@assets/imgs/투표 전 사진.png'
import FakeComment from '@assets/imgs/낚시댓글.png'

interface CommentSectionProps {
  post: FormattedPost
  isVoted: boolean | null
}

const CommentSection = ({ post, isVoted }: CommentSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [parentCommentInfo, setParentCommentInfo] = useState('')

  const { _id, comments } = post
  const pollData: Poll = post.title.poll

  const handleModalState = () => {
    setIsModalOpen((prevState) => !prevState)
  }

  const handleUpdateParentInfo = (parentId: string) => {
    setParentCommentInfo(parentId)
  }

  if (!isVoted) {
    const randomNumber = Math.floor(Math.random() * 10) + 1
    const randomArr = Array(randomNumber).fill(0)
    return (
      <>
        <section className='comment-section'>
          <p className='comment-total'>댓글 {randomNumber}</p>
          {randomArr.map((_, index) => {
            return (
              <img
                alt={`낚시 댓글 ${index}`}
                src={FakeComment}
                key={index}
              ></img>
            )
          })}
        </section>
      </>
    )
  }

  const commentList = formatCommentList(comments)
  return (
    <>
      <section className='comment-section'>
        <p className='comment-total'>댓글 {comments.length}</p>
        {!comments.length && (
          <p style={{ marginLeft: '1rem' }}>댓글을 남겨주세요.</p>
        )}
        {commentList.map((comment) => (
          <div key={comment._id}>
            {/* 부모 댓글 렌더링 */}
            <CommentCard
              comment={comment}
              postId={_id}
              pollData={pollData}
              isReply={false}
              handleModalState={handleModalState}
              onupdateParentInfo={handleUpdateParentInfo}
            />

            {/* 자식 댓글(대댓글) 렌더링 */}
            {comment.children.map((reply) => (
              <ReplyCard
                key={reply._id}
                reply={reply}
                postId={_id}
                pollData={pollData}
                handleModalState={handleModalState}
                onupdateParentInfo={handleUpdateParentInfo}
              />
            ))}
          </div>
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
