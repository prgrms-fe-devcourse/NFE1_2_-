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
import { useParams } from 'react-router-dom'

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostData(postId as string),
    enabled: !!postId,
  })

  if (isLoading) {
    return <div>Loading</div>
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  if (data) {
    const post = formatPostData(data)
    console.log(post)
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
          <PostPoll post={post} />
          <CommentSection post={post} />
        </DetailPageLayout>
      </>
    )
  }
}

export default PostDetailPage
