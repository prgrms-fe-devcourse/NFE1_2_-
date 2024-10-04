import {
  CommentDetail,
  FormattedPost,
  Post,
  PostDetail,
  UserDetailData,
} from '@/typings/types'

type FormatData = string | PostDetail | UserDetailData | CommentDetail
export const parseIfString = (value: FormatData) =>
  typeof value === 'string' ? JSON.parse(value) : value

const formatPostData = (data: Post): FormattedPost => {
  const { title, author, comments } = data

  const userData = parseIfString(author.fullName)
  const postDetail = parseIfString(title)

  const formattedComments = comments.map(({ comment, author, ...rest }) => ({
    ...rest,
    comment: parseIfString(comment),
    author: {
      ...author,
      fullName: parseIfString(author?.fullName) || '알수없음',
    },
  }))

  return {
    ...data,
    title: postDetail,
    comments: formattedComments,
    author: { ...author, fullName: userData },
  }
}

export default formatPostData
