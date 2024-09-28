import LikeIcon from '@assets/icons/heart_before_select.svg?react'
import SelectedLikeIcon from '@assets/icons/heart_after_select.svg?react'
import './index.css'
import { Like } from '@/typings/types'
import { FC, useCallback, useEffect, useState } from 'react'
import axios from 'axios'

interface LikeButtonProps {
  likes: Like[]
  postId: string
}

const userId = '66f36c0dcdb3ce68a6a135fc'

const LikeButton: FC<LikeButtonProps> = ({ likes, postId }) => {
  const [isLike, setIsLike] = useState<boolean | null>(null)

  useEffect(() => {
    /**
     * 해당 게시물에 유저가 Like를 남겼는지 체크
     * 현재는 id를 적어뒀지만 추후 로그인시 설계된 id를 가져와 사용예정
     */
    const checkUserLike = likes.some(({ user }) => user === userId)
    setIsLike(checkUserLike)
  }, [likes])

  // const handleLikeBtn = useCallback(() => {
  //   if (isLike === false) {
  //     axios.post(
  //       'https://kdt.frontend.5th.programmers.co.kr:5001/likes/create',
  //       { postId },
  //       {
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2ZjM2YzBkY2RiM2NlNjhhNmExMzVmYyIsImVtYWlsIjoidGVzdDEyMzQifSwiaWF0IjoxNzI3NTEzOTAwfQ.YjdnBXhX4HGwUCExxtvnF5xhJx27HitkgPKDqW2yZt4`,
  //         },
  //       },
  //     )
  //   } else {
  //     axios.delete(
  //       'https://kdt.frontend.5th.programmers.co.kr:5001/likes/delete',
  //       {
  //         data: {
  //           id: postId,
  //         },
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2ZjM2YzBkY2RiM2NlNjhhNmExMzVmYyIsImVtYWlsIjoidGVzdDEyMzQifSwiaWF0IjoxNzI3NTEzOTAwfQ.YjdnBXhX4HGwUCExxtvnF5xhJx27HitkgPKDqW2yZt4`,
  //         },
  //       },
  //     )
  //   }
  // }, [isLike, postId])

  return (
    <div className='like-btn-container'>
      <button
        className='like-btn'
        // onClick={handleLikeBtn}
      >
        {isLike ? (
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
