import Bedge from '@components/Bedge/Bedge'
import DetailTimeIcon from '@assets/icons/details_time.svg?react'
import DetailLikeIcon from '@assets/icons/heart_before_select.svg?react'
import DetailMessageIcon from '@assets/icons/details_comment.svg?react'
import './index.css'
import { Comment } from '@/typings/types'
import formatTime from '@/utils/formatTime'
import { useEffect, useState } from 'react'
import { deleteComment, USER_ID } from '@/utils/api'
import useCustomMutation from '@/hooks/useCustomMutaition'

interface CommentCardProps {
  comment: Comment
  postId: string
  handleModalState: () => void
  onupdateParentInfo: (id: string) => void
  pollData: {
    agree: string[]
    disagree: string[]
  }
}

const CommentCard = ({
  comment,
  postId,
  handleModalState,
  onupdateParentInfo,
  pollData,
}: CommentCardProps) => {
  const [isAuthor, setIsAuthor] = useState<boolean | null>(null)

  useEffect(() => {
    const checkIsAuthor = comment.author._id === USER_ID
    setIsAuthor(checkIsAuthor)
  }, [comment.author._id])

  const { mutate } = useCustomMutation({
    mutationFn: () => deleteComment(comment._id),
    queryKey: ['post', postId],
  })

  const { createdAt, author } = comment
  const { gender, ageGroup, mbti } = author.fullName
  const userComment = comment.comment.comment
  const commentAuthorId = author._id

  // 유저가 찬성에 투표했는지 식별
  const isVotedAgree = pollData.agree.includes(commentAuthorId)
  // 유저가 밴대에 투표했는지 식별
  const isVotedDisagree = pollData.disagree.includes(commentAuthorId)

  // 벳지 컴포넌트의 라벨 값
  const getVotedSideLabel = () => {
    if (isVotedAgree) {
      return '찬성'
    }
    if (isVotedDisagree) {
      return '반대'
    }
    return '작성자'
  }

  // 벳지 컴포넌트의 라벨 type 값
  const getVotedSideType = () => {
    if (isVotedAgree) {
      return 'agree'
    }
    if (isVotedDisagree) {
      return 'disagree'
    }
    return 'author'
  }

  const handleReplyBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const parentCommentId = event.currentTarget.dataset.id
    if (parentCommentId) {
      onupdateParentInfo(parentCommentId)
    }
    handleModalState()
  }

  const handleDeleteComment = () => mutate()

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
          type={getVotedSideType()}
          body={getVotedSideLabel()}
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
            <DetailMessageIcon
              width={16}
              height={16}
            />
            <button
              data-id={comment._id}
              onClick={handleReplyBtnClick}
            >
              대댓글
            </button>
          </div>
        </div>
        <div className='comment-detail-right'>
          {isAuthor && <button onClick={handleDeleteComment}>삭제</button>}
        </div>
      </div>
    </div>
  )
}

export default CommentCard
