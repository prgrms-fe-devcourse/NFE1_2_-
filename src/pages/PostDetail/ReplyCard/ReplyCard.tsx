import ReplyIcon from '@assets/icons/details_reply.svg?react'
import './ReplyCard.css'
import CommentCard from '../CommentCard/CommentCard'
const ReplyCard = () => {
  return (
    <div className='reply-card'>
      <ReplyIcon
        width={20}
        height={20}
      />
      <CommentCard />
    </div>
  )
}

export default ReplyCard
