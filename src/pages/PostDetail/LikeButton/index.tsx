import LikeIcon from '@assets/icons/heart_before_select.svg?react'
import SelectedLikeIcon from '@assets/icons/heart_after_select.svg?react'
import './index.css'
import { Like } from '@/typings/types'
import { FC, useEffect, useState } from 'react'
import {
  cancelLiked,
  postLiked,
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
  const [likeCount, setLikeCount] = useState<number>(0)

  const checkUserLike = likes.some(({ user }) => user === USER_ID)
  const likedId = likes.find((like) => like.user === USER_ID)?._id

  useEffect(() => {
    setIsLiked(checkUserLike)
    setLikeCount(likes.length)
  }, [checkUserLike, likes.length])

  const mutationFn = async (): Promise<void> => {
    if (isLiked === false) {
      await postLiked(postId)
    } else {
      const likedId = likes.find((like) => like.user === USER_ID)?._id
      await cancelLiked(likedId as unknown as string)
    }
  }

  const onSuccessCallback = async () => {
    setIsLiked((prevState) => !prevState)
    setLikeCount((prevState) => (isLiked ? prevState - 1 : prevState + 1))

    const requestData: RequestData = {
      notificationType: 'LIKE',
      notificationTypeId: likedId as string,
      userId: USER_ID as string,
      postId,
    }
    await postNotification(requestData)
  }
  const { mutate } = useCustomMutation({
    queryKey: ['post', postId],
    mutationFn,
    onSuccessCallback,
  })

  const handleSubmitLiked = () => mutate()

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
      <p>{likeCount}</p>
    </div>
  )
}

export default LikeButton
