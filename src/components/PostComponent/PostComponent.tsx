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
  let title
  let fullName

  try {
    title = JSON.parse(post.title)
  } catch (error) {
    console.error('title 파싱 오류:', error)
    title = { title: '제목 없음', body: '', type: '', checkCount: 0 } // 기본값 설정
  }

  try {
    fullName = JSON.parse(post.author.fullName)
  } catch (error) {
    console.error('fullName 파싱 오류:', error)
    fullName = {
      mbti: '알 수 없음',
      gender: '알 수 없음',
      ageGroup: '알 수 없음',
    } // 기본값 설정
  }

  return (
    <div className='post-card'>
      <div className='title'>{title.title || '제목 없음'}</div>
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
          {new Date(post.createdAt).toLocaleDateString()}
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
          alt={title.title}
        />
      )}
      <p className={`body ${truncate ? 'truncate' : ''}`}>{title.body}</p>
    </div>
  )
}

export default PostCard
