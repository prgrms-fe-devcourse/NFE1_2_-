import './PostComponent.css'
import ViewsIcon from '@/assets/icons/views.svg?react'
import { FormattedPost } from '@/typings/types'
import Bedge from '../Bedge/Bedge'
import formatTime from '@/utils/formatTime'

const PostCard = ({
  post,
  truncate = false,
}: {
  post: FormattedPost
  truncate?: boolean
  checkCount?: number
}) => {
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
          />
          {post.author.fullName.gender}/{post.author.fullName.ageGroup}대
        </div>
        <div className='category_right'>
          <span className='post-time'>{formatTime(post.createdAt)}</span>
          <span className='right_icon'>
            <ViewsIcon
              width={20}
              height={20}
            />
            {post.title.checkCount}
          </span>
        </div>
      </div>
      {post.image && (
        <img
          src={post.image}
          alt={post.title.title}
        />
      )}
      <p className={`body ${truncate ? 'truncate' : ''}`}>{post.title.body}</p>
    </div>
  )
}

export default PostCard
