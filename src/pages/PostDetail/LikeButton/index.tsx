import LikeIcon from '@assets/icons/heart_before_select.svg?react'
import SelectedLikeIcon from '@assets/icons/heart_after_select.svg?react'
import './index.css'
import { Like } from '@/typings/types'
import { FC, useEffect, useState } from 'react'
import {
  getLikedData,
  getUserLikedData,
  postNotification,
  RequestData,
  USER_ID,
} from '@/utils/api'
import useCustomMutation from '@/hooks/useCustomMutaition'

interface LikeButtonProps {
  likes: Like[]
  postId: string
}

const LikeButton: FC<LikeButtonProps> = ({ likes, postId }) => {
  const [isLiked, setIsLiked] = useState<boolean | null>(null)

  const mutationFn = (currentLikedState: boolean | null) =>
    getLikedData(currentLikedState, { userId: USER_ID as string, postId })
  const onSuccessCallback = () => setIsLiked((prevState) => !prevState)

  const { mutate } = useCustomMutation({
    queryKey: ['post', postId],
    mutationFn,
    onSuccessCallback,
  })

  useEffect(() => {
    // 최초 진입시 해당 게시물에 유저가 Like를 남겼는지 체크
    const checkUserLike = likes.some(({ user }) => user === USER_ID)
    setIsLiked(checkUserLike)
  }, [likes])

  const handleSubmitLiked = () => {
    mutate(isLiked)
    if (isLiked) {
      const requestData: RequestData = {
        notificationType: 'LIKE',
        userId: USER_ID as string,
        postId,
        notificationTypeId: getUserLikedData(USER_ID as string, postId),
      }
      postNotification(requestData)
    }
  }

  return (
    <div className='like-btn-container'>
      <button
        className='like-btn'
        onClick={handleSubmitLiked}
      >
        {isLiked ? (
          <SelectedLikeIcon
            width={35}
            height={35}
          />
        ) : (
          <LikeIcon
            width={40}
            height={40}
            fill='#eee'
          />
        )}
      </button>
      <p>{likes.length}</p>
    </div>
  )
}

export default LikeButton
