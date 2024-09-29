import { Post, Like, Channel, User } from '@/typings/types'

interface PostData {
  likes: Like[]
  comments: Comment[]
  _id: string
  image?: string // 선택적
  imagePublicId?: string // 선택적
  title: string
  channel: Channel
  author: User
  createdAt: string
  updatedAt: string
}

const formatPostData = (data: PostData) => {
  const { title, author } = data

  let userData
  if (typeof author.fullName === 'string') {
    userData = JSON.parse(author.fullName)
  } else {
    userData = author.fullName
  }

  let postDetail
  if (typeof title === 'string') {
    postDetail = JSON.parse(title)
  } else {
    postDetail = title
  }

  const post: Post = {
    ...data,
    title: postDetail,
    author: { ...data.author, fullName: userData },
  }

  return post
}

export default formatPostData
