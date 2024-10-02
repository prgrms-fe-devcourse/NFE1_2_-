import SendMessageIcon from '@assets/icons/details_send.svg?react'
import BottomModal from '@components/BottomModal/BottomModal'
import './index.css'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { FormattedPost } from '@/typings/types'
import {
  postComment,
  postNotification,
  USER_ID,
  UserComment,
} from '@/utils/api'
import useCustomMutation from '@/hooks/useCustomMutaition'

interface CommentInputProps {
  onClick: () => void
  post: FormattedPost
  parentInfo: string
  setParentCommentInfo: Dispatch<SetStateAction<string>>
}

const CommentInput = ({
  onClick,
  post,
  parentInfo,
  setParentCommentInfo,
}: CommentInputProps) => {
  const [userComment, setUserComment] = useState('')

  const { _id } = post
  const postId = _id
  const mutationFn = (userComment: UserComment) => postComment(userComment)
  const onSuccessCallback = (responsData: { _id: string }) => {
    setUserComment('')
    onClick()
    const { _id } = responsData
    const messageNotification = {
      notificationType: 'COMMENT',
      notificationTypeId: _id,
      userId: USER_ID,
      postId: postId,
    }
    postNotification(messageNotification)
  }

  const { mutate, isPending } = useCustomMutation({
    queryKey: ['post', _id],
    mutationFn,
    onSuccessCallback,
  })

  const handleMessageInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const userComment = event.currentTarget.value.trim()
    setUserComment(userComment)
  }

  const formatUserComment = () => {
    const { _id } = post
    const parentId = parentInfo === '' ? null : parentInfo
    const newComment = JSON.stringify({
      comment: userComment,
      parentId,
      like: [],
    })
    return { postId: _id, comment: newComment }
  }

  const handleSubmitMessage = () => {
    const userComment = formatUserComment()
    // 대댓글 작성시 기존에 있던 parentId 값 초기화
    setParentCommentInfo('')
    mutate(userComment)
  }

  return (
    <BottomModal
      buttonText={'닫기'}
      onClick={onClick}
    >
      <div className='message-input-container'>
        {!isPending && (
          <>
            <textarea
              id=''
              name='message'
              placeholder='댓글을 입력해주세요.'
              onChange={(event) => handleMessageInput(event)}
            />
            <button
              className='send-button'
              onClick={handleSubmitMessage}
            >
              <SendMessageIcon
                width={20}
                height={20}
              />
            </button>
          </>
        )}
      </div>
    </BottomModal>
  )
}

export default CommentInput
