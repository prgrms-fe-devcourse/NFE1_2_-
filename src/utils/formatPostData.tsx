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
  const userData = JSON.parse(author.fullName)
  let postDetail = JSON.parse(title)
  let { poll } = postDetail
  poll = {
    ...poll,
    agree: parseInt(poll.agree),
    disagree: parseInt(poll.disagree),
  }
  postDetail = { ...postDetail, poll }
  const post: Post = {
    ...data,
    title: postDetail,
    author: { ...data.author, fullName: userData },
  }

  return post
}

export default formatPostData
