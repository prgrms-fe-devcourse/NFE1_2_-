import './PostComponent.css'
import ViewsIcon from '@/assets/icons/views.svg?react'
import { Post } from '@/typings/types'
import Bedge from '../Bedge/Bedge'

const PostCard = ({
  post,
  truncate = false,
}: {
  post: Post
  truncate?: boolean
}) => {
  // 50자로 자르는 함수
  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text
  }

  return (
    <div className='post-card'>
      <div className='title'>{post.title.title}</div>
      <div className='category'>
        <div className='category_left'>
          <Bedge
            type='type'
            body={post.title.type}
          />
          <Bedge
            type='mbti'
            body={post.author.fullName.mbti}
          />{' '}
          {post.author.fullName.gender}/{post.author.fullName.ageGroup}
        </div>
        <div className='category_right'>
          {new Date(post.createdAt).toLocaleDateString()}
          <div className='right_icon'>
            <ViewsIcon
              width={24}
              height={24}
            />
            {post.title.checkCount}
          </div>
        </div>
      </div>
      {post.image && (
        <img
          src={post.image}
          alt={post.title.title}
        />
      )}
      <p className='body'>
        {truncate ? truncateText(post.title.body, 100) : post.title.body}{' '}
        {/* truncate에 따라 텍스트 자름 */}
      </p>
    </div>
  )
}

export default PostCard
