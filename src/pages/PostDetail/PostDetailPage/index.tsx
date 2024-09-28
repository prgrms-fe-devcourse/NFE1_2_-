import PostPoll from '@pages/PostDetail/PollSection'
import CommentSection from '@pages/PostDetail/CommentSection'
import DetailPageLayout from '@layouts/DetailPageLayout/DetailPageLayout'
import MessageBtn from '../MessageBtn'
import PostSection from '../PostSection'
import './index.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import formatPostData from '@/utils/formatPostData'

const getPostData = async () => {
  const response = await axios.get(
    'https://kdt.frontend.5th.programmers.co.kr:5001/posts/66f6d523e5593e2a995daf58',
  )

  if (!response.status) {
    const error = new Error('request error')
    console.error(error)
  }

  return response.data
}

const PostDetailPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['post'],
    queryFn: getPostData,
  })

  if (isLoading) {
    return <div>Loading</div>
  }

  if (isError) {
    return <div></div>
  }

  if (data) {
    const post = formatPostData(data)

    return (
      <DetailPageLayout pageName='post-detail'>
        <PostSection post={post} />
        <PostPoll />
        <CommentSection />
        <MessageBtn />
      </DetailPageLayout>
    )
  }
}

export default PostDetailPage
