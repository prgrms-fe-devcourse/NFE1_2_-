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
}) => {
  const title = JSON.parse(post.title)
  const fullName = JSON.parse(post.author.fullName)
  return (
    <div className='post-card'>
      <div className='title'>{title.title}</div>
      <div className='category'>
        <div className='category_left'>
          <Bedge
            type='type'
            body={title.type}
          />
          <Bedge
            type='mbti'
            body={fullName.mbti}
          />{' '}
          {fullName.gender}/{fullName.ageGroup}
        </div>
        <div className='category_right'>
          {formatTime(post.createdAt)}
          <div className='right_icon'>
            <ViewsIcon
              width={24}
              height={24}
            />
            {title.checkCount}
          </div>
        </div>
      </div>
      {post.image && (
        <img
          src={post.image}
          alt={post.title.title}
        />
      )}
      <p className={`body ${truncate ? 'truncate' : ''}`}>{title.body}</p>
    </div>
  )
}

export default PostCard
