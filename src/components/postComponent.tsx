import './postComponent.css'
import ViewsIcon from '@/assets/icons/views.svg?react'
import { Post } from '@/typings/types'

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className='post-card'>
      <div className='title'>{post.title.title}</div>
      <div className='category'>
        <div>
          {post.title.type} {post.author.fullName.mbti}{' '}
          {post.author.fullName.gender}/{post.author.fullName.ageGroup}
        </div>
        {new Date(post.createdAt).toLocaleDateString()}
        <ViewsIcon
          width={20}
          height={20}
        />
        {post.title.checkCount}
      </div>
      {post.image && (
        <img
          src={post.image}
          alt={post.title.title}
        />
      )}
      <p className='body'>{post.title.body}</p>
    </div>
  )
}

export default PostCard
