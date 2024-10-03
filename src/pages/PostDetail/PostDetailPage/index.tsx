import PostPoll from '@pages/PostDetail/PollSection'
import CommentSection from '@pages/PostDetail/CommentSection'
import DetailPageLayout from '@layouts/DetailPageLayout/DetailPageLayout'
import PostSection from '../PostSection'
import './index.css'
import { useQuery } from '@tanstack/react-query'
import formatPostData from '@/utils/formatPostData'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getPostData } from '@/utils/api'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostData(postId as string),
    enabled: !!postId,
  })

  const [isVoted, setIsVoted] = useState<boolean | null>(false)

  if (isLoading) {
    return <div>Loading</div>
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  if (data) {
    const post = formatPostData(data)

    return (
      <>
        {/* 토스티파이 사용을 위한 영역 지정 */}
        <ToastContainer
          position='top-right'
          autoClose={3000}
          limit={1}
        />
        <DetailPageLayout pageName='post-detail'>
          <PostSection post={post} />
          <PostPoll
            post={post}
            isVoted={isVoted}
            setIsVoted={setIsVoted}
          />
          <CommentSection
            post={post}
            isVoted={isVoted}
          />
        </DetailPageLayout>
      </>
    )
  }
}

export default PostDetailPage
