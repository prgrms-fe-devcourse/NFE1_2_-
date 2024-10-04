import LikeIcon from '@assets/icons/heart_before_select.svg?react'
import SelectedLikeIcon from '@assets/icons/heart_after_select.svg?react'
import './index.css'
import { FormattedPost } from '@/typings/types'
import { FC, useEffect, useState } from 'react'
import {
  cancelLiked,
  getUserData,
  postLiked,
  postNotification,
  RequestData,
  USER_ID,
} from '@/utils/api'
import useCustomMutation from '@/hooks/useCustomMutaition'

interface LikeButtonProps {
  post: FormattedPost
}

const LikeButton: FC<LikeButtonProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState<boolean | null>(null)
  const [likeCount, setLikeCount] = useState<number>(0)

  const { likes, _id, author } = post

  useEffect(() => {
    const checkUserLike = likes.some(({ user }) => user === USER_ID)
    setIsLiked(checkUserLike)
    setLikeCount(likes.length)
  }, [likes])

  const mutationFn = async (): Promise<void> => {
    if (!isLiked) {
      await postLiked(_id)
      const userData = await getUserData(USER_ID as string)
      const likedId = userData.likes.find((like) => like.user === USER_ID)?._id

      const requestData: RequestData = {
        notificationType: 'LIKE',
        notificationTypeId: likedId as string,
        userId: author._id,
        postId: _id,
      }

      await postNotification(requestData)
    } else {
      const likedId = likes.find((like) => like.user === USER_ID)?._id
      await cancelLiked(likedId as unknown as string)
    }
  }

  const onSuccessCallback = () => {
    setIsLiked((prevState) => !prevState)
    setLikeCount((prevCount) => prevCount + (isLiked ? -1 : 1))
  }

  const { mutate } = useCustomMutation({
    queryKey: ['post', _id],
    mutationFn,
    onSuccessCallback,
  })

  const handleSubmitLiked = () => {
    mutate()
  }

  return (
    <div className='like-btn-container'>
      <button
        className='like-btn'
        onClick={handleSubmitLiked}
      >
        {isLiked ? (
          <SelectedLikeIcon
            width={33}
            height={33}
          />
        ) : (
          <LikeIcon
            width={33}
            height={33}
            fill='#eee'
          />
        )}
      </button>
      <p>{likeCount}</p>
    </div>
  )
}

export default LikeButton
