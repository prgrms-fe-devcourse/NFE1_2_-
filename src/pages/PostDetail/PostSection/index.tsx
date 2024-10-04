import PostComponent from '@components/PostComponent/PostComponent'
import LikeButton from '../LikeButton'
import './index.css'
import { FormattedPost } from '@/typings/types'
import { useEffect, useState } from 'react'
import EditPostContainer from '../EditPostContainer'
import { USER_ID } from '@/utils/api'

const PostSection = ({ post }: { post: FormattedPost }) => {
  const [isAuthor, setIsAuthor] = useState<boolean | null>(null)
  const { author } = post

  useEffect(() => {
    // 유저가 포스트의 author인지 판단, 그 후 수정 버튼 및 삭제 버튼 표시
    const { _id } = author
    const checkIsAuthor = _id === USER_ID
    setIsAuthor(checkIsAuthor)
  }, [author])

  return (
    <section className='post-section'>
      <PostComponent post={post} />
      <LikeButton post={post} />

      {isAuthor && <EditPostContainer postId={post._id} />}
    </section>
  )
}

export default PostSection
