import { Post } from '@/typings/types'

const formatPostData = (data: Post) => {
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
