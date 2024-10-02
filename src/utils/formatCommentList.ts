import { FormattedComment, FormattedUser } from '@/typings/types'

// 댓글에 children 추가
export interface FormattedChlidrenComment extends FormattedComment {
  children: FormattedChlidrenComment[] // 자식 댓글 배열
}

const formatCommentList = (
  commentList: FormattedComment[],
): FormattedChlidrenComment[] => {
  const parentCommentList: { [key: string]: FormattedChlidrenComment } = {}
  const childCommentList: { [key: string]: FormattedChlidrenComment[] } = {}

  // 1차 분류: 부모 댓글과 자식 댓글 분류
  commentList.forEach((comment: FormattedComment) => {
    const { parentId } = comment.comment
    const commentTree: FormattedChlidrenComment = {
      ...comment,
      children: [],
    }

    if (parentId === null) {
      // 부모 댓글일 경우 parentCommentList에 추가
      parentCommentList[comment._id] = commentTree
    } else {
      // 자식 댓글일 경우 childCommentList에 추가
      if (!childCommentList[parentId]) {
        childCommentList[parentId] = []
      }
      childCommentList[parentId].push(commentTree)
    }
  })

  // 부모 댓글에 자식 댓글 추가
  Object.keys(childCommentList).forEach((parentId) => {
    if (parentCommentList[parentId]) {
      // 부모 댓글이 존재할 경우
      parentCommentList[parentId].children.push(...childCommentList[parentId])
    } else {
      // 부모 댓글이 없을 경우
      parentCommentList[parentId] = {
        _id: parentId,
        comment: {
          comment: '삭제된 댓글입니다.',
          parentId: null,
          like: [],
        },
        author: {
          /* 기본 author 정보 */
        } as FormattedUser, // 필요에 맞게 기본 author 정보 설정
        post: '', // 기본 post 정보
        createdAt: '',
        updatedAt: '',
        children: childCommentList[parentId],
      }
    }
  })

  // 최종적으로 부모 댓글들을 배열로 반환
  return Object.values(parentCommentList)
}

export default formatCommentList
