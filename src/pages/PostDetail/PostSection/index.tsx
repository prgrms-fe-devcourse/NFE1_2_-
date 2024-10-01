import PostComponent from '@components/PostComponent/PostComponent'
import LikeButton from '../LikeButton'
import './index.css'
import { Post } from '@/typings/types'
import { useEffect, useState } from 'react'
import EditPostContainer from '../EditPostContainer'

const PostSection = ({ post }: { post: Post }) => {
  const [isAuthor, setIsAuthor] = useState<boolean | null>(null)
  const { likes, _id, author } = post

  useEffect(() => {
    // 유저가 포스트의 author인지 판단, 그 후 수정 버튼 및 삭제 버튼 표시
    const { _id } = author
    const checkIsAuthor = _id === import.meta.env.VITE_USER_ID
    setIsAuthor(checkIsAuthor)
  }, [author])

  return (
    <section className='post-section'>
      <PostComponent post={post} />
      <LikeButton
        likes={likes}
        postId={_id}
      />

      {isAuthor && <EditPostContainer />}
    </section>
  )
}

export default PostSection