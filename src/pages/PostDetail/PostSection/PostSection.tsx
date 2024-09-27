import PostComponent from '@components/PostComponent/PostComponent'
import LikeButton from '../LikeButton/LikeButton'
import './PostSection.css'
import { Post } from '@/typings/types'

const PostSection = ({ post }: { post: Post }) => {
  return (
    <section className='post-section'>
      <PostComponent post={post} />
      <LikeButton />
    </section>
  )
}

export default PostSection
