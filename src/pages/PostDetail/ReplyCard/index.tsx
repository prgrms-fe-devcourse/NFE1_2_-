import ReplyIcon from '@assets/icons/details_reply.svg?react'
import CommentCard from '../CommentCard'
import './index.css'
import { Poll } from '@/typings/types'
import { FormattedChlidrenComment } from '@/utils/formatCommentList'

interface ReplyCardProps {
  reply: FormattedChlidrenComment
  postId: string
  pollData: Poll
  handleModalState: () => void
  onupdateParentInfo: (id: string) => void
}

const ReplyCard = ({
  reply,
  postId,
  pollData,
  handleModalState,
  onupdateParentInfo,
}: ReplyCardProps) => {
  return (
    <div className='reply-card'>
      <ReplyIcon
        width={20}
        height={20}
      />
      <CommentCard
        comment={reply}
        postId={postId}
        isReply={true}
        pollData={pollData}
        handleModalState={handleModalState}
        onupdateParentInfo={onupdateParentInfo}
      />
    </div>
  )
}

export default ReplyCard
