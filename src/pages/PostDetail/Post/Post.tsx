import PostPoll from '@pages/PostDetail/PollSection/PostPoll'
import CommentSection from '@pages/PostDetail/CommentSection/CommentSection'
import DetailPageLayout from '@layouts/DetailPageLayout/DetailPageLayout'
import MessageBtn from '../MessageBtn/MessageBtn'
import PostSection from '../PostSection/PostSection'
import './Post.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Post, User } from '@/typings/types'

const getData = async () => {
  const response = await axios.get(
    'https://kdt.frontend.5th.programmers.co.kr:5001/posts/66f6d523e5593e2a995daf58',
  )

  if (!response.status) {
    const error = new Error('request error')
    console.error(error)
  }

  return response.data
}

const PostDetail = () => {
  const { data } = useQuery({ queryKey: ['post'], queryFn: getData })
  if (data) {
    const { title, author }: { title: string; author: User } = data
    const postDetail = JSON.parse(title)
    const userData = JSON.parse(author.fullName)
    const post: Post = {
      ...data,
      title: postDetail,
      author: { ...author, fullName: userData },
    }
    console.log(post)
    let { poll } = post.title
    poll = {
      ...poll,
      agree: parseInt(poll.agree),
      disagree: parseInt(poll.disagree),
    }
    console.log(poll)
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

export default PostDetail
