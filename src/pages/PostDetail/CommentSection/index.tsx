import { FormattedPost, Poll } from '@/typings/types'
import './index.css'
import { useState } from 'react'
import CommentCard from '../CommentCard'
import CommentBtn from '../CommentBtn'
import CommentInput from '../CommentInput'
import ReplyCard from '../ReplyCard'
import formatCommentList from '@/utils/formatCommentList'

const CommentSection = ({ post }: { post: FormattedPost }) => {
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

  const commentList = formatCommentList(comments)

  return (
    <>
      <section className='comment-section'>
        <p className='comment-total'>댓글 {comments.length}</p>
        {!comments.length && <p>댓글을 남겨주세요.</p>}
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
