import Bedge from '@components/Bedge/Bedge'
import DetailTimeIcon from '@assets/icons/details_time.svg?react'
import DetailLikeIcon from '@assets/icons/heart_before_select.svg?react'
import DetailMessage from '@assets/icons/details_comment.svg?react'
import './index.css'
import { Comment } from '@/typings/types'
import formatTime from '@/utils/formatTime'
import { useEffect, useState } from 'react'
import { USER_ID } from '@/utils/api'

const CommentCard = ({ comment }: { comment: Comment }) => {
  const [isAuthor, setIsAuthor] = useState<boolean | null>(null)

  useEffect(() => {
    const { author } = comment
    const checkIsAuthor = author._id === USER_ID
    setIsAuthor(checkIsAuthor)
  }, [comment])

  const { createdAt, _id } = comment
  const { gender, ageGroup, mbti } = comment.author.fullName
  const userComment = comment.comment.comment

  const handleRelpyBtn = (event) => {
    const parentCommentId = event.currentTarget.dataset.id
  }
  return (
    <div className='comment-card'>
      <div className='comment-personal-detail-container'>
        <Bedge
          type='best'
          body='Best'
        />
        <Bedge
          type='mbti'
          body={mbti}
        />
        <Bedge
          type='agree'
          body='찬성'
        />
        <p className='comment-user-detail'>
          {gender}/{ageGroup}대
        </p>
      </div>
      <p className='comment'>{userComment}</p>
      <div className='comment-detail-container'>
        <div className='comment-detail-left'>
          <div className='comment-detail'>
            <DetailTimeIcon
              width={16}
              height={16}
            />
            <span>{formatTime(createdAt)}</span>
          </div>
          <div className='comment-detail'>
            <DetailLikeIcon
              width={16}
              height={16}
              fill='#7d7d7d'
            />
            <span>좋아요</span>
          </div>
          <div className='comment-detail'>
            <DetailMessage
              width={16}
              height={16}
            />
            <span>
              <button
                data-id={_id}
                onClick={handleRelpyBtn}
              >
                대댓글
              </button>
            </span>
          </div>
        </div>
        <div className='comment-detail-right'>
          {isAuthor && <button>삭제</button>}
        </div>
      </div>
    </div>
  )
}
export default CommentCard
