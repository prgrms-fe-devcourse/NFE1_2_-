import PostPoll from '@pages/PostDetail/PollSection'
import CommentSection from '@pages/PostDetail/CommentSection'
import DetailPageLayout from '@layouts/DetailPageLayout/DetailPageLayout'
import PostSection from '../PostSection'
import './index.css'
import { useQuery } from '@tanstack/react-query'
import formatPostData from '@/utils/formatPostData'
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
