import { useEffect, useState } from 'react'
import PostCard from '@/components/PostComponent/PostComponent'
import Interaction from '../Interaction/Interaction'
import { Post } from '@/typings/types'
import { useNavigate } from 'react-router-dom'

const PreviewPost = ({ post }: { post: Post }) => {
  const navigate = useNavigate()
  const [checkCount, setCheckCount] = useState(0)

  // 조회수 - 컴포넌트가 마운트될 때 checkCount를 로컬 스토리지에서 가져옴
  useEffect(() => {
    const storedCheckCount = localStorage.getItem(`checkCount_${post._id}`)
    if (storedCheckCount) {
      setCheckCount(Number(storedCheckCount)) // 문자열을 숫자로 변환
    }
  }, [post._id])

  const handlePostClick = () => {
    const userId = post.author._id
    console.log(userId)
    const userCheckCountKey = `checkCount_${post._id}_${userId}` // 사용자별 체크 카운트 키

    // 사용자가 이미 클릭한 경우에는 카운트 증가하지 않음
    if (!localStorage.getItem(userCheckCountKey)) {
      setCheckCount((prevCount) => {
        const newCount = prevCount + 1 // checkCount 증가
        localStorage.setItem(`checkCount_${post._id}`, String(newCount)) // 전체 카운트를 로컬 스토리지에 저장
        localStorage.setItem(userCheckCountKey, 'true') // 사용자가 클릭했음을 기록
        return newCount // 업데이트된 checkCount 반환
      })
    }

    navigate('/postdetail') // 상세 페이지로 이동
  }
  return (
    <section
      className='post-section'
      onClick={handlePostClick}
      style={{ cursor: 'pointer' }}
    >
      <PostCard
        post={post}
        truncate={true}
        checkCount={checkCount}
      />
      <Interaction
        likes={post.likes.length}
        comments={post.comments.length}
        polls={30}
      />
    </section>
  )
}

export default PreviewPost
