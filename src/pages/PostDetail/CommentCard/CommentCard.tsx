import Bedge from '@components/Bedge/Bedge'
import DetailTimeIcon from '@assets/icons/details_time.svg?react'
import DetailLikeIcon from '@assets/icons/heart_before_select.svg?react'
import DetailMessage from '@assets/icons/details_comment.svg?react'
import './CommentCard.css'

const CommentCard = () => {
  return (
    <div className='comment-card'>
      <div className='comment-personal-detail-container'>
        <Bedge
          type='best'
          body='Best'
        />
        <Bedge
          type='mbti'
          body='ISFP'
        />
        <Bedge
          type='agree'
          body='찬성'
        />
        <p className='comment-user-detail'>여/20대</p>
      </div>
      <p className='comment'>
        test123test123test123test123test123test123test123test123test123test123test123test123test123test123test123test123test123test123test123test123test123test123test123test123test123
      </p>
      <div className='comment-detail-container'>
        <div className='comment-detail-left'>
          <div className='comment-detail'>
            <DetailTimeIcon
              width={16}
              height={16}
            />
            <span>1 시간</span>
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
            <span>대댓글</span>
          </div>
        </div>
        <div className='comment-detail-right'>
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
    </div>
  )
}
export default CommentCard
