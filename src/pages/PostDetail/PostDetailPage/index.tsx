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
import { useLocation, useParams } from 'react-router-dom'
import NotFound from '@/pages/NotFound/NotFound'
import Loading from '@/pages/Loading/Loading'

const PostDetailPage = () => {
  const location = useLocation()
  const { postId } = useParams<{ postId: string }>()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostData(postId as string),
    enabled: !!postId,
  })

  const [isVoted, setIsVoted] = useState<boolean | null>(null)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <NotFound />
  }

  if (data) {
    const post = formatPostData(data)
    const isFromNotification = location.state?.from === '/notification'

    return (
      <>
        {/* 토스티파이 사용을 위한 영역 지정 */}
        <ToastContainer
          position='top-right'
          autoClose={3000}
          limit={1}
        />
        <DetailPageLayout
          pageName='post-detail'
          newPath={isFromNotification}
        >
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
