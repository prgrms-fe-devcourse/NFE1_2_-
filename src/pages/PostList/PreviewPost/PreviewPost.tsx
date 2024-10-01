import PostCard from '@/components/PostComponent/PostComponent'
import Interaction from '../Interaction/Interaction'
import { Post } from '@/typings/types'

//흠 polls 타입부분 수정필요함 일단 30 넣음

const PreviewPost = ({ post }: { post: Post }) => {
  return (
    <section className='post-section'>
      <PostCard
        post={post}
        truncate={true}
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
