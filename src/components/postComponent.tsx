import './postComponent.css'
import ViewsIcon from '@/assets/icons/views.svg?react'
interface PostDetail {
  type: '이별' | '짝사랑' | '썸' | '데이트' | '기타'
  title: string
  body: string
  checkCount: number
}

interface FullName {
  mbti: string
  gender: string
  ageGroup: string
}

interface User {
  fullName: FullName
}

interface PostCardProps {
  title: PostDetail
  author: User
  image?: string
  createdAt: string
}

const PostCard = ({ title, author, image, createdAt }: PostCardProps) => {
  return (
    <div className='post-card'>
      <div className='title'>{title.title}</div>
      <div className='category'>
        <div>
          {title.type} {author.fullName.mbti} {author.fullName.gender} /
          {author.fullName.ageGroup}
        </div>
        {new Date(createdAt).toLocaleDateString()}
        <ViewsIcon
          width={20}
          height={20}
        />
        {title.checkCount}
      </div>

      {image && (
        <img
          src={image}
          alt={title.title}
        />
      )}
      <p className='body'>{title.body}</p>
    </div>
  )
}

export default PostCard
