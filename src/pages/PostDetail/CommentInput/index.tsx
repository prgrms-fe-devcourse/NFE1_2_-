import SendMessageIcon from '@assets/icons/details_send.svg?react'
import BottomModal from '@components/BottomModal/BottomModal'
import './index.css'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  KeyboardEvent,
} from 'react'
import { FormattedPost } from '@/typings/types'
import {
  postComment,
  postNotification,
  RequestData,
  UserComment,
} from '@/utils/api'
import useCustomMutation from '@/hooks/useCustomMutaition'

interface CommentInputProps {
  onClick: () => void
  post: FormattedPost
  parentInfo: string
  setParentCommentInfo: Dispatch<SetStateAction<string>>
}

interface CommentState {
  raw: string
  trimmed: string
}

const CommentInput = ({
  onClick,
  post,
  parentInfo,
  setParentCommentInfo,
}: CommentInputProps) => {
  const [userComment, setUserComment] = useState<CommentState>({
    raw: '',
    trimmed: '',
  })
  const { _id, author } = post
  const postId = _id

  const mutationFn = (userComment: UserComment) => postComment(userComment)
  const onSuccessCallback = (responseData: UserComment) => {
    setUserComment({ raw: '', trimmed: '' })
    onClick()

    const { _id } = responseData
    const messageNotification: RequestData = {
      notificationType: 'COMMENT',
      notificationTypeId: _id as string,
      userId: author._id,
      postId: postId,
    }
    postNotification(messageNotification)
  }

  const { mutate, isPending } = useCustomMutation({
    mutationFn,
    onSuccessCallback,
    queryKey: ['post', _id],
  })

  const handleMessageInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const rawComment = event.currentTarget.value
    const trimmedComment = rawComment.trim()
    setUserComment({ raw: rawComment, trimmed: trimmedComment })
  }

  const formatUserComment = () => {
    const { _id } = post
    const parentId = parentInfo === '' ? null : parentInfo
    const newComment = JSON.stringify({
      comment: userComment.raw,
      parentId,
    })
    return { postId: _id, comment: newComment }
  }

  const handleSubmitMessage = () => {
    if (userComment.trimmed !== '') {
      const formattedComment = formatUserComment()
      setParentCommentInfo('')
      mutate(formattedComment)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmitMessage()
    }
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
              placeholder='댓글을 입력해주세요. (Shift+Enter로 줄바꿈)'
              onChange={handleMessageInput}
              onKeyDown={handleKeyDown}
              value={userComment.raw}
            />
            <button
              className={`send-button ${userComment.trimmed === '' ? 'disabled' : ''}`}
              onClick={handleSubmitMessage}
              disabled={userComment.trimmed === ''}
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
