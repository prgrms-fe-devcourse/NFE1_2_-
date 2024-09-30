import PostPoll from '@pages/PostDetail/PollSection/PostPoll'
import CommentSection from '@pages/PostDetail/CommentSection/CommentSection'
import DetailPageLayout from '@layouts/DetailPageLayout/DetailPageLayout'
import MessageBtn from '../MessageBtn/MessageBtn'
import PostSection from '../PostSection/PostSection'
import './Post.css'

const PostDetail = () => {
  return (
    <DetailPageLayout pageName='post-detail'>
      <PostSection />
      <PostPoll />
      <CommentSection />
      <MessageBtn />
    </DetailPageLayout>
  )
}

export default PostDetail
