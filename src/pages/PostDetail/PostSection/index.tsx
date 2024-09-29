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
